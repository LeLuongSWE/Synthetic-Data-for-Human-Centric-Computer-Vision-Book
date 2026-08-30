"""Create the transient MkDocs source tree from version-controlled book files."""

from __future__ import annotations

import shutil
from pathlib import Path


REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
BUILD_ROOT = REPOSITORY_ROOT / ".build"
DOCS_SOURCE = BUILD_ROOT / "mkdocs-src"


def copy_required_file(source: Path, destination: Path) -> None:
    if not source.is_file():
        raise FileNotFoundError(f"required documentation file is missing: {source}")
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)


def copy_required_directory(source: Path, destination: Path) -> None:
    if not source.is_dir():
        raise FileNotFoundError(f"required documentation directory is missing: {source}")
    shutil.copytree(source, destination)


def main() -> None:
    if DOCS_SOURCE.exists():
        shutil.rmtree(DOCS_SOURCE)
    DOCS_SOURCE.mkdir(parents=True)

    copy_required_file(REPOSITORY_ROOT / "index.md", DOCS_SOURCE / "index.md")
    copy_required_file(
        REPOSITORY_ROOT / "docs" / "book-architecture.md",
        DOCS_SOURCE / "roadmap.md",
    )
    copy_required_directory(REPOSITORY_ROOT / "chapters", DOCS_SOURCE / "chapters")
    copy_required_directory(REPOSITORY_ROOT / "assets", DOCS_SOURCE / "assets")
    copy_required_file(
        REPOSITORY_ROOT / "code" / "README.md",
        DOCS_SOURCE / "code" / "README.md",
    )

    print(f"Prepared MkDocs source at {DOCS_SOURCE}")


if __name__ == "__main__":
    main()
