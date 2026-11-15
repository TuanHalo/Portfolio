export const languages = {
  en: 'English',
  vi: 'Tiếng Việt',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

const en = {
  'site.title': 'Tuan Bui | Portfolio',
  'site.description': 'Personal portfolio, projects, experience, certificates, and writing.',
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.projects': 'Projects',
  'nav.experience': 'Experience',
  'nav.certificates': 'Certificates',
  'nav.blog': 'Blog',
  'nav.resume': 'Resume',
  'nav.contact': 'Contact',
  'nav.search': 'Search',

  'home.techStack': 'Tech stack',
  'home.featuredProject': 'Featured project',
  'home.yearsExp': 'Experience',
  'home.yearsSuffix': '+ yrs',
  'home.latestPost': 'Latest post',
  'home.resume': 'Resume',
  'home.downloadPdf': 'Download PDF',
  'home.language': 'Language',
  'home.currentRole': 'Currently',
  'home.certificates': 'Certificates',
  'home.certificatesCount': 'verified',
  'home.viewAll': 'View all',
  'home.contactMe': 'Get in touch',

  'about.title': 'About Me',
  'about.skills': 'Skills & Tools',
  'about.location': 'Location',
  'about.availability': 'Status',

  'projects.title': 'Projects',
  'projects.subtitle': 'Selected engineering work, side projects, and case studies.',
  'projects.allTags': 'All',
  'projects.featured': 'Featured',
  'projects.demo': 'Live Demo',
  'projects.repo': 'Source Code',
  'projects.back': 'Back to all projects',

  'experience.title': 'Experience & Education',
  'experience.work': 'Work Experience',
  'experience.education': 'Education',
  'experience.present': 'Present',

  'certificates.title': 'Certificates',
  'certificates.subtitle': 'Verified credentials and supporting documents.',
  'certificates.issued': 'Issued',
  'certificates.credentialId': 'Credential ID',
  'certificates.viewFile': 'View document',
  'certificates.verify': 'Verify online',

  'blog.title': 'Blog',
  'blog.subtitle': 'Notes on software engineering and system design.',
  'blog.readMore': 'Read article',
  'blog.readingTime': 'min read',
  'blog.allTags': 'All tags',
  'blog.taggedWith': 'Tagged with',
  'blog.back': 'Back to all posts',
  'blog.prev': 'Previous',
  'blog.next': 'Next',
  'blog.empty': 'No posts published yet.',

  'search.title': 'Search',
  'search.subtitle': 'Search across projects, blog posts, and pages.',
  'search.placeholder': 'Search...',
  'search.devNotice':
    'Full-text search index is generated during production build (pnpm build). Run pnpm preview to test search locally.',

  'resume.title': 'Resume / CV',
  'resume.download': 'Download PDF',
  'resume.print': 'Print',
  'resume.summary': 'Summary',
  'resume.experience': 'Experience',
  'resume.sideProjects': 'Side Projects',
  'resume.education': 'Education',
  'resume.skills': 'Skills',
  'resume.certificates': 'Certificates',

  'contact.title': 'Contact',
  'contact.subtitle': 'Open to collaboration, roles, or a quick chat.',
  'contact.email': 'Email',
  'contact.zaloPhone': 'Phone / Zalo',
  'contact.socials': 'Social Profiles',

  'i18n.untranslated':
    'This entry is not yet available in Vietnamese. Showing the English version below.',
  'i18n.machineTranslated':
    'Bản dịch tự động, chưa được tác giả rà soát hoàn chỉnh.',

  'theme.toggle': 'Toggle color theme',
  'notFound.title': 'Page not found',
  'notFound.message': 'The page you are looking for does not exist or has been moved.',
  'notFound.home': 'Back to home',
  'footer.builtWith': 'Built with Astro & TypeScript. Hosted on GitHub Pages.',
} as const;

const vi: Record<keyof typeof en, string> = {
  'site.title': 'Tuấn Bùi | Portfolio',
  'site.description': 'Portfolio cá nhân, dự án, kinh nghiệm, chứng chỉ và bài viết.',
  'nav.home': 'Trang chủ',
  'nav.about': 'Giới thiệu',
  'nav.projects': 'Dự án',
  'nav.experience': 'Kinh nghiệm',
  'nav.certificates': 'Chứng chỉ',
  'nav.blog': 'Bài viết',
  'nav.resume': 'Hồ sơ (CV)',
  'nav.contact': 'Liên hệ',
  'nav.search': 'Tìm kiếm',

  'home.techStack': 'Công nghệ chính',
  'home.featuredProject': 'Dự án nổi bật',
  'home.yearsExp': 'Kinh nghiệm',
  'home.yearsSuffix': '+ năm',
  'home.latestPost': 'Bài viết mới nhất',
  'home.resume': 'Hồ sơ (CV)',
  'home.downloadPdf': 'Tải PDF',
  'home.language': 'Ngôn ngữ',
  'home.currentRole': 'Hiện tại',
  'home.certificates': 'Chứng chỉ',
  'home.certificatesCount': 'đã xác thực',
  'home.viewAll': 'Xem tất cả',
  'home.contactMe': 'Liên hệ',

  'about.title': 'Giới thiệu',
  'about.skills': 'Kỹ năng & Công cụ',
  'about.location': 'Địa điểm',
  'about.availability': 'Trạng thái',

  'projects.title': 'Dự án',
  'projects.subtitle': 'Các sản phẩm kỹ thuật, dự án cá nhân và phân tích chi tiết.',
  'projects.allTags': 'Tất cả',
  'projects.featured': 'Nổi bật',
  'projects.demo': 'Xem bản chạy thử',
  'projects.repo': 'Mã nguồn',
  'projects.back': 'Quay lại danh sách dự án',

  'experience.title': 'Kinh nghiệm & Học vấn',
  'experience.work': 'Kinh nghiệm làm việc',
  'experience.education': 'Học vấn',
  'experience.present': 'Hiện tại',

  'certificates.title': 'Chứng chỉ',
  'certificates.subtitle': 'Các chứng chỉ và tài liệu xác thực đính kèm.',
  'certificates.issued': 'Ngày cấp',
  'certificates.credentialId': 'Mã chứng chỉ',
  'certificates.viewFile': 'Xem tài liệu',
  'certificates.verify': 'Xác minh trực tuyến',

  'blog.title': 'Bài viết',
  'blog.subtitle': 'Ghi chú về kỹ thuật phần mềm và thiết kế hệ thống.',
  'blog.readMore': 'Đọc tiếp',
  'blog.readingTime': 'phút đọc',
  'blog.allTags': 'Tất cả thẻ',
  'blog.taggedWith': 'Thẻ',
  'blog.back': 'Quay lại danh sách bài viết',
  'blog.prev': 'Bài trước',
  'blog.next': 'Bài tiếp theo',
  'blog.empty': 'Chưa có bài viết nào.',

  'search.title': 'Tìm kiếm',
  'search.subtitle': 'Tìm kiếm trong dự án, bài viết và các trang.',
  'search.placeholder': 'Nhập từ khóa...',
  'search.devNotice':
    'Dữ liệu tìm kiếm được tạo khi chạy pnpm build. Chạy pnpm preview để kiểm tra tìm kiếm ở local.',

  'resume.title': 'Hồ sơ (CV)',
  'resume.download': 'Tải bản PDF',
  'resume.print': 'In trang',
  'resume.summary': 'Tóm tắt',
  'resume.experience': 'Kinh nghiệm làm việc',
  'resume.sideProjects': 'Dự án cá nhân',
  'resume.education': 'Học vấn',
  'resume.skills': 'Kỹ năng',
  'resume.certificates': 'Chứng chỉ',

  'contact.title': 'Liên hệ',
  'contact.subtitle': 'Nhắn cho tôi nếu bạn muốn hợp tác, trao đổi công việc hoặc trò chuyện.',
  'contact.email': 'Email',
  'contact.zaloPhone': 'Điện thoại / Zalo',
  'contact.socials': 'Mạng xã hội',

  'i18n.untranslated':
    'Bài viết này chưa có bản dịch tiếng Việt. Đang hiển thị nội dung tiếng Anh bên dưới.',
  'i18n.machineTranslated':
    'Bản dịch tự động, chưa được tác giả rà soát hoàn chỉnh.',

  'theme.toggle': 'Chuyển giao diện sáng/tối',
  'notFound.title': 'Không tìm thấy trang',
  'notFound.message': 'Trang bạn tìm không tồn tại hoặc đã chuyển sang địa chỉ khác.',
  'notFound.home': 'Về trang chủ',
  'footer.builtWith': 'Xây dựng bằng Astro & TypeScript. Lưu trữ trên GitHub Pages.',
};

export type UiKey = keyof typeof en;
export const ui: Record<Lang, Record<UiKey, string>> = { en, vi };

