<!-- kalvisan.lv  ·  personal portfolio  ·  source -->

```
> / ^ \ < / v \ > / ^ \ < / v \ > / ^ \ < / v \ > /

   K A L V I S
   solution architect  ·  riga, latvia

\ v / < \ ^ > / v \ < ^ / > \ v < / ^ > \ v / < \ v
```

```yaml
role:     Builder and explorer. Solution architect by trade
focus:    Applied AI, robotics, and whatever catches my interest
location: Remote. Based in Riga, Latvia
years:    10+ in software, much of it leading teams
status:   Open to new opportunities
site:     https://www.kalvisan.lv
```

I build things and like to find out how they work, mostly AI and robotics, but I
follow whatever catches my interest. This site is where I publish what I research
and build, because I like to share it. This repository is the source of the site.

<br>

### `$ cat stack.txt`

```text
ai        ·  RAG   vector search   model training   TensorFlow   agents   embeddings
hardware  ·  robotics   Arduino   NodeMCU   PCB   sensors   HomeAssistant   canvas
backend   ·  Laravel   PHP   Python   Docker   Kubernetes   CI/CD   PostgreSQL
frontend  ·  React   Inertia   Next.js   TypeScript   Tailwind   React Native
```

<br>

### `$ history | grep roles`

```text
2025 .. now   co-founder, AI for DevOps and SRE
              infrastructure monitoring, incident analysis, root cause AI.

2024 .. now   co-founder and CTO, operations SaaS
              internal platform for large retail sites. lead dev, architect.

2020 .. now   co-founder and lead developer, product studio
              larger SaaS and mobile projects end to end. team of fifteen.

2014 .. 2020  software developer
              web, mobile, and internal systems across PHP, Python, Java, .NET.
```

<br>

### `$ ls experiments/`

```text
[ live ]  001  OpenClaw Pixel Office  a pixel-art office you build from 16x16
                                      tilesets and fill with AI agents you can
                                      talk to. -> openclaw-pixel-office/

[ live ]  002  ASCII Noise Field   an animated flow field of ASCII chevrons
                                    over a value-noise mask, drifting and
                                    morphing with a grainy, dithered edge.
                                    -> experiments/ascii-noise/

[ wip  ]  003  Browser RAG Demo    embeds a handful of documents in the
                                    browser and answers questions over them,
                                    retrieval and grounding with no server.

[ wip  ]  004  Sensor Field        a live view of an Arduino sensor rig,
                                    drawn as a drifting field so a change in
                                    the room shows up as motion on screen.
```

The live pieces are open source and free to use in your own projects.

<br>

### `$ tree .`

```text
.
├── index.html                      portfolio: nav, hero, about, experience, stack, experiments, contact
├── .nojekyll                       tells GitHub Pages to skip Jekyll
├── CNAME                           custom domain, do not edit
├── README.md                       you are here
└── experiments/
    └── ascii-noise/
        ├── index.html              standalone experiment page
        └── AsciiNoise.jsx          reusable React version of the effect
```

<br>

### `$ man edit`

All editable details live in one `SITE` block near the bottom of `index.html`.

```js
const SITE = {
  emailUser: "hello",          // email is built in the browser, never plain in source
  emailDomain: "kalvisan.lv",
  linkedin: "https://www.linkedin.com/in/...",   // empty hides the link
  github: "https://github.com/kalvisan"
};
```

Experience comes from the markup in the `#experience` section, and projects come
from the `EXPERIMENTS` array. Each project has `no`, `title`, `desc`, `tags`,
`year`, `href`, and `status`. A `status` of `live` renders the row as a link,
`wip` greys it out.

<br>

### `$ ./serve`

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

<br>

```
> / ^ \   handmade, with a live value-noise field running behind it   \ v / <
```

[**Visit the site**](https://www.kalvisan.lv) &nbsp;·&nbsp; [**GitHub**](https://github.com/kalvisan) &nbsp;·&nbsp; [**LinkedIn**](https://www.linkedin.com/in/kalvis-ko%C4%BCes%C5%86ikovs-45264785/)
