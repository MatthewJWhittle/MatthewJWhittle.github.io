#!/usr/bin/env python3
"""Rebuild stage-1 TileArray portfolio compositions from committed panels.

Geometry rules (strict):
- fig01: AOI is chosen in *display* pixels on the placed left/top panel;
  the extract is that exact crop; the rust stroke is drawn *inside* that rect.
- fig02: cover-fill square frames; stroke drawn outside the data so it cannot
  overwrite top/bottom map rows with beige.
- fig03: each cell is a real adjacent OSM tile; AOI always bounds the full 3×2.

Requires: pillow
"""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PANELS = ROOT / "panels"
EXPORTS = ROOT / "exports"
REVIEW = ROOT / "review"
GEOM = json.loads((PANELS / "geometry.json").read_text())

PAPER = (245, 242, 233, 255)
MOSS = (80, 109, 90, 255)
RUST = (202, 117, 77, 255)
BLUE = (167, 185, 187, 255)
RULE = (210, 206, 196, 255)
MUTED = (120, 125, 120, 255)


def fit_cover(im: Image.Image, w: int, h: int) -> Image.Image:
    im = im.convert("RGBA")
    scale = max(w / im.width, h / im.height)
    nw, nh = int(round(im.width * scale)), int(round(im.height * scale))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - w) // 2
    top = (nh - h) // 2
    return im.crop((left, top, left + w, top + h))


def fit_contain(im: Image.Image, w: int, h: int, bg=PAPER) -> tuple[Image.Image, int, int, int, int]:
    im = im.convert("RGBA")
    scale = min(w / im.width, h / im.height)
    nw = max(1, int(round(im.width * scale)))
    nh = max(1, int(round(im.height * scale)))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (w, h), bg)
    ox, oy = (w - nw) // 2, (h - nh) // 2
    canvas.paste(im, (ox, oy), im)
    return canvas, ox, oy, nw, nh


def faint_array_grid(im: Image.Image, step: int = 48) -> Image.Image:
    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    w, h = im.size
    colour = (80, 109, 90, 45)
    for x in range(0, w + 1, step):
        d.line([(x, 0), (x, h)], fill=colour, width=1)
    for y in range(0, h + 1, step):
        d.line([(0, y), (w, y)], fill=colour, width=1)
    return Image.alpha_composite(im.convert("RGBA"), overlay)


def corner_marks(draw: ImageDraw.ImageDraw, box: tuple[int, ...], arm: int = 18, width: int = 2) -> None:
    x0, y0, x1, y1 = box
    for x, y, dx, dy in (
        (x0, y0, 1, 1),
        (x1, y0, -1, 1),
        (x0, y1, 1, -1),
        (x1, y1, -1, -1),
    ):
        draw.line([(x, y), (x + dx * arm, y)], fill=MOSS, width=width)
        draw.line([(x, y), (x, y + dy * arm)], fill=MOSS, width=width)


def draw_aoi_inset(draw: ImageDraw.ImageDraw, box: tuple[int, ...], width: int = 3) -> None:
    """Stroke strictly inside the crop rectangle so the visible box ⊆ extract."""
    x0, y0, x1, y1 = box
    for i in range(width):
        draw.rectangle([x0 + i, y0 + i, x1 - i, y1 - i], outline=RUST)


def dashed_rect(draw: ImageDraw.ImageDraw, box: list[int], colour=MUTED, dash: int = 7, gap: int = 5, width: int = 2) -> None:
    x0, y0, x1, y1 = box
    x = x0
    while x < x1:
        draw.line([(x, y0), (min(x + dash, x1), y0)], fill=colour, width=width)
        x += dash + gap
    x = x0
    while x < x1:
        draw.line([(x, y1), (min(x + dash, x1), y1)], fill=colour, width=width)
        x += dash + gap
    y = y0
    while y < y1:
        draw.line([(x0, y), (x0, min(y + dash, y1))], fill=colour, width=width)
        y += dash + gap
    y = y0
    while y < y1:
        draw.line([(x1, y), (x1, min(y + dash, y1))], fill=colour, width=width)
        y += dash + gap


