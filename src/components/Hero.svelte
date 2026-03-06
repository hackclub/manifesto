<script>
  let { applyUrl = '#' } = $props();

  const DEADLINE = new Date('2026-03-20T23:59:59');
  let daysRemaining = $state(Math.max(0, Math.ceil((DEADLINE - new Date()) / 86400000)));
  $effect(() => {
    const id = setInterval(() => {
      daysRemaining = Math.max(0, Math.ceil((DEADLINE - new Date()) / 86400000));
    }, 60000);
    return () => clearInterval(id);
  });

  // cx/cy = offset from center of 1920×1065 Figma frame, w/h = px dimensions
  const tiles = [
    // top band
    { src: '/hero/01.webp', cx: -623.97, cy: -331.20, w: 546.059, h: 274.602 },
    { src: '/hero/02.webp', cx:  -53.28, cy: -386.75, w: 228.485, h: 163.503 },
    { src: '/hero/03.webp', cx:  173.63, cy: -386.75, w: 225.341, h: 163.503 },
    { src: '/hero/04.webp', cx:  423.08, cy: -355.83, w: 273.554, h: 225.341 },
    { src: '/hero/05.webp', cx:  644.23, cy: -355.83, w: 168.744, h: 225.341 },
    { src: '/hero/06.webp', cx:  812.91, cy: -355.92, w: 168.875, h: 225.166 },
    // left column
    { src: '/hero/07.webp', cx: -259.23, cy: -310.24, w: 183.417, h: 316.526 },
    { src: '/hero/08.webp', cx: -760.22, cy:  -57.12, w: 273.554, h: 273.554 },
    { src: '/hero/09.webp', cx: -487.19, cy:  -57.12, w: 272.506, h: 273.554 },
    { src: '/hero/10.webp', cx: -259.23, cy:  -62.36, w: 183.417, h: 179.225 },
    // center (large)
    { src: '/hero/11.webp', cx:   59.39, cy: -138.87, w: 453.827, h: 332.247 },
    { src: '/hero/12.webp', cx:  398.97, cy: -168.74, w: 225.341, h: 148.830 },
    { src: '/hero/13.webp', cx:  659.60, cy: -132.19, w: 295.913, h: 221.935 },
    // right column — small stacked
    { src: '/hero/14.webp', cx:  852.28, cy: -189.71, w:  90.136, h: 106.906 },
    { src: '/hero/15.webp', cx:  852.28, cy:  -78.61, w:  90.136, h: 115.291 },
    { src: '/hero/24.webp', cx:  852.28, cy:   35.11, w:  90.136, h: 112.147 },
    // middle left band
    { src: '/hero/16.webp', cx: -806.86, cy:  170.32, w: 180.273, h: 181.321 },
    { src: '/hero/17.webp', cx: -593.58, cy:  170.32, w: 246.303, h: 181.321 },
    { src: '/hero/18.webp', cx: -410.68, cy:  170.32, w: 119.483, h: 181.321 },
    { src: '/hero/19.webp', cx: -208.92, cy:  126.82, w: 284.035, h: 199.139 },
    { src: '/hero/20.webp', cx:  109.70, cy:  126.82, w: 353.209, h: 199.139 },
    { src: '/hero/21.webp', cx:  399.04, cy:   55.99, w: 225.472, h: 300.630 },
    { src: '/hero/22.webp', cx:  599.68, cy:   25.15, w: 176.081, h:  92.233 },
    { src: '/hero/23.webp', cx:  747.47, cy:   35.11, w: 119.483, h: 112.147 },
    { src: '/hero/25.webp', cx:  599.68, cy:  138.87, w: 176.081, h: 135.205 },
    { src: '/hero/26.webp', cx:  792.53, cy:  148.83, w: 209.620, h: 115.291 },
    // bottom band
    { src: '/hero/27.webp', cx: -768.08, cy:  364.74, w: 257.832, h: 207.523 },
    { src: '/hero/28.webp', cx: -495.05, cy:  364.74, w: 288.227, h: 207.523 },
    { src: '/hero/29.webp', cx: -208.92, cy:  347.44, w: 284.035, h: 242.111 },
    { src: '/hero/30.webp', cx:   47.86, cy:  347.44, w: 229.534, h: 242.111 },
    { src: '/hero/31.webp', cx:  392.16, cy:  260.98, w: 211.716, h: 109.002 },
    { src: '/hero/32.webp', cx:  224.47, cy:  301.33, w: 123.676, h: 149.878 },
    { src: '/hero/33.webp', cx:  345.52, cy:  391.99, w: 118.435, h: 153.022 },
    { src: '/hero/34.webp', cx:  437.75, cy:  390.94, w: 120.531, h: 153.022 },
    { src: '/hero/35.webp', cx:  224.47, cy:  422.38, w: 123.676, h:  92.233 },
  ];

  const EAGER_COUNT = 11;

  // Wave stagger: top-left → bottom-right
  const diagonals = tiles.map(({ cx, cy }) => cx + cy);
  const minDiag = Math.min(...diagonals);
  const maxDiag = Math.max(...diagonals);
  const INITIAL_DELAY = 0.4;
  const MAX_DELAY = 3.2;
  const FADE_DURATION = 1.2;

  const CX = 960, CY = 532.5; // center of 1920×1065

  // Normalized wave position per tile: 0 = top-left (first in), 1 = bottom-right (last in)
  const tileWavePos = diagonals.map(d => (d - minDiag) / (maxDiag - minDiag));

  function tileStyle(cx, cy, w, h) {
    const diag = cx + cy;
    const delay = (INITIAL_DELAY + (diag - minDiag) / (maxDiag - minDiag) * MAX_DELAY).toFixed(3);
    return [
      `left:${CX + cx}px`,
      `top:${CY + cy}px`,
      `width:${w}px`,
      `height:${h}px`,
      `animation-delay:${delay}s`,
    ].join(';');
  }

  // Manifesto tokens: pre-computed for clean rendering
  const manifestoSrc = [
    'Some', 'people', 'are', 'allergic', 'to', 'unthinking', 'rules', 'and', 'bad', 'systems.', 'br',
    'A', 'few', 'also', 'have', 'the', 'talent', 'and', 'vision', 'to', 'will', 'something', 'better', 'into', 'being:', 'br',
    ['hackers.', 'hackers'], 'br',
    'We', 'can', 'either', 'embrace', 'them', 'and', 'reap', 'the', 'magic,', 'or', 'alienate', 'them', 'and',
    'suffer', 'the', 'loss.', 'br', ["It's", 'wiser'], ['time', 'wiser'], ['we', 'wiser'], ['chose', 'wiser'],
    ['the', 'wiser'], ['wiser', 'wiser'], ['path.', 'wiser'],
  ];

  let wordIdx = 0;
  let wiserIdx = 0;
  const tokens = manifestoSrc.map(item => {
    if (item === 'br') return { br: true };
    const cls = Array.isArray(item) ? item[1] : '';
    const text = Array.isArray(item) ? item[0] : item;
    const idx = wordIdx++;
    const wi = cls === 'wiser' ? wiserIdx++ : -1;
    return { text, cls, idx, wi };
  });
  const wiserStartIdx = tokens.findIndex(t => t.cls === 'wiser');
  const preWiserTokens = tokens.slice(0, wiserStartIdx);
  const wiserTokens = tokens.slice(wiserStartIdx);

  let scale = $state(1);
  let scrollY = $state(typeof window !== 'undefined' ? window.scrollY : 0);
  let introComplete = $state(false);
  let vh = $state(1);

  $effect(() => {
    // Skip intro animation if page loaded already scrolled (e.g. browser refresh)
    if (window.scrollY > 50) {
      introComplete = true;
      return;
    }
    document.body.style.overflow = 'hidden';
    const id = setTimeout(() => {
      introComplete = true;
      document.body.style.overflow = '';
    }, (INITIAL_DELAY + MAX_DELAY + FADE_DURATION) * 1000);
    return () => {
      clearTimeout(id);
      document.body.style.overflow = '';
    };
  });

  $effect(() => {
    function update() {
      scale = window.innerHeight / 1065;
      vh = window.innerHeight;
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  });

  $effect(() => {
    function onScroll() { scrollY = window.scrollY; }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  // Scroll timeline config (all values in viewport-heights)
  const TILE_FADE = 0.6;         // how long the tile fade-out takes
  const WORD_START = TILE_FADE;  // words start right after tiles finish
  const WORD_DURATION = 2.5;     // how long the word reveal takes
  const UNDERLINE_GAP = 0.1;     // pause before underline starts
  const UNDERLINE_DURATION = 0.3;// how long the underline sweep takes
  const MANIFESTO_HOLD = 0.3;   // hold after underline before fading out
  const MANIFESTO_FADE = 0.4;   // manifesto fade-out duration
  const FELLOWSHIP_FADE = 0.5;  // fellowship fade-in duration
  const FELLOWSHIP_HOLD = 0.3;  // hold after fellowship fades in

  const WORD_END = WORD_START + WORD_DURATION;
  const UNDERLINE_START = WORD_END + UNDERLINE_GAP;
  const UNDERLINE_END = UNDERLINE_START + UNDERLINE_DURATION;
  const MANIFESTO_FADE_START = UNDERLINE_END + MANIFESTO_HOLD;
  const FELLOWSHIP_START = MANIFESTO_FADE_START + MANIFESTO_FADE * 0.3; // overlap slightly

  let tilePhase = $derived(Math.max(0, Math.min(1, scrollY / (vh * TILE_FADE))));
  let wordPhase = $derived(Math.max(0, Math.min(1, (scrollY - vh * WORD_START) / (vh * WORD_DURATION))));
  let underlinePhase = $derived(Math.max(0, Math.min(1, (scrollY - vh * UNDERLINE_START) / (vh * UNDERLINE_DURATION))));
  let manifestoFadeOut = $derived(Math.max(0, Math.min(1, (scrollY - vh * MANIFESTO_FADE_START) / (vh * MANIFESTO_FADE))));
  let fellowshipFadeIn = $derived(Math.max(0, Math.min(1, (scrollY - vh * FELLOWSHIP_START) / (vh * FELLOWSHIP_FADE))));

  // Reverse wave: bottom-right (wave=1) fades first, top-left (wave=0) fades last
  function tileOpacity(index) {
    if (!introComplete) return undefined;
    if (tilePhase === 0) return 1;
    const revWave = 1 - tileWavePos[index];
    const FADE_W = 0.5;
    const start = revWave * (1 - FADE_W);
    return Math.max(0, Math.min(1, 1 - (tilePhase - start) / FADE_W));
  }

  // Hero content fades out quickly
  let heroContentOpacity = $derived(
    !introComplete ? undefined : Math.max(0, 1 - tilePhase * 3)
  );

  // Segment-based reveal: each sentence fades in independently, with holds between
  const segments = [
    { start: 0,  end: 9,  holdAfter: 0.07, weight: 10 }, // "Some people ... systems."
    { start: 10, end: 23, holdAfter: 0.07, weight: 14 }, // "A few ... being:"
    { start: 24, end: 24, holdAfter: 0.14, weight: 3 },  // "hackers." (extra weight for smooth fade)
    { start: 25, end: 40, holdAfter: 0.07, weight: 16 }, // "We can ... loss."
    { start: 41, end: 47, holdAfter: 0,    weight: 7 },  // "It's time ... path."
  ];

  const totalHold = segments.reduce((s, seg) => s + seg.holdAfter, 0);
  const activeRange = 1 - totalHold;
  const totalWeight = segments.reduce((s, seg) => s + seg.weight, 0);

  // Pre-compute raw-phase boundaries for each segment
  let _cursor = 0;
  const segBounds = segments.map(seg => {
    const rawActive = (seg.weight / totalWeight) * activeRange;
    const rawStart = _cursor;
    const rawEnd = _cursor + rawActive;
    const rawHoldEnd = rawEnd + seg.holdAfter;
    _cursor = rawHoldEnd;
    return { ...seg, rawStart, rawEnd, rawHoldEnd };
  });

  function wordOpacity(wordIndex) {
    if (wordPhase === 0) return 0;

    // Find which segment this word belongs to
    const seg = segBounds.find(s => wordIndex >= s.start && wordIndex <= s.end);
    if (!seg || wordPhase < seg.rawStart) return 0;

    // Local progress within this segment (0→1)
    const localPhase = Math.min(1, (wordPhase - seg.rawStart) / (seg.rawEnd - seg.rawStart));

    // Per-word fade within the segment
    const segSize = seg.end - seg.start + 1;
    const localIdx = wordIndex - seg.start;
    const localFade = Math.min(1, 3 / segSize);
    const localStart = (localIdx / segSize) * (1 - localFade);

    return Math.max(0, Math.min(1, (localPhase - localStart) / localFade));
  }
</script>

<section class="hero">
  <div class="hero-sticky">
    <div class="inner" style:transform="scale({scale})">
      <div class="collage">
        {#each tiles as { src, cx, cy, w, h }, i}
          <img
            class="tile"
            class:intro-done={introComplete}
            style="{tileStyle(cx, cy, w, h)}{tileOpacity(i) !== undefined ? `;opacity:${tileOpacity(i)}` : ''}"
            {src}
            alt=""
            loading={i < EAGER_COUNT ? 'eager' : 'lazy'}
            decoding={i < EAGER_COUNT ? 'sync' : 'async'}
            fetchpriority={i < 3 ? 'high' : 'auto'}
          />
        {/each}
      </div>

      <div
        class="hero-content"
        class:intro-done={introComplete}
        style={heroContentOpacity !== undefined ? `opacity:${heroContentOpacity}` : ''}
      >
        <div class="detail">
          <img class="flag" src="/hero/flag.svg" alt="Hack Club" loading="eager" fetchpriority="high" />
          <p class="headline">hackers wanted.</p>
        </div>
        <p class="hero-desc">Hack Club is hiring 40 teenagers on a paid gap year to build the next generation of Hack Club's programs.</p>
        <a class="fellowship-link-btn hero-apply-btn" href={applyUrl} target="_blank" rel="noopener noreferrer">Apply Now ({daysRemaining} days remaining)</a>
        <span class="scroll-hint">Scroll down to read <span class="scroll-arrow">↓</span></span>
      </div>
    </div>

    <div class="manifesto" style:opacity={1 - manifestoFadeOut}>
      <p class="manifesto-text">{#each preWiserTokens as t, i}{#if t.br}<br />{:else}<span class="word{t.cls ? ` ${t.cls}` : ''}" style:opacity={wordOpacity(t.idx)}>{t.text}{#if i < preWiserTokens.length - 1 && !preWiserTokens[i + 1].br}{' '}{/if}</span>{/if}{/each}<span class="wiser-group" style="background-size:{underlinePhase * 100}% 2px">{#each wiserTokens as t, i}<span class="word wiser" style:opacity={wordOpacity(t.idx)}>{t.text}{#if i < wiserTokens.length - 1}{' '}{/if}</span>{/each}</span></p>
    </div>

    <div class="fellowship" style:opacity={fellowshipFadeIn}>
      <h2 class="fellowship-title">Introducing the Hack Club Gap Year Fellowship</h2>
      <div class="fellowship-body">
        <p>This is a paid full-time in person role at Hack Club HQ. $50k/year + $2k hardware + healthcare & benefits. It's intended to be something you do for a year before you go to college or whatever your plans are after high school, but if you are on an alternate schooling path that works too!</p>
        <p>The job is to design and execute on the next generation of You Ship, We Ships!</p>
        <p>The people who have this job today are all of the Hack Club staff you see running programs. This is the next batch of people running Hack Club!</p>
      </div>
      <div class="fellowship-cta">
        <a class="fellowship-btn" href={applyUrl} target="_blank" rel="noopener noreferrer">Apply Now ({daysRemaining} days remaining)</a>
        <div class="fellowship-links">
          <a class="fellowship-link-btn" href="https://notes.deven.dev/posts/the-plan-for-hack-club-world-dominance" target="_blank" rel="noopener noreferrer">How Hack Club works</a>
          <a class="fellowship-link-btn" href="/manifesto">Read the Hacker Manifesto</a>
        </div>
        <span class="fellowship-scroll-hint">scroll to keep reading <span class="scroll-arrow">↓</span></span>
      </div>
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');

  @font-face {
    font-family: 'Glyseric';
    src: url('/Glyseric.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  .hero {
    position: relative;
    height: 570dvh;
    background: #1c1c1a;
  }

  .hero-sticky {
    position: sticky;
    top: 0;
    height: 100dvh;
    overflow: hidden;
  }

  .inner {
    position: absolute;
    right: 0;
    top: 0;
    width: 1920px;
    height: 1065px;
    transform-origin: top right;
  }

  .collage {
    position: absolute;
    inset: 0;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .tile {
    position: absolute;
    transform: translate(-50%, -50%);
    object-fit: cover;
    display: block;
    opacity: 0;
    animation: fadeIn 1.2s ease-out forwards;
  }

  .tile.intro-done {
    animation: none;
    opacity: 1;
  }

  /* Matches Figma clip box: right=63, bottom=65 in the 1920×1065 coordinate space */
  .hero-content {
    position: absolute;
    right: 63px;
    bottom: 65px;
    width: 340px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    opacity: 0;
    animation: fadeIn 1.2s ease-out forwards;
    animation-delay: 3s;
  }

  .hero-content.intro-done {
    animation: none;
    opacity: 1;
  }

  .detail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .flag {
    height: 37px;
    width: auto;
    display: block;
  }

  .headline {
    font-family: 'Young Serif', serif;
    font-size: 40px;
    color: #fff;
    line-height: 1.1;
    margin: 0;
  }

  .hero-desc {
    font-family: 'Glyseric', 'Newsreader', sans-serif;
    font-size: 16px;
    color: #fff;
    line-height: 1.4;
    margin: 0;
  }

  .scroll-hint {
    color: rgba(255, 255, 255, 0.6);
    opacity: 0;
    animation: fadeIn 1s ease-out 4s forwards;
  }

  @keyframes bounce {
    0% { transform: translateY(0); }
    50% { transform: translateY(4px); }
    100% { transform: translateY(0); }
  }

  .scroll-arrow {
    display: inline-block;
    animation: bounce 1.5s ease-in-out infinite;
    animation-delay: 5s;
  }

  /* Manifesto overlay */
  .manifesto {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .manifesto-text {
    font-family: 'Glyseric', 'Newsreader', sans-serif;
    font-size: 27px;
    color: #eee;
    text-align: center;
    line-height: 1.5;
    max-width: 1122px;
    margin: 0;
  }

  .word {
    display: inline;
    opacity: 0;
  }

  .hackers {
    font-family: 'Young Serif', serif;
    color: #ec5750;
  }

  .wiser-group {
    background-image: linear-gradient(#eee, #eee);
    background-position: bottom left;
    background-repeat: no-repeat;
    background-size: 0% 2px;
    padding-bottom: 4px;
  }

  /* Fellowship overlay */
  .fellowship {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 36px;
    padding: 0 32px;
    opacity: 0;
    pointer-events: none;
  }

  .fellowship-title {
    font-family: 'Young Serif', serif;
    font-size: 42px;
    color: #eee;
    text-align: center;
    max-width: 1331px;
    margin: 0;
    font-weight: normal;
    line-height: normal;
  }

  .fellowship-body {
    font-family: 'Glyseric', 'Newsreader', sans-serif;
    font-size: 28px;
    color: rgba(238, 238, 238, 0.8);
    text-align: center;
    max-width: 1122px;
    line-height: normal;
    margin: 0;
  }

  .fellowship-body p {
    margin: 0 0 1em;
  }

  .fellowship-body p:last-child {
    margin-bottom: 0;
  }

  .fellowship-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 340px;
    height: 49px;
    border: 2px solid #fff;
    border-radius: 9999px;
    font-size: 21px;
    font-family: 'Glyseric', 'Newsreader', sans-serif;
    color: #fff;
    text-decoration: none;
    transition: background 0.5s, color 0.5s;
    pointer-events: auto;
  }

  .fellowship-btn:hover {
    background: #fff;
    color: #1c1c1a;
  }

  .fellowship-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .fellowship-links {
    display: flex;
    gap: 10px;
  }

  .fellowship-link-btn {
    padding: 6px 16px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 9999px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 13px;
    font-family: 'Glyseric', 'Newsreader', sans-serif;
    text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease;
    pointer-events: auto;
  }

  .fellowship-link-btn:hover {
    border-color: #fff;
    color: #fff;
  }

  .hero-apply-btn {
    align-self: flex-start;
    pointer-events: auto;
    border-width: 2px;
    border-color: #fff;
    color: #fff;
    transition: background 0.5s, color 0.5s;
  }

  .hero-apply-btn:hover {
    background: #fff;
    color: #1c1c1a;
  }

  .fellowship-scroll-hint {
    color: rgba(255, 255, 255, 0.5);
    font-size: 13px;
    font-family: 'Glyseric', 'Newsreader', sans-serif;
  }

  @media (max-width: 768px) {
    .manifesto-text {
      font-size: 18px;
      max-width: 90vw;
      padding: 0 16px;
    }
    .fellowship-title { font-size: 36px; }
    .fellowship-body { font-size: 24px; }
  }

  @media (max-width: 480px) {
    .manifesto-text {
      font-size: 13.5px;
      line-height: 1.4;
    }
    .fellowship-title { font-size: 22px; }
    .fellowship-body { font-size: 16px; }
    .fellowship-btn { width: 150px; height: 33px; font-size: 15px; }
  }
</style>
