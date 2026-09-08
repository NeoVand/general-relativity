#!/usr/bin/env python3
"""Compile the checked-in LaTeX; optionally regenerate it from Markdown."""
import argparse
from pathlib import Path
import re
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / 'build'
DIST = ROOT / 'dist'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--from-markdown', action='store_true',
                        help='Regenerate book.tex from book.md, replacing direct TeX edits.')
    args = parser.parse_args()
    required = ['xelatex'] + (['pandoc'] if args.from_markdown else [])
    for command in required:
        if not shutil.which(command):
            parser.error(f'{command} is not installed or is not on PATH; see README.md.')
    BUILD.mkdir(exist_ok=True)
    DIST.mkdir(exist_ok=True)
    if args.from_markdown:
        subprocess.run([sys.executable, str(ROOT / 'scripts/prepare.py')], check=True)
        options = ['documentclass=scrbook', 'classoption=oneside', 'classoption=openany',
                   'fontsize=11pt', 'papersize=letter', 'geometry:margin=0.75in',
                   'mainfont=Latin Modern Roman', 'sansfont=Latin Modern Sans',
                   'monofont=Latin Modern Mono', 'mathfont=Latin Modern Math',
                   'linestretch=1.06']
        command = ['pandoc', str(BUILD / 'book.md'),
                   '--from=markdown+tex_math_dollars+header_attributes-smart',
                   '--to=latex', '--standalone', '--top-level-division=chapter',
                   '--lua-filter=' + str(ROOT / 'typesetting/print.lua'),
                   '--include-in-header=' + str(ROOT / 'typesetting/header.tex'),
                   '--include-before-body=' + str(ROOT / 'typesetting/cover.tex')]
        for option in options:
            command.extend(['-V', option])
        generated = BUILD / 'generated.tex'
        subprocess.run(command + ['-o', str(generated)], check=True)
        text = generated.read_text(encoding='utf-8')
        text = text.replace('\\setstretch{1.06}\n\\mainmatter', '\\setstretch{1.06}', 1)
        (ROOT / 'book.tex').write_text(text, encoding='utf-8')

    for number in range(1, 4):
        log_path = BUILD / f'pass-{number}.txt'
        print(f'XeLaTeX pass {number}/3', flush=True)
        with log_path.open('w', encoding='utf-8') as log:
            result = subprocess.run(
                ['xelatex', '-interaction=nonstopmode', '-halt-on-error',
                 '-file-line-error', str(ROOT / 'book.tex')],
                cwd=BUILD, stdout=log, stderr=subprocess.STDOUT)
        if result.returncode:
            print(log_path.read_text(encoding='utf-8', errors='replace')[-6000:],
                  file=sys.stderr)
            raise SystemExit(f'Build failed; full output: {log_path}')

    log_text = (BUILD / 'book.log').read_text(encoding='utf-8', errors='replace')
    issues = [line for line in log_text.splitlines() if
              re.search(r'Overfull|Missing character|undefined|LaTeX Font Warning|^!', line)]
    if issues:
        print('\n'.join(issues), file=sys.stderr)
        raise SystemExit('Typesetting issues detected. Inspect build/book.log before releasing.')
    equations = re.findall(r'GRDISPLAY\|(\d+)\|([\d.]+)pt\|([\d.]+)pt', log_text)
    scaled = [n for n, width, limit in equations if float(width) > float(limit)]
    print(f'{len(equations)} displayed equations compiled.')
    if scaled:
        print('Inspect equations scaled to fit: ' + ', '.join(scaled))
    destination = DIST / 'General_Relativity_From_the_Inside_Out.pdf'
    shutil.copyfile(BUILD / 'book.pdf', destination)
    print(f'PDF: {destination}')


if __name__ == '__main__':
    main()
