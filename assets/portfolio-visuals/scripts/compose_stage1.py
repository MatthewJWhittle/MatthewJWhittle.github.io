#!/usr/bin/env python3
"""Rebuild stage-1 TileArray portfolio compositions from committed panels.

Requires: pillow
Does not fetch remote tiles. Live acquisition notes live in ../manifest.json.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PANELS = ROOT / "panels"
EXPORTS = ROOT / "exports"
REVIEW = ROOT / "review"

PAPER = (245, 242, 233, 255)
MOSS = (80, 109, 90, 255)
RUST = (202, 117, 77, 255)
BLUE = (167, 185, 187, 255)
RULE = (210, 206, 196, 255)
MUTED = (120, 125, 120, 255)

# AOI in panel-xyz-osm-london.png pixel space (1024×768 contain canvas of source)
# Source AOI was (297, 223, 727, 545) on 1024×768 mosaic.
AOI_SRC = (297, 223, 727, 545)


def fit_cover(im: Image.Image, w: int, h: int) -> Image.Image:
    im = im.convert("RGBA")
    scale = max(w / im.width, h / im.height)
    nw, nh = int(im.width * scale), int(im.height * scale)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - w) // 2
    top = (nh - h) // 2
    return im.crop((left, top, left + w, top + h))


def cover_transform(src_w: int, src_h: int, box_w: int, box_h: int) -> tuple[float, float, float]:
    scale = max(box_w / src_w, box_h / src_h)
    nw, nh = src_w * scale, src_h * scale
    left = (nw - box_w) / 2
    top = (nh - box_h) / 2
    return scale, left, top


def src_to_panel(
    pt: tuple[float, float],
    scale: float,
    left: float,
    top: float,
    origin: tuple[int, int],
) -> tuple[float, float]:
    x, y = pt
    return origin[0] + x * scale - left, origin[1] + y * scale - top


def faint_array_grid(im: Image.Image, step: int = 48) -> Image.Image:
    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    w, h = im.size
    colour = (80, 109, 90, 40)
    for x in range(0, w, step):
        d.line([(x, 0), (x, h)], fill=colour, width=1)
    for y in range(0, h, step):
        d.line([(0, y), (w, y)], fill=colour, width=1)
    return Image.alpha_composite(im.convert("RGBA"), overlay)


def corner_marks(draw: ImageDraw.ImageDraw, box: tuple[float, ...], arm: int = 18, width: int = 2) -> None:
    x0, y0, x1, y1 = box
    for x, y, dx, dy in (
        (x0, y0, 1, 1),
        (x1, y0, -1, 1),
        (x0, y1, 1, -1),
        (x1, y1, -1, -1),
    ):
        draw.line([(x, y), (x + dx * arm, y)], fill=MOSS, width=width)
        draw.line([(x, y), (x, y + dy * arm)], fill=MOSS, width=width)


def draw_aoi_rect(draw: ImageDraw.ImageDraw, box: tuple[float, ...], width: int = 3) -> None:
    x0, y0, x1, y1 = box
    for i in range(width):
        draw.rectangle([x0 - i, y0 - i, x1 + i, y1 + i], outline=RUST)


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


def compose_hero(osm: Image.Image, aoi: Image.Image, width: int, height: int, stacked: bool) -> Image.Image:
    canvas = Image.new("RGBA", (width, height), PAPER)
    d = ImageDraw.Draw(canvas)
    margin = max(16, width // 40)
    gap = max(12, width // 50)

    if stacked:
        top_h = int((height - 3 * margin - gap) * 0.55)
        bot_h = height - 3 * margin - gap - top_h
        panel_w = width - 2 * margin
        scale, left, top = cover_transform(osm.width, osm.height, panel_w, top_h)
        canvas.paste(fit_cover(osm, panel_w, top_h), (margin, margin))
        p0 = src_to_panel((AOI_SRC[0], AOI_SRC[1]), scale, left, top, (margin, margin))
        p1 = src_to_panel((AOI_SRC[2], AOI_SRC[3]), scale, left, top, (margin, margin))
        ax0 = max(margin + 2, p0[0])
        ay0 = max(margin + 2, p0[1])
        ax1 = min(margin + panel_w - 2, p1[0])
        ay1 = min(margin + top_h - 2, p1[1])
        draw_aoi_rect(d, (ax0, ay0, ax1, ay1))
        mid_x = width // 2
        d.line([(mid_x, margin + top_h + 2), (mid_x, margin + top_h + gap - 2)], fill=MOSS, width=2)
        ry0 = margin + top_h + gap
        right = faint_array_grid(fit_cover(aoi, panel_w, bot_h), step=max(24, panel_w // 12))
        canvas.paste(right, (margin, ry0), right)
        corner_marks(d, (margin + 4, ry0 + 4, margin + panel_w - 4, ry0 + bot_h - 4), arm=max(12, width // 30))
        d.rectangle([margin, margin, margin + panel_w - 1, margin + top_h - 1], outline=RULE, width=1)
        d.rectangle([margin, ry0, margin + panel_w - 1, ry0 + bot_h - 1], outline=RULE, width=1)
    else:
        usable_w = width - 2 * margin - gap
        left_w = int(usable_w * 0.58)
        right_w = usable_w - left_w
        panel_h = height - 2 * margin
        scale, left, top = cover_transform(osm.width, osm.height, left_w, panel_h)
        canvas.paste(fit_cover(osm, left_w, panel_h), (margin, margin))
        p0 = src_to_panel((AOI_SRC[0], AOI_SRC[1]), scale, left, top, (margin, margin))
        p1 = src_to_panel((AOI_SRC[2], AOI_SRC[3]), scale, left, top, (margin, margin))
        ax0 = max(margin + 2, p0[0])
        ay0 = max(margin + 2, p0[1])
        ax1 = min(margin + left_w - 2, p1[0])
        ay1 = min(margin + panel_h - 2, p1[1])
        draw_aoi_rect(d, (ax0, ay0, ax1, ay1))
        rx0 = margin + left_w + gap
        mid_y = (ay0 + ay1) / 2
        d.line([(ax1 + 2, mid_y), (rx0 - 4, mid_y)], fill=MOSS, width=2)
        d.polygon([(rx0 - 4, mid_y), (rx0 - 12, mid_y - 5), (rx0 - 12, mid_y + 5)], fill=MOSS)
        right = faint_array_grid(fit_cover(aoi, right_w, panel_h), step=max(28, right_w // 10))
        canvas.paste(right, (rx0, margin), right)
        corner_marks(d, (rx0 + 6, margin + 6, rx0 + right_w - 6, margin + panel_h - 6), arm=22)
        d.rectangle([rx0, margin, rx0 + right_w - 1, margin + panel_h - 1], outline=RULE, width=1)
        d.rectangle([margin, margin, margin + left_w - 1, margin + panel_h - 1], outline=RULE, width=1)
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
    if stacked:
        n = 3
        panel_h = (height - 2 * margin - (n - 1) * gap) // n
        panel_w = width - 2 * margin
        y = margin
        for src in sources:
            canvas.paste(fit_cover(src, panel_w, panel_h), (margin, y))
            d.rectangle([margin, y, margin + panel_w - 1, y + panel_h - 1], outline=RULE, width=1)
            y += panel_h + gap
    else:
        n = 3
        panel_w = (width - 2 * margin - (n - 1) * gap) // n
        panel_h = height - 2 * margin
        x = margin
        for src in sources:
            canvas.paste(fit_cover(src, panel_w, panel_h), (x, margin))
            d.rectangle([x, margin, x + panel_w - 1, margin + panel_h - 1], outline=RULE, width=1)
            x += panel_w + gap
    return canvas


def compose_pipeline(osm: Image.Image, aoi: Image.Image, width: int, height: int, stacked: bool) -> Image.Image:
    canvas = Image.new("RGBA", (width, height), PAPER)
    d = ImageDraw.Draw(canvas)
    margin = max(18, width // 36)
    if stacked:
        stages = 4
        gap = max(10, height // 50)
        stage_h = (height - 2 * margin - (stages - 1) * gap) // stages
        stage_w = width - 2 * margin
        boxes = []
        y = margin
        for _ in range(stages):
            boxes.append((margin, y, margin + stage_w, y + stage_h))
            y += stage_h + gap
    else:
        stages = 4
        gap = max(14, width // 45)
        stage_w = (width - 2 * margin - (stages - 1) * gap) // stages
        stage_h = height - 2 * margin
        boxes = []
        x = margin
        for _ in range(stages):
            boxes.append((x, margin, x + stage_w, margin + stage_h))
            x += stage_w + gap

    def stage_bg(box: tuple[int, ...]) -> None:
        d.rounded_rectangle(box, radius=6, fill=(252, 250, 245, 255), outline=RULE, width=1)

    cols, rows = 5, 4

    # 1 plan
    b = boxes[0]
    stage_bg(b)
    inner = (b[0] + 14, b[1] + 14, b[2] - 14, b[3] - 14)
    iw, ih = inner[2] - inner[0], inner[3] - inner[1]
    tw, th = iw / cols, ih / rows
    for r in range(rows):
        for c in range(cols):
            x0 = inner[0] + c * tw
            y0 = inner[1] + r * th
            d.rectangle([x0, y0, x0 + tw - 2, y0 + th - 2], outline=BLUE, width=1, fill=(167, 185, 187, 55))
    draw_aoi_rect(d, (inner[0] + tw * 1.1, inner[1] + th * 0.8, inner[0] + tw * 3.6, inner[1] + th * 3.0), width=2)

    # 2 fetch
    b = boxes[1]
    stage_bg(b)
    inner = (b[0] + 14, b[1] + 14, b[2] - 14, b[3] - 14)
    iw, ih = inner[2] - inner[0], inner[3] - inner[1]
    tw, th = iw / cols, ih / rows
    inflight = {(1, 1), (2, 1)}
    queued = {(1, 2), (2, 2), (3, 1)}
    for r in range(rows):
        for c in range(cols):
            x0 = inner[0] + c * tw
            y0 = inner[1] + r * th
            rect = [x0, y0, x0 + tw - 2, y0 + th - 2]
            if (c, r) in inflight:
                tile_im = fit_cover(osm, max(4, int(tw - 2)), max(4, int(th - 2)))
                canvas.paste(tile_im, (int(x0), int(y0)))
                d.rectangle(rect, outline=MOSS, width=2)
            elif (c, r) in queued:
                d.rectangle(rect, outline=BLUE, width=1, fill=(167, 185, 187, 90))
            else:
                d.rectangle(rect, outline=RULE, width=1, fill=PAPER)

    # 3 mosaic
    b = boxes[2]
    stage_bg(b)
    inner = (b[0] + 14, b[1] + 14, b[2] - 14, b[3] - 14)
    iw, ih = inner[2] - inner[0], inner[3] - inner[1]
    mosaic = fit_cover(aoi, iw, ih)
    canvas.paste(mosaic, (inner[0], inner[1]))
    for c in range(1, 3):
        x = inner[0] + int(iw * c / 3)
        d.line([(x, inner[1]), (x, inner[3])], fill=(245, 242, 233, 100), width=1)
    for r in range(1, 3):
        y = inner[1] + int(ih * r / 3)
        d.line([(inner[0], y), (inner[2], y)], fill=(245, 242, 233, 100), width=1)
    d.rectangle(list(inner), outline=MOSS, width=1)

    # 4 lazy vs compute
    b = boxes[3]
    stage_bg(b)
    pad = 14
    mid = (b[0] + b[2]) // 2
    lazy_box = [b[0] + pad, b[1] + pad, mid - 8, b[3] - pad]
    comp_box = [mid + 8, b[1] + pad, b[2] - pad, b[3] - pad]
    dashed_rect(d, lazy_box)
    lw = lazy_box[2] - lazy_box[0]
    lh = lazy_box[3] - lazy_box[1]
    for i in range(1, 4):
        d.line(
            [(lazy_box[0] + int(lw * i / 4), lazy_box[1] + 4), (lazy_box[0] + int(lw * i / 4), lazy_box[3] - 4)],
            fill=RULE,
            width=1,
        )
        d.line(
            [(lazy_box[0] + 4, lazy_box[1] + int(lh * i / 4)), (lazy_box[2] - 4, lazy_box[1] + int(lh * i / 4))],
            fill=RULE,
            width=1,
        )
    cw = comp_box[2] - comp_box[0]
    ch = comp_box[3] - comp_box[1]
    filled = faint_array_grid(fit_cover(aoi, cw, ch), step=max(16, cw // 6))
    canvas.paste(filled, (comp_box[0], comp_box[1]), filled)
    d.rectangle(comp_box, outline=MOSS, width=2)
    corner_marks(d, tuple(comp_box), arm=max(10, width // 80))

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


def main() -> None:
    EXPORTS.mkdir(parents=True, exist_ok=True)
    REVIEW.mkdir(parents=True, exist_ok=True)

    osm = Image.open(PANELS / "panel-xyz-osm-london.png")
    aoi = Image.open(PANELS / "panel-xyz-osm-london-aoi.png")
    elev = Image.open(PANELS / "panel-wcs-ea-lidar-hillshade.png")
    kart = Image.open(PANELS / "panel-wmts-kartverket-oslo.png")
    vom = Image.open(PANELS / "panel-wms-ea-vom.png")

    hero_d = compose_hero(osm, aoi, 1400, 720, stacked=False)
    hero_m = compose_hero(osm, aoi, 780, 1280, stacked=True)
    gal_d = compose_gallery(elev, kart, vom, 1400, 520, stacked=False)
    gal_m = compose_gallery(elev, kart, vom, 780, 1400, stacked=True)
    pipe_d = compose_pipeline(osm, aoi, 1400, 420, stacked=False)
    pipe_m = compose_pipeline(osm, aoi, 780, 1400, stacked=True)

    pairs = [
        (hero_d, "fig01-hero-area-to-array-desktop.png", "fig01-desktop-1400.png", None),
        (hero_m, "fig01-hero-area-to-array-mobile.png", "fig01-mobile-390.png", (390, 640)),
        (gal_d, "fig02-output-gallery-desktop.png", "fig02-desktop-1400.png", None),
        (gal_m, "fig02-output-gallery-mobile.png", "fig02-mobile-390.png", (390, 700)),
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
        print("wrote", export_name)


if __name__ == "__main__":
    main()
