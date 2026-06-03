# Preview videos

Hover preview clips for the experiments list on the home page. Each project has
two formats, WebM and MP4, and the browser picks the one it can play. Drop the
files here with the exact base names below.

| Project               | Files                                                        |
|-----------------------|--------------------------------------------------------------|
| OpenClaw Pixel Office | `openclaw-pixel-office.webm`, `openclaw-pixel-office.mp4`    |
| ASCII Noise Field     | `ascii-noise.webm`, `ascii-noise.mp4`                        |
| Browser RAG Demo      | `browser-rag-demo.webm`, `browser-rag-demo.mp4`             |
| Sensor Field          | `sensor-field.webm`, `sensor-field.mp4`                     |

The `video` field of each entry in the `EXPERIMENTS` array in `index.html` holds
the base path with no extension, for example `assets/video/ascii-noise`. The page
adds the `.webm` and `.mp4` sources. If every source is missing, the preview is
hidden, so the list never shows a broken frame.

## What each clip should be

- No audio. Export without an audio track to keep the file small.
- A short loop, around 6 to 12 seconds, that reads well when it repeats.
- 16 by 9. The frame is shown at 16 by 9 and cropped to fill, so keep the
  important action near the centre.
- Clear and easy to read. Show what the project actually does.

## Encoding the formats

These were made with ffmpeg, scaled to 1280 wide and compressed with CRF so they
stay small while staying clear.

```bash
# MP4, H.264, for Safari and everything else
ffmpeg -i input.mov -an -vf "scale=1280:-2:flags=lanczos" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 28 -preset veryslow \
  -movflags +faststart assets/video/NAME.mp4

# WebM, VP9, smaller in most browsers
ffmpeg -i input.mov -an -vf "scale=1280:-2:flags=lanczos" \
  -c:v libvpx-vp9 -crf 36 -b:v 0 -pix_fmt yuv420p -row-mt 1 \
  assets/video/NAME.webm
```

## How they play

- On screens that hover, the clip opens and plays on hover or keyboard focus.
- On phones and tablets, where there is no hover, the clip is shown and plays
  when it scrolls into view.
- If the visitor asks for reduced motion, clips do not autoplay on touch devices
  and only play on a deliberate hover.
