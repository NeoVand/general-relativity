# General Relativity, From the Inside Out

A complete guided expedition from clocks and vectors to curvature, the
Einstein–Hilbert action, and the modern theory of spacetime.

For readers with college-level mathematics and physics. The book contains
24 chapters, 30 solved exercises, a formula reference, a glossary, and linked
sources. It combines explicit derivations with intuitive analogies and the
conceptual traps worth understanding.

[Read the PDF](dist/General_Relativity_From_the_Inside_Out.pdf) ·
[Read the Markdown](book.md) · [LaTeX source](book.tex)

## Files

| Path | Purpose |
| --- | --- |
| `book.tex` | Complete, standalone LaTeX source used for the finished PDF; cover and styling are embedded. |
| `book.md` | Original, editable Markdown manuscript with TeX equations. |
| `dist/General_Relativity_From_the_Inside_Out.pdf` | Compiled reading edition. |
| `scripts/build.py` | Portable build script; defaults to compiling the checked-in LaTeX. |
| `scripts/prepare.py` | Adapts Markdown headings and navigation for print. |
| `typesetting/header.tex` | Fonts, headings, margins, callouts, and PDF metadata. |
| `typesetting/cover.tex` | Title page and clickable table of contents. |
| `typesetting/print.lua` | Pandoc filter for equations, tables, and main-matter numbering. |
| `build/` | Ignored intermediate files and compiler logs, created when building. |

## Build from LaTeX

Requirements: Python 3 and a TeX distribution with XeLaTeX. A full TeX Live or
MacTeX installation includes the required packages and Latin Modern fonts.
The source uses KOMA-Script (`scrbook`), `fontspec`, `unicode-math`, `microtype`,
`fancyhdr`, `tcolorbox`, and Pandoc's standard LaTeX support packages.

From the repository root:

```bash
python3 scripts/build.py
```

This runs XeLaTeX three times to resolve the contents, bookmarks, and references,
checks the compiler log for typesetting problems, and writes the PDF into `dist/`.
No Pandoc installation is required for this route. Paths are resolved relative
to the script, so the command also works when invoked from another directory.

For a LaTeX editor or Overleaf, open `book.tex` and select **XeLaTeX** as the
compiler. The file contains the entire book and has no external image or
bibliography-file dependencies. Let the editor repeat compilation until the
contents and page references stabilize.

## Edit the Markdown and regenerate LaTeX

This route also requires Pandoc. The original edition used **Pandoc 3.1.3** and
**XeTeX from TeX Live 2023**. Different versions may alter layout or generated
LaTeX; these versions are the reference build environment.

Edit `book.md` for content, or files in `typesetting/` for the print design, then:

```bash
python3 scripts/build.py --from-markdown
```

**This replaces `book.tex`.** Choose your editing workflow deliberately:

- For direct LaTeX editing, edit `book.tex` and use the default build command.
- For Markdown editing, edit `book.md`, regenerate, and commit both the Markdown
  and generated LaTeX so readers can compile without Pandoc.

The preparation step replaces the Markdown's manual contents and title with
print-native versions, promotes heading levels, preserves chapter anchors, and
normalizes dash typography. The Lua filter uses native math fonts, measures
displayed equations, and scales an equation only if it exceeds the text width.
None of the original edition's equations needed scaling.

## Equation and layout checks

The original PDF has **164 pages**, **669 displayed equations**, and **244
chapter/section bookmarks**. Its fonts are embedded, the text is selectable,
and the contents are clickable. The build had no missing-character warnings,
undefined commands, font-substitution warnings, or overfull boxes.

Visual review included contact sheets for every page and 14 detailed page
samples covering tensor notation, the geodesic derivation, covariant
derivatives, the Einstein–Hilbert variation and boundary terms, cosmology,
ADM equations, tetrads, exercises, and the reference sheet.

After substantive edits, inspect the rendered PDF as well as the compiler log.
A successful build checks typesetting; it does not establish the mathematical
correctness of new content.
