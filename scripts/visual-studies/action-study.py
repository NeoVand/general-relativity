"""Original, annotated design study; does not modify the production book.

Run with Python 3 and matplotlib installed. Writes SVG and PNG review artifacts.
The numerical integration below checks the plotted free-particle example
against its closed-form action, including positive and negative variations.
"""
from pathlib import Path
import xml.etree.ElementTree as ET

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "docs/review-evidence/2026-09-09/visual-development"
OUT.mkdir(parents=True, exist_ok=True)

BG, FG, MUTED = "#101923", "#edf0f3", "#b8c3ce"
GRID, TEAL, VIOLET, PINK = "#344452", "#68d6c5", "#baa3ff", "#ffa2bc"
plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 16,
    "text.color": FG, "axes.labelcolor": MUTED,
    "xtick.color": MUTED, "ytick.color": MUTED,
    "axes.edgecolor": GRID, "axes.facecolor": BG,
    "figure.facecolor": BG, "savefig.facecolor": BG,
    # Embed glyph outlines so the standalone study does not depend on a
    # browser having matplotlib's fonts. Its title/description remain text.
    "mathtext.fontset": "dejavusans", "svg.fonttype": "path",
})

m, duration, q1, q2, amplitude, amount = 1., 2., .4, 1.6, .45, .8
v0 = (q2 - q1) / duration
base_action = .5 * m * v0**2 * duration
coefficient = m * amplitude**2 * np.pi**2 / (4 * duration)
t = np.linspace(0, duration, 2001)
eta = amplitude * np.sin(np.pi * t / duration)
q = q1 + v0 * t
trial = q + amount * eta
for value in [-1., -.8, 0., .8, 1.]:
    velocity = v0 + value * amplitude * np.pi / duration * np.cos(np.pi * t / duration)
    measured = np.trapezoid(.5 * m * velocity**2, t)
    assert abs(measured - (base_action + coefficient * value**2)) < 1e-10
assert np.max(np.abs(eta[[0, -1]])) < 1e-14
assert np.max(np.abs(trial[[0, -1]] - [q1, q2])) < 1e-14

fig = plt.figure(figsize=(14, 11), dpi=150)
fig.text(.065, .957, "DESIGN STUDY  /  CHAPTER 13", color=VIOLET, size=12, weight="bold")
fig.text(.065, .907, "Change the journey. Keep the endpoints.", size=27)
fig.text(.065, .868, "A free particle, a trial history, and the action assigned to each whole history.", color=MUTED, size=15)

def style(ax):
    ax.spines[["top", "right"]].set_visible(False)
    ax.tick_params(length=0, pad=10, labelsize=14)
    ax.set_axisbelow(True)

history = fig.add_axes([.11, .47, .81, .33])
style(history)
history.set_xlim(-.05, 2.18)
history.set_ylim(.05, 2.02)
history.set_ylabel("Position  q  [m]", labelpad=18)
history.set_xticks([0, 1, 2], ["$t_1=0$", "$t_* = 1$", "$t_2=2$"])
history.set_yticks([.4, 1., 1.6], ["$q_1=0.4$", "1.0", "$q_2=1.6$"])
history.text(1.0, -.17, "Time  t  [s]", transform=history.transAxes, ha="right", color=MUTED, size=14)
history.hlines([.4, 1.6], [-.05, -.05], [0, 2], color=GRID, lw=1.2, linestyle=":")
history.vlines([0, 2], .05, [.4, 1.6], color=GRID, lw=1.2, linestyle=":")
history.plot(t, q, color=TEAL, lw=3.4)
history.plot(t, trial, color=VIOLET, lw=3.4)
history.scatter([0, 2], [q1, q2], s=100, color=FG, edgecolors=BG, zorder=5)
history.text(.055, .21, "fixed endpoint", color=MUTED, size=13)
history.annotate("fixed endpoint", xy=(2, q2), xytext=(1.72, 1.88),
                 color=MUTED, size=13, arrowprops={"arrowstyle": "-", "color": GRID})
history.annotate(r"Trial history  $q_\lambda(t)$", xy=(.45, float(np.interp(.45, t, trial))),
                 xytext=(.08, 1.63), color=VIOLET, size=17,
                 arrowprops={"arrowstyle": "-", "color": VIOLET, "lw": 1.2})
history.annotate("Reference history  $q(t)$", xy=(1.5, 1.3),
                 xytext=(1.24, .52), color=TEAL, size=17,
                 arrowprops={"arrowstyle": "-", "color": TEAL, "lw": 1.2})
