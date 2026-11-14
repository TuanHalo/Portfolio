import { spawn, type ChildProcess } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import net from 'node:net';
import path from 'node:path';
import { chromium } from 'playwright';

interface ResumeTarget {
  readonly lang: 'en' | 'vi';
  readonly route: string;
  readonly outputPath: string;
}

const DIST_DIR = path.resolve('dist');
const OUT_DIR = path.join(DIST_DIR, 'resume');

const TARGETS: readonly ResumeTarget[] = [
  { lang: 'en', route: '/Portfolio/resume/', outputPath: path.join(OUT_DIR, 'resume-en.pdf') },
  { lang: 'vi', route: '/Portfolio/vi/resume/', outputPath: path.join(OUT_DIR, 'resume-vi.pdf') },
];

async function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (address && typeof address !== 'string') {
        const { port } = address;
        server.close(() => resolve(port));
      } else {
        server.close(() => reject(new Error('Could not acquire free port.')));
      }
    });
  });
}

async function waitForServer(url: string, timeoutMs = 15000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Preview server did not become ready at ${url} within ${timeoutMs}ms.`);
}

async function launchBrowser(): Promise<import('playwright').Browser> {
  try {
    return await chromium.launch();
  } catch (err: unknown) {
    for (const channel of ['msedge', 'chrome'] as const) {
      try {
        return await chromium.launch({ channel });
      } catch {
        // Try next available system browser
      }
    }
    throw err;
  }
}

async function main(): Promise<void> {
  await mkdir(OUT_DIR, { recursive: true });
  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;

  const previewProc: ChildProcess = spawn(
    process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
    ['exec', 'astro', 'preview', '--host', '127.0.0.1', '--port', String(port)],
    { stdio: 'pipe', shell: process.platform === 'win32' },
  );

  try {
    await waitForServer(`${baseUrl}/Portfolio/`);
    const browser = await launchBrowser();
    try {
      const page = await browser.newPage();
      for (const target of TARGETS) {
        const url = `${baseUrl}${target.route}`;
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.emulateMedia({ media: 'print' });
        await page.pdf({
          path: target.outputPath,
          format: 'A4',
          printBackground: true,
          margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' },
        });
        console.log(`Generated ${path.relative(process.cwd(), target.outputPath)}`);
      }
    } finally {
      await browser.close();
    }
  } finally {
    if (process.platform === 'win32' && previewProc.pid) {
      spawn('taskkill', ['/pid', String(previewProc.pid), '/T', '/F'], { stdio: 'ignore' });
    } else {
      previewProc.kill('SIGTERM');
    }
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
