# Garden Section Requirements

## Overview
This document outlines the requirements for the `garden/index.html` page - a card-only display page for Patrick's Digital Garden.

## Core Requirements

### 1. Content Structure
- **ONLY** display the garden section with cards
- **Remove** all other sections:
  - Navigation (`.terminal-nav`)
  - Hero section (`.hero`)
  - Links section (`.links`)
  - Footer (`.site-footer`)
  - Decorative overlays (`noise-overlay`, `scanlines`)
  - Analytics scripts

### 2. Garden Section Layout
```html
<section class="garden" id="garden">
    <div class="section-header">
        <span class="section-label">// garden</span>
        <h2 class="section-title">Card Collection</h2>
    </div>
    <div class="garden-grid">
        <!-- Cards go here -->
    </div>
</section>
```

### 3. Card Design Specifications
Each card must follow this structure:
```html
<article class="garden-card">
    <div class="garden-icon">
        <svg><!-- icon paths --></svg>
    </div>
    <h3 class="garden-title">Card Title</h3>
    <p class="garden-desc">Card description text...</p>
    <div class="garden-tag">category</div>
</article>
```

### 4. Styling Requirements (styles.css)

#### Grid Layout - No Gaps
```css
.garden-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 0;              /* NO gaps between cards */
    width: 100%;         /* Fill full container width */
    margin: 0 auto;
}
```

#### Card Styling - Seamless Edges
```css
.garden-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 0;    /* Square corners for seamless layout */
    padding: 2rem;
    /* ... other styles */
}
```

### 5. Visual Requirements
- Cards should touch each other with **no spacing**
- Cards should fill the **entire width** of the content container
- Only borders should separate adjacent cards
- Maintain hover effects (border accent, shadow, top gradient line)
- Keep all CSS variables from `:root`

### 6. File Structure
```
garden/
├── index.html      # Main page with only garden section
├── styles.css      # All styles including garden cards
├── prompt.md       # This requirements document
└── cards.html      # Reference card design (optional)
```

### 7. Card Content
Use placeholder/dummy data for cards covering topics like:
- UI Components
- Design Patterns
- Code Snippets
- Architecture
- Configuration
- Documentation
- Tutorials
- Responsive Design
- Web Performance
- Security
- Analytics
- Collaboration
- Best Practices
- FAQ & Solutions
- External Resources

## Technical Notes
- Keep `<head>` section with meta tags, fonts, and stylesheet link
- Maintain proper HTML5 structure (`<!doctype html>`, `<html>`, `<body>`, `<main>`)
- Ensure `styles.css` is correctly linked: `<link rel="stylesheet" href="styles.css" />`
- All CSS variables must be defined in `:root` section of styles.css

## Expected Result
A clean, minimal page displaying **only garden cards** with:
- ✅ No gaps between cards
- ✅ Cards filling full container width
- ✅ Section header with label and title
- ✅ All card styling intact (borders, hover effects, icons, tags)
- ✅ No other page sections or navigation