history.vlines(1, .05, 1.36, color=GRID, lw=1.2, linestyle=":")
history.scatter([1, 1], [1, 1.36], s=30, color=PINK, zorder=6)
history.annotate("", xy=(1, 1.36), xytext=(1, 1),
                 arrowprops={"arrowstyle": "|-|", "color": PINK, "lw": 1.8})
history.text(1.045, 1.19, r"$\lambda\eta(t_*)$", color=PINK, size=17)
history.text(.94, 1.10, "$0.36$ m", ha="right", color=PINK, size=13)

profile = fig.add_axes([.11, .17, .33, .17])
style(profile)
profile.set_xlim(0, 2)
profile.set_ylim(-.015, .57)
profile.set_xticks([0, 1, 2])
profile.set_yticks([0, .45])
profile.set_xlabel("Time  t  [s]", labelpad=9)
profile.set_ylabel(r"$\eta(t)$  [m]", labelpad=10)
profile.plot(t, eta, color=PINK, lw=3)
profile.scatter([0, 2], [0, 0], s=40, color=FG, clip_on=False, zorder=5)
profile.scatter([1], [.45], s=55, color=PINK, zorder=5)
profile.hlines(.45, 0, 1, color=GRID, lw=1, linestyle=":")
profile.text(.5, 1.25, "1. Choose a displacement shape", ha="center", transform=profile.transAxes, size=17)
profile.text(.5, 1.07, "Eta specifies a displacement at each time.", ha="center", transform=profile.transAxes, size=13, color=MUTED)

action = fig.add_axes([.60, .17, .32, .17])
style(action)
lambdas = np.linspace(-1.08, 1.08, 400)
action.plot(lambdas, base_action + coefficient * lambdas**2, color=VIOLET, lw=3)
action.set_xlim(-1.15, 1.15)
action.set_ylim(.33, .70)
action.set_xticks([-1, 0, .8], ["−1", "0", "0.8"])
action.set_yticks([.36, .52, .68])
action.set_xlabel("Amount  λ  [dimensionless]", labelpad=9)
action.set_ylabel("Action  S  [J s]", labelpad=10)
action.plot([-.23, .23], [.36, .36], color=TEAL, lw=2)
action.scatter([0], [.36], color=TEAL, s=45, zorder=5)
action.scatter([amount], [base_action + coefficient * amount**2], color=VIOLET, s=65, zorder=5)
action.vlines(amount, .33, base_action + coefficient * amount**2, color=GRID, lw=1, linestyle=":")
action.annotate("zero slope", xy=(0, .36), xytext=(0, .62), ha="center", color=TEAL, size=13,
                arrowprops={"arrowstyle": "-", "color": TEAL, "lw": 1})
action.text(.5, 1.25, "2. Change its amount", ha="center", transform=action.transAxes, size=17)
action.text(.5, 1.07, "The upper plot uses λ = 0.8.", ha="center", transform=action.transAxes, size=13, color=MUTED)

fig.text(.065, .055, r"$q_\lambda(t)=q(t)+\lambda\eta(t)$", color=FG, size=19)
fig.text(.50, .06, "One point on the action graph represents one whole history.", color=MUTED, size=13)
fig.text(.50, .035, "This free-particle example has a minimum. Other actions can have saddles.", color=MUTED, size=12)

for extension in ("svg", "png"):
    fig.savefig(OUT / f"action-study.{extension}", dpi=150)
plt.close(fig)

svg_path = OUT / "action-study.svg"
tree = ET.parse(svg_path)
ns = "http://www.w3.org/2000/svg"
ET.register_namespace("", ns)
root = tree.getroot()
title = ET.Element(f"{{{ns}}}title", id="study-title")
title.text = "Change the journey. Keep the endpoints."
description = ET.Element(f"{{{ns}}}desc", id="study-description")
description.text = ("Design study of free-particle action. A straight reference history and a curved trial history "
                    "share positions 0.4 and 1.6 metres at times 0 and 2 seconds. A marked vertical displacement "
                    "at 1 second is lambda eta, or 0.36 metres. The lower plots show eta as a sine-shaped "
                    "displacement profile with zero endpoints and action as a quadratic function of its "
                    "dimensionless amount lambda, with zero slope at lambda zero.")
root.insert(0, title)
root.insert(1, description)
root.set("role", "img")
root.set("aria-labelledby", "study-title study-description")
tree.write(svg_path, encoding="unicode", xml_declaration=True)
svg_path.write_text("\n".join(line.rstrip() for line in svg_path.read_text().splitlines()) + "\n")
print(f"Verified fixed endpoints and action for five variations; wrote {OUT / 'action-study.svg'}")
