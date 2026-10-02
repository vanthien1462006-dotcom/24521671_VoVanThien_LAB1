# Task Decomposition (WBS) — Lab 1

| ID   | Task                                   | Status  | Commit                                   |
|------|----------------------------------------|---------|------------------------------------------|
| T-01 | Semantic DOM landmarks                 | Doing   | feat(html): semantic landmark tree       |
| T-02 | Design tokens & CSS custom properties  | Todo    |                                          |
| T-03 | Responsive Grid (minmax auto-fit)      | Todo    |                                          |
| T-04 | Isolated Audio engine                  | Todo    |                                          |
| T-05 | Keyboard listeners + repeat throttling | Todo    |                                          |

## T-01 — Semantic DOM Architecture & A11y Contract

### Scope
Chỉ HTML. KHÔNG CSS, KHÔNG JS.

### Landmark Hierarchy Contract
body
├── a.skip-link[href="#main-content"]   (phần tử focus được đầu tiên)
├── header            → banner
│   └── h1            (duy nhất 1 h1)
├── nav[aria-label="Primary"] → navigation
│   └── ul > li > a[href="#about" | "#projects"]
├── main#main-content → main
│   ├── section#about[aria-labelledby="about-title"]       > h2
│   └── section#projects[aria-labelledby="projects-title"] > h2
└── footer            → contentinfo

### Acceptance Criteria
- [ ] document.querySelectorAll('div').length === 0
- [ ] document.querySelectorAll('h1').length === 1
- [ ] Heading không nhảy cấp (h1 → h2)
- [ ] Tab lần đầu focus vào skip-link; Enter → nhảy tới #main-content
- [ ] Mọi href="#x" trong nav đều có id="x" tương ứng
- [ ] DevTools Accessibility tree hiện: banner, navigation, main, region×2, contentinfo

### AI Prompt (atomic, chỉ cho T-01)
"Follow project-rules.md. Generate ONLY index.html body markup for this
landmark contract: [dán contract trên]. Zero <div>. No CSS, no JS."