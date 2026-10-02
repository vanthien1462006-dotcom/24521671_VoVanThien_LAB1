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

  ---

## T-02 — Enterprise Developer Portfolio

### Sub-tasks
| ID    | Task                     | File      | Commit                         |
|-------|--------------------------|-----------|--------------------------------|
| T-02H | HTML hooks for T-02      | index.html| feat(html): add theme toggle, project cards & asset links |
| T-02A | Design tokens & reset    | style.css | feat(css): tokens & reset      |
| T-02B | 2D responsive grid       | style.css | feat(css): responsive grid     |
| T-02C | Theme engine             | theme.js  | feat(js): dark mode engine     |

### Token Contract (style.css)
- Colors: --color-bg, --color-surface, --color-text, --color-text-muted,
  --color-accent, --color-border
- Spacing: --space-xs, --space-sm, --space-md, --space-lg
- Other: --radius, --content-width, --font-body
- Light values in `:root`, dark values in `:root[data-theme="dark"]`.
- Hex codes allowed ONLY inside these two token blocks.

### Theme Contract (theme.js)
- State: `<html data-theme="light|dark">`
- Persistence: localStorage key `theme`, values `light` | `dark`
- First visit: follow OS via `prefers-color-scheme`
- Toggle: `<button id="theme-toggle" aria-pressed="true|false">`
- localStorage blocked → theme still works, no console error

### Layout Contract
- Mobile-first, 375px baseline, no horizontal scroll
- Header & nav: Flexbox; project list: Grid
  `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`
- No new <div>

### Acceptance Criteria
- [ ] No horizontal scroll at 375px
- [ ] All text contrast ≥ 4.5:1 in both themes
- [ ] Zero console errors while toggling theme 10+ times
- [ ] Theme persists after reload (localStorage `theme`)
- [ ] Full keyboard flow: Tab → skip-link → toggle → nav links; Enter/Space works
- [ ] CLS = 0, LCP < 2.0s (Lighthouse / throttled network)
- [ ] Each commit touches one file type only

### AI Prompts (one per sub-task)
- T-02A: "Follow project-rules.md. Write ONLY style.css tokens + reset per the
  Token Contract. No layout, no JS."
- T-02B: "Using ONLY existing tokens, add layout: flex header/nav and grid
  .project-grid per Layout Contract. No new colors, no JS."
- T-02C: "Write ONLY theme.js per Theme Contract. Vanilla ES6+, const by default,
  no innerHTML, wrap localStorage in try/catch."