# Repository instructions

- Git is the source of truth. Treat the MkDocs/GitHub Pages site as the reading edition.
- Use Notion only for learning progress, questions, recall notes, and links back to the published book. Do not maintain a second editable copy of chapter content there.
- Read `docs/writing-guide.md`, `docs/book-architecture.md`, and the relevant section of `docs/source-map.md` before writing a chapter.
- Explain every technical term before relying on it later.
- Keep claims traceable to primary sources where possible.
- Mark code and results as tested only after running them in the stated environment.
- Store figures under `assets/<chapter>/` and use relative paths.
- Do not commit reference PDFs or generated environments.
- For substantial changes, use a focused branch and keep commits scoped.
- Before publishing documentation changes, run `python scripts/prepare_docs.py` and `mkdocs build --strict`.
