<script>
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
  let hackersIdx = 0;
  const tokens = manifestoSrc.map(item => {
    if (item === 'br') return { br: true };
    const cls = Array.isArray(item) ? item[1] : '';
    const text = Array.isArray(item) ? item[0] : item;
    const idx = wordIdx++;
    if (cls === 'hackers') hackersIdx = idx;
    return { text, cls, idx };
  });
  const wordCount = wordIdx;

  let scale = $state(1);
  let scrollY = $state(0);
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

  // Scroll phases (in viewport-heights of scroll distance):
  //   0–1vh:     tile reverse wave fade-out
  //   1–2vh:     word-by-word manifesto reveal
  //   2–2.3vh:   underline animation on "wiser" phrase
  let tilePhase = $derived(Math.max(0, Math.min(1, scrollY / vh)));
  let wordPhase = $derived(Math.max(0, Math.min(1, (scrollY - vh) / vh)));
  let underlinePhase = $derived(Math.max(0, Math.min(1, (scrollY - vh * 2) / (vh * 0.3))));

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

  // Per-word opacity with hold on "hackers."
  // Remap wordPhase to pause after "hackers." is fully visible
  // Ensure hackers is fully opaque at hold point: its start + WORD_FADE
  const WORD_FADE = 3 / wordCount;
  const hackersStart = (hackersIdx / wordCount) * (1 - WORD_FADE);
  const hackersNorm = hackersStart + WORD_FADE;
  const HOLD = 0.2; // fraction of scroll spent holding

  function wordOpacity(wordIndex) {
    if (wordPhase === 0) return 0;
    let phase;
    if (wordPhase <= hackersNorm + HOLD) {
      // Before and during hold: only reveal words up to hackers
      if (wordIndex > hackersIdx) return 0;
      phase = Math.min(wordPhase, hackersNorm);
    } else {
      phase = hackersNorm + (wordPhase - hackersNorm - HOLD) / (1 - hackersNorm - HOLD) * (1 - hackersNorm);
    }
    const start = (wordIndex / wordCount) * (1 - WORD_FADE);
    return Math.max(0, Math.min(1, (phase - start) / WORD_FADE));
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
        <p class="hero-desc">Join a team of 40 of the most ambitious young people that will help build Hack Club for the next year.<br /><span class="scroll-hint">Scroll down to read <span class="scroll-arrow">↓</span></span></p>
      </div>
    </div>

    <div class="manifesto">
      <p class="manifesto-text">{#each tokens as t, i}{#if t.br}<br />{:else}<span class="word{t.cls ? ` ${t.cls}` : ''}" style:opacity={wordOpacity(t.idx)} style:text-decoration-color={t.cls === 'wiser' ? `rgba(238, 238, 238, ${underlinePhase})` : undefined}>{t.text}{#if i < tokens.length - 1 && !tokens[i + 1].br}{' '}{/if}</span>{/if}{/each}</p>
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
    height: 330dvh;
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
    font-size: 20px;
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

  .wiser {
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
  }

  @media (max-width: 768px) {
    .manifesto-text {
      font-size: 18px;
      max-width: 90vw;
      padding: 0 16px;
    }
  }

  @media (max-width: 480px) {
    .manifesto-text {
      font-size: 13.5px;
      line-height: 1.4;
    }
  }
</style>
