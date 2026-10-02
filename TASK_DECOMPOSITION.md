# Task Decomposition (WBS) — Lab 1

| ID   | Task                                   | Status | Commit                                   |
|------|----------------------------------------|--------|------------------------------------------|
| T-01 | Semantic DOM landmarks                 | Done   | feat(html): semantic landmark tree       |
| T-02 | Design tokens & CSS custom properties  | Todo   |                                          |
| T-03 | Responsive Grid (minmax auto-fit)      | Todo   |                                          |
| T-04 | Isolated Audio engine                  | Todo   |                                          |
| T-05 | Keyboard listeners + repeat throttling | Todo   |                                          |

## T-01 — Semantic DOM Architecture & A11y Contract

### Scope
Chỉ HTML. KHÔNG CSS, KHÔNG JS, KHÔNG inline style, KHÔNG <link> stylesheet.

### Landmark Hierarchy Contract
body
├── a.skip-link[href="#main-content"]   (phần tử focus được đầu tiên)
├── header            → banner
│   └── h1            (duy nhất 1 h1)
├── nav[aria-label="Primary"] → navigation
│   └── ul > li > a[href="#about" | "#projects"]
├── main#main-content[tabindex="-1"] → main (đích của skip-link)
│   ├── section#about[aria-labelledby="about-title"]       → region > h2
│   └── section#projects[aria-labelledby="projects-title"] → region > h2
│       └── article > h3
└── footer            → contentinfo

### Acceptance Criteria
- [x] File nguồn không có <div> (kiểm tra bằng git diff --staged)
- [x] document.querySelectorAll('h1').length === 1
- [x] Heading không nhảy cấp (h1 → h2 → h3)
- [x] Tab lần đầu focus vào skip-link; Enter → focus chuyển vào <main>
- [x] Mọi href="#x" trong nav đều có id="x" tương ứng
- [x] DevTools Accessibility tree hiện: banner, navigation, main, region×2, contentinfo
- [x] Commit feat(html) chỉ chứa index.html

### Design Decisions
- Slide ghi `href="#main"` nhưng code mẫu dùng `id="main-content"` →
  thống nhất dùng `#main-content` để skip-link hoạt động.
- Thêm `tabindex="-1"` cho <main> để Enter trên skip-link chuyển focus thật sự vào main.
- Không dùng `role="banner|navigation|main"` vì thẻ semantic đã có implicit role
  (First Rule of ARIA).
- Chưa thêm `<link rel="stylesheet">` → tránh 404; sẽ thêm cùng style.css ở T-02.

### AI Usage Log
- Tool: Claude (Claude Code)
- Cách dùng: Nhờ AI phân tích đề Lab 1 / Exercise 1 và đề xuất contract + mẫu index.html.
- Chỉnh sửa của em: đổi thông tin cá nhân, rà lại từng thẻ theo contract.
- Kiểm chứng: Live Server, DevTools Accessibility tree, test bàn phím (Tab/Enter),
  soi `git diff --staged` để chắc không có <div>, style, script.
- Lỗi AI phát hiện được: hướng dẫn ban đầu thiếu `tabindex="-1"` trên <main>
  → Enter trên skip-link không chuyển focus vào main; đã bổ sung.