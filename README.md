# Calculus Textbook

## Interactive Jupyter Book

The course book uses Jupyter Book v2 (MyST) and kernel-free AnyWidget
activities. Textbook content is in `content/`; widget source is in `demos/`.

### One-time setup

```powershell
python -m pip install -r requirements-build.txt
npm ci --prefix demos
```

### Build and preview

```powershell
npm run build --prefix demos
jupyter book start
```

The widget build must run before the book build. While editing a widget, run
`npm run watch --prefix demos` in a second terminal. Run the widget tests with
`npm test --prefix demos`.

## Content model

This repository is the read-only interactive textbook, not the lab, homework,
or project repository. Readers do not edit or execute cells. Explanations,
worked examples, and kernel-free AnyWidget figures are rendered directly in
the book.

Calculus I is complete through section 16, corresponding to weeks 0–16 of the
course calendar. Week 14 is an integration checkpoint for the scheduled
break/catch-up period; the final-exam week is not a content section.
