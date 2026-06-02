<!-- kalvisan.lv  ·  personal portfolio  ·  source -->

```
> / ^ \ < / v \ > / ^ \ < / v \ > / ^ \ < / v \ > /

   K A L V I S
   solution architect  ·  riga, latvia

\ v / < \ ^ > / v \ < ^ / > \ v < / ^ > \ v / < \ v
```

```yaml
role:     Solution architect and full-stack developer
location: Riga, Latvia
years:    10+ in software, much of it leading teams
status:   Open to new opportunities
site:     https://www.kalvisan.lv
```

I design and build software end to end, from PostgreSQL schemas and APIs to the
React interfaces on top, the Kubernetes infrastructure underneath, and the AI on
top of that. On the side I build small generative graphics experiments. This
repository is the source of my site. Plain HTML, CSS, and vanilla JavaScript, no
build step.

<br>

### `$ cat stack.txt`

```text
backend   ·  Laravel   PHP        Python      PostgreSQL   REST   microservices
frontend  ·  React     Inertia    Next.js     TypeScript   Tailwind   React Native
infra     ·  Docker    Kubernetes CI/CD       OpenTofu     Terraform  SRE
ai/data   ·  RAG       vector search   OpenAI and model APIs   TensorFlow   ETL
hardware  ·  Robotics and IoT   Arduino and NodeMCU   PCB   generative graphics
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
[ live ]  001  ASCII Noise Field   an animated flow field of ASCII chevrons
                                    over a value-noise mask, drifting and
                                    morphing with a grainy, dithered edge.
                                    -> experiments/ascii-noise/

[ wip  ]  002  Schema Diff Viewer  a side by side view of two PostgreSQL
                                    schema dumps, marking added, dropped,
                                    and changed columns inline.

[ wip  ]  003  Queue Inspector     a small dashboard for watching Laravel
                                    queue jobs run, with retries, timings,
                                    and a readable payload preview.
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
> / ^ \   built with plain web tech and a value-noise field   \ v / <
```

[**Visit the site**](https://www.kalvisan.lv) &nbsp;·&nbsp; [**GitHub**](https://github.com/kalvisan) &nbsp;·&nbsp; [**LinkedIn**](https://www.linkedin.com/in/kalvis-ko%C4%BCes%C5%86ikovs-45264785/)