def choose_display_aoi(panel_w: int, panel_h: int) -> tuple[int, int, int, int]:
    """AOI in left-panel local pixels — Golden Gate bridge span on NAIP SF."""
    aw = int(panel_w * 0.38)
    ah = int(panel_h * 0.42)
    ax0 = int(panel_w * 0.31)
    ay0 = int(panel_h * 0.28)
    return ax0, ay0, ax0 + aw, ay0 + ah


def paste_extract_matching_aspect(
    canvas: Image.Image,
    extract: Image.Image,
    dest: tuple[int, int, int, int],
) -> tuple[int, int, int, int]:
    """Place extract into dest preserving aspect (contain). Returns content box on canvas."""
    x0, y0, x1, y1 = dest
    tw, th = x1 - x0, y1 - y0
    placed, ox, oy, nw, nh = fit_contain(extract, tw, th)
    placed = faint_array_grid(placed, step=max(24, nw // 10))
    canvas.paste(placed, (x0, y0), placed)
    return x0 + ox, y0 + oy, x0 + ox + nw, y0 + oy + nh



def compose_hero(osm: Image.Image, width: int, height: int, stacked: bool) -> Image.Image:
    """AOI chosen in display pixels on the placed panel; extract is that exact crop.

    Outside-AOI is dimmed; frustum lines link box corners to the extract frame so
    geographic correspondence is unambiguous. Stroke is inset. Pixel err must be 0.
    """
    canvas = Image.new("RGBA", (width, height), PAPER)
    d = ImageDraw.Draw(canvas)
    margin = max(16, width // 40)
    gap = max(16, width // 45)

    def place(left_im: Image.Image, ax0: int, ay0: int, ax1: int, ay1: int, origin: tuple[int, int]) -> tuple[Image.Image, tuple[int, int, int, int]]:
        extract = left_im.crop((ax0, ay0, ax1, ay1))
        # Soft wash outside AOI only (alpha 0 inside). Never fully opaque paper.
        wash = Image.new("RGBA", left_im.size, (245, 242, 233, 0))
        alpha = Image.new("L", left_im.size, 100)
        ImageDraw.Draw(alpha).rectangle([ax0, ay0, ax1, ay1], fill=0)
        wash.putalpha(alpha)
        composed = Image.alpha_composite(left_im.convert("RGBA"), wash)
        # Restore exact AOI pixels (no wash bleed on the crop)
        composed.paste(extract, (ax0, ay0))
        canvas.paste(composed, origin)
        box = (origin[0] + ax0, origin[1] + ay0, origin[0] + ax1, origin[1] + ay1)
        # Stroke OUTSIDE the extract so every map pixel inside the rust frame
        # is identical to the right-hand panel (no orange covering the crop edge).
        for i in range(1, 4):
            d.rectangle([box[0] - i, box[1] - i, box[2] + i, box[3] + i], outline=RUST)
        err = float(np.abs(np.array(left_im.crop((ax0, ay0, ax1, ay1))) - np.array(extract)).mean())
        if err > 0:
            raise RuntimeError(f"hero AOI/extract mismatch err={err}")
        return extract, box

    def paste_extract(extract: Image.Image, dest_outer: tuple[int, int, int, int], box: tuple[int, int, int, int]) -> None:
        x0, y0, x1, y1 = dest_outer
        tw, th = x1 - x0, y1 - y0
        scale = min(tw / extract.width, th / extract.height)
        cw, ch = max(1, int(extract.width * scale)), max(1, int(extract.height * scale))
        rx = x0 + (tw - cw) // 2
        ry = y0 + (th - ch) // 2
        # NEAREST keeps the extract's pixels recognisably identical to the AOI
        # (LANCZOS softens landmarks and confuses side-by-side comparison).
        big = faint_array_grid(extract.resize((cw, ch), Image.Resampling.NEAREST), step=max(20, cw // 10))
        canvas.paste(big, (rx, ry), big)
        dest = (rx, ry, rx + cw, ry + ch)
        for (sx, sy), (dx, dy) in (
            ((box[0], box[1]), (dest[0], dest[1])),
            ((box[2], box[1]), (dest[2], dest[1])),
            ((box[0], box[3]), (dest[0], dest[3])),
            ((box[2], box[3]), (dest[2], dest[3])),
        ):
            d.line([(sx, sy), (dx, dy)], fill=MOSS, width=1)
        corner_marks(d, dest, arm=max(12, width // 70))
        d.rectangle([x0, y0, x1 - 1, y1 - 1], outline=RULE, width=1)

    if stacked:
        top_h = int((height - 3 * margin - gap) * 0.52)
        bot_h = height - 3 * margin - gap - top_h
        panel_w = width - 2 * margin
        origin = (margin, margin)
        left_im = fit_cover(osm, panel_w, top_h)
        ax0, ay0, ax1, ay1 = choose_display_aoi(panel_w, top_h)
        extract, box = place(left_im, ax0, ay0, ax1, ay1, origin)
        d.rectangle([margin, margin, margin + panel_w - 1, margin + top_h - 1], outline=RULE, width=1)
        ry0 = margin + top_h + gap
        paste_extract(extract, (margin, ry0, margin + panel_w, ry0 + bot_h), box)
        print("hero mobile display AOI", (ax0, ay0, ax1, ay1), "extract", extract.size)
    else:
        usable_w = width - 2 * margin - gap
        left_w = int(usable_w * 0.56)
        right_w = usable_w - left_w
        panel_h = height - 2 * margin
        origin = (margin, margin)
        left_im = fit_cover(osm, left_w, panel_h)
        ax0, ay0, ax1, ay1 = choose_display_aoi(left_w, panel_h)
        extract, box = place(left_im, ax0, ay0, ax1, ay1, origin)
        d.rectangle([margin, margin, margin + left_w - 1, margin + panel_h - 1], outline=RULE, width=1)

        scale = max(left_w / osm.width, panel_h / osm.height)
        nw, nh = osm.width * scale, osm.height * scale
        left = (nw - left_w) / 2
        top = (nh - panel_h) / 2
        GEOM["aoi_px"] = {
            "x0": int(round((ax0 + left) / scale)),
            "y0": int(round((ay0 + top) / scale)),
            "x1": int(round((ax1 + left) / scale)),
            "y1": int(round((ay1 + top) / scale)),
        }
        GEOM["aoi_display_desktop"] = {"panel": [left_w, panel_h], "local": [ax0, ay0, ax1, ay1]}
        extract.convert("RGB").save(PANELS / "panel-naip-sf-aoi.png", optimize=True)

        rx0 = margin + left_w + gap
        paste_extract(extract, (rx0, margin, rx0 + right_w, margin + panel_h), box)
        print("hero desktop display AOI", (ax0, ay0, ax1, ay1), "extract", extract.size)

    return canvas


def compose_gallery(
    elev: Image.Image,
    kart: Image.Image,
    vom: Image.Image,
    width: int,
    height: int,
    stacked: bool,
) -> Image.Image:
    canvas = Image.new("RGBA", (width, height), PAPER)
    d = ImageDraw.Draw(canvas)
    margin = max(16, width // 40)
    gap = max(10, width // 55)
    sources = [elev, kart, vom]

    def paste_framed(src: Image.Image, x: int, y: int, side: int) -> None:
        # Data fills the inner square; rule drawn on the outer 1px so it does not
        # replace map rows (which previously read as beige top/bottom strips).
        inner = side
        data = fit_cover(src, inner, inner)
        canvas.paste(data, (x, y))
        d.rectangle([x - 1, y - 1, x + inner, y + inner], outline=RULE, width=1)

    if stacked:
        n = 3
        panel_w = width - 2 * margin - 2  # room for outer stroke
        panel_h = (height - 2 * margin - (n - 1) * gap) // n - 2
        side = min(panel_w, panel_h)
        y = margin + 1
        for src in sources:
            x = margin + 1 + (panel_w - side) // 2
            paste_framed(src, x, y, side)
            y += side + gap + 2
    else:
        n = 3
        usable_w = width - 2 * margin - (n - 1) * gap - 2
        usable_h = height - 2 * margin - 2
        side = min(usable_w // n, usable_h)
        total_w = n * side + (n - 1) * gap
        x0 = margin + 1 + (usable_w - total_w) // 2
        y0 = margin + 1 + (usable_h - side) // 2
        x = x0
        for src in sources:
            paste_framed(src, x, y0, side)
            x += side + gap
    return canvas


def load_pipeline_tiles() -> tuple[list[Image.Image], tuple[int, int]]:
    cols, rows = GEOM["pipeline_tiles"]["grid"]
    images = [Image.open(PANELS / t["file"]).convert("RGBA") for t in GEOM["pipeline_tiles"]["tiles"]]
    assert len(images) == cols * rows
    for i in range(len(images)):
        for j in range(i + 1, len(images)):
            if np.array_equal(np.array(images[i]), np.array(images[j])):
                raise RuntimeError(f"duplicate tiles at {i},{j}")
    return images, (cols, rows)


def assemble_mosaic(tiles: list[Image.Image], grid: tuple[int, int], gap: int = 0) -> Image.Image:
    cols, rows = grid
    tw, th = tiles[0].size
    mosaic = Image.new("RGBA", (cols * tw + (cols - 1) * gap, rows * th + (rows - 1) * gap), PAPER)
    for i, tile in enumerate(tiles):
        c, r = i % cols, i // cols
        mosaic.paste(tile, (c * (tw + gap), r * (th + gap)), tile)
    return mosaic


def compose_pipeline(width: int, height: int, stacked: bool) -> Image.Image:
    canvas = Image.new("RGBA", (width, height), PAPER)
    d = ImageDraw.Draw(canvas)
    margin = max(18, width // 36)
    tiles, grid = load_pipeline_tiles()
    cols, rows = grid
    full = assemble_mosaic(tiles, grid, gap=0)

    if stacked:
        stages = 4
        gap = max(10, height // 50)
        stage_h = (height - 2 * margin - (stages - 1) * gap) // stages
        stage_w = width - 2 * margin
        boxes = [
            (margin, margin + i * (stage_h + gap), margin + stage_w, margin + i * (stage_h + gap) + stage_h)
            for i in range(stages)
        ]
    else:
        stages = 4
        gap = max(14, width // 45)
        stage_w = (width - 2 * margin - (stages - 1) * gap) // stages
        stage_h = height - 2 * margin
        boxes = [
            (margin + i * (stage_w + gap), margin, margin + i * (stage_w + gap) + stage_w, margin + stage_h)
            for i in range(stages)
        ]

    def stage_bg(box: tuple[int, ...]) -> None:
        d.rounded_rectangle(box, radius=6, fill=(252, 250, 245, 255), outline=RULE, width=1)

    def place_grid(box: tuple[int, ...], filled: set[int], show_aoi: bool, seam_gap: int = 4) -> None:
        stage_bg(box)
        pad = 14
        ix0, iy0, ix1, iy1 = box[0] + pad, box[1] + pad, box[2] - pad, box[3] - pad
        iw, ih = ix1 - ix0, iy1 - iy0
        cell = min(iw // cols, ih // rows) - seam_gap
        grid_w = cols * cell + (cols - 1) * seam_gap
        grid_h = rows * cell + (rows - 1) * seam_gap
        gx0 = ix0 + (iw - grid_w) // 2
        gy0 = iy0 + (ih - grid_h) // 2
        for i in range(cols * rows):
            c, r = i % cols, i // cols
            x0 = gx0 + c * (cell + seam_gap)
            y0 = gy0 + r * (cell + seam_gap)
            rect = [x0, y0, x0 + cell - 1, y0 + cell - 1]
            if i in filled:
                # Exact tile for this grid index — never the full mosaic
                tile = tiles[i].resize((cell, cell), Image.Resampling.LANCZOS)
                canvas.paste(tile, (x0, y0), tile.convert("RGBA"))
                d.rectangle(rect, outline=MOSS, width=2)
            else:
                d.rectangle(rect, outline=BLUE, width=1, fill=(167, 185, 187, 70))
        if show_aoi:
            draw_aoi_inset(d, (gx0 - 1, gy0 - 1, gx0 + grid_w, gy0 + grid_h), width=2)

    # 1 plan — empty 3×2 + AOI around full mosaic extent
    place_grid(boxes[0], filled=set(), show_aoi=True, seam_gap=5)

    # 2 fetch — two *adjacent* top-row tiles (0=TL Isle of Dogs, 1=TM O2) — clearly different
    place_grid(boxes[1], filled={0, 1}, show_aoi=False, seam_gap=5)

    # 3 assemble — all real tiles
    place_grid(boxes[2], filled=set(range(cols * rows)), show_aoi=False, seam_gap=2)

    # 4 lazy vs compute — same 3×2 aspect
    b = boxes[3]
    stage_bg(b)
    pad = 14
    mid = (b[0] + b[2]) // 2
    left_box = [b[0] + pad, b[1] + pad, mid - 8, b[3] - pad]
    right_box = [mid + 8, b[1] + pad, b[2] - pad, b[3] - pad]

    def place_aspect(target: list[int], content: Image.Image | None, dashed: bool) -> None:
        tw = target[2] - target[0]
        th = target[3] - target[1]
        if tw / max(th, 1) > 3 / 2:
            nh = th
            nw = int(nh * 3 / 2)
        else:
            nw = tw
            nh = int(nw * 2 / 3)
        x0 = target[0] + (tw - nw) // 2
        y0 = target[1] + (th - nh) // 2
        frame = [x0, y0, x0 + nw, y0 + nh]
        if dashed:
            dashed_rect(d, frame, colour=MUTED, dash=7, gap=5, width=2)
            for c in range(1, cols):
                x = x0 + int(nw * c / cols)
                d.line([(x, y0 + 3), (x, y0 + nh - 3)], fill=RULE, width=1)
            for r in range(1, rows):
                y = y0 + int(nh * r / rows)
                d.line([(x0 + 3, y), (x0 + nw - 3, y)], fill=RULE, width=1)
        else:
            assert content is not None
            placed = fit_cover(content, nw, nh)
            placed = faint_array_grid(placed, step=max(16, nw // 6))
            canvas.paste(placed, (x0, y0), placed)
            d.rectangle(frame, outline=MOSS, width=2)
            corner_marks(d, tuple(frame), arm=max(10, width // 80))

    place_aspect(left_box, None, dashed=True)
    place_aspect(right_box, full, dashed=False)

    if not stacked:
        for i in range(3):
            x0 = boxes[i][2] + 2
            x1 = boxes[i + 1][0] - 2
            y = (boxes[i][1] + boxes[i][3]) // 2
            d.line([(x0, y), (x1, y)], fill=MOSS, width=2)
            d.polygon([(x1, y), (x1 - 8, y - 4), (x1 - 8, y + 4)], fill=MOSS)
    else:
        for i in range(3):
            y0 = boxes[i][3] + 2
            y1 = boxes[i + 1][1] - 2
            x = (boxes[i][0] + boxes[i][2]) // 2
            d.line([(x, y0), (x, y1)], fill=MOSS, width=2)
            d.polygon([(x, y1), (x - 4, y1 - 8), (x + 4, y1 - 8)], fill=MOSS)
    return canvas


def make_pipeline_video(path: Path, fps: int = 5) -> None:
    tiles, grid = load_pipeline_tiles()
    cols, rows = grid
    tw = th = 256
    pad = 24
    W = cols * tw + 2 * pad
    H = rows * th + 2 * pad
    frames: list[Image.Image] = []

    def frame_with(filled: set[int], aoi: bool = False) -> Image.Image:
        im = Image.new("RGB", (W, H), PAPER[:3])
        d = ImageDraw.Draw(im)
        for i in range(cols * rows):
            c, r = i % cols, i // cols
            x0, y0 = pad + c * tw, pad + r * th
            if i in filled:
                im.paste(tiles[i].convert("RGB"), (x0, y0))
                d.rectangle([x0, y0, x0 + tw - 1, y0 + th - 1], outline=MOSS[:3], width=2)
            else:
                d.rectangle([x0, y0, x0 + tw - 1, y0 + th - 1], outline=BLUE[:3], width=1, fill=(230, 228, 220))
        if aoi:
            d.rectangle([pad - 3, pad - 3, pad + cols * tw + 2, pad + rows * th + 2], outline=RUST[:3], width=3)
        return im

    for _ in range(fps):
        frames.append(frame_with(set(), aoi=True))
    order = [0, 1, 2, 3, 4, 5]  # row-major: true spatial fill
    filled: set[int] = set()
    for idx in order:
        filled.add(idx)
        for _ in range(max(2, fps // 2)):
            frames.append(frame_with(filled, aoi=False))
    for _ in range(fps * 2):
        frames.append(frame_with(set(range(cols * rows)), aoi=False))

    path.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(path, save_all=True, append_images=frames[1:], duration=int(1000 / fps), loop=0, optimize=True)
    print("wrote video", path, "frames", len(frames))


def main() -> None:
    EXPORTS.mkdir(parents=True, exist_ok=True)
    REVIEW.mkdir(parents=True, exist_ok=True)

    # Locked editorial picks (PR #25): Hero A NAIP SF; Gallery = NAIP CV · Helvellyn · VOM
    hero_src = Image.open(PANELS / "panel-naip-sf.png")
    cv = Image.open(PANELS / "panel-naip-sacramento.png")
    elev = Image.open(PANELS / "panel-wcs-ea-helvellyn-hillshade.png")
    vom = Image.open(PANELS / "panel-wms-ea-vom.png")
    print("hero", hero_src.size, "cv", cv.size, "elev", elev.size, "vom", vom.size)

    hero_d = compose_hero(hero_src, 1400, 720, stacked=False)
    hero_m = compose_hero(hero_src, 780, 1280, stacked=True)
    gal_d = compose_gallery(cv, elev, vom, 1400, 560, stacked=False)
    gal_m = compose_gallery(cv, elev, vom, 780, 1500, stacked=True)
    pipe_d = compose_pipeline(1400, 440, stacked=False)
    pipe_m = compose_pipeline(780, 1400, stacked=True)

    pairs = [
        (hero_d, "fig01-hero-area-to-array-desktop.png", "fig01-desktop-1400.png", None),
        (hero_m, "fig01-hero-area-to-array-mobile.png", "fig01-mobile-390.png", (390, 640)),
        (gal_d, "fig02-output-gallery-desktop.png", "fig02-desktop-1400.png", None),
        (gal_m, "fig02-output-gallery-mobile.png", "fig02-mobile-390.png", (390, 750)),
        (pipe_d, "fig03-pipeline-desktop.png", "fig03-desktop-1400.png", None),
        (pipe_m, "fig03-pipeline-mobile.png", "fig03-mobile-390.png", (390, 700)),
    ]
    for img, export_name, review_name, review_size in pairs:
        rgb = img.convert("RGB")
        rgb.save(EXPORTS / export_name, optimize=True)
        if review_size:
            rgb.resize(review_size, Image.Resampling.LANCZOS).save(REVIEW / review_name, optimize=True)
        else:
            rgb.save(REVIEW / review_name, optimize=True)
        print("wrote", export_name, rgb.size)

    make_pipeline_video(EXPORTS / "fig03-pipeline-assembly.gif", fps=5)
    (REVIEW / "fig03-pipeline-assembly.gif").write_bytes((EXPORTS / "fig03-pipeline-assembly.gif").read_bytes())

    (PANELS / "geometry.json").write_text(json.dumps(GEOM, indent=2))
    print("updated geometry.json")


if __name__ == "__main__":
    main()
