# Preview videos

Hover preview clips for the experiments list on the home page. Drop the files
here with the exact names below. Until a file exists, its preview simply does
not show, so the site never looks broken.

| Project               | File name                       |
|-----------------------|---------------------------------|
| OpenClaw Pixel Office | `openclaw-pixel-office.mp4`     |
| ASCII Noise Field     | `ascii-noise.mp4`               |
| Browser RAG Demo      | `browser-rag-demo.mp4`          |
| Sensor Field          | `sensor-field.mp4`              |

To add or rename one, edit the `video` field of the matching entry in the
`EXPERIMENTS` array near the bottom of `index.html`.

## What each clip should be

- No audio. The site mutes them anyway, so export without an audio track to
  keep the file small.
- A short loop, around 6 to 12 seconds, that reads well when it repeats.
- 16 by 9. The frame is shown at 16 by 9 and cropped to fill, so keep the
  important action near the centre.
- Clear and easy to read. Show what the project actually does.
- MP4, H.264 video. Aim for roughly 1280 by 720 and a small file size, ideally
  under a few megabytes, so the page stays fast.

## How they play

- On screens that hover (laptops and desktops), the clip opens and plays when
  you hover the row or focus it with the keyboard.
- On phones and tablets, where there is no hover, the clip is always shown and
  plays when it scrolls into view.
- If the visitor asks for reduced motion, clips do not autoplay on touch
  devices and only play on a deliberate hover.
