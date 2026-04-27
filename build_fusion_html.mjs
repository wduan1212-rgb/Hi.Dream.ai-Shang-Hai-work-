import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const cwd = process.cwd();
const basePath = path.join(cwd, '自运营快速创作平台.html');
const icePath = path.join(cwd, '冰丝凉凉裤快速创作平台.html');
const outPath = path.join(cwd, '智象未来上海融合创作平台.html');
const logoPath = path.join(cwd, 'assets', 'hidream-logo-white.png');
let imageOptimizeStats = null;

function chunkString(value, size = 9000) {
  const chunks = [];
  for (let i = 0; i < value.length; i += size) chunks.push(value.slice(i, i + size));
  return chunks;
}

function buildIceSrcdoc(source) {
  const childStyle = String.raw`
<style id="fusion-ice-shell-style">
  :root{
    --bg:#050b18;
    --card:rgba(12,22,42,.78);
    --card2:rgba(8,18,34,.72);
    --line:rgba(125,176,255,.22);
    --line2:rgba(255,255,255,.08);
    --text:#edf6ff;
    --muted:#92a7c5;
    --cyan:#58c7ff;
    --violet:#9b6bff;
    --gold:#ffd36d;
    --green:#78f0aa;
    --ease:cubic-bezier(.22,1,.36,1);
  }
  html{background:transparent!important;scroll-behavior:smooth;color-scheme:dark}
  body{
    background:
      linear-gradient(180deg,rgba(8,16,31,.96),rgba(4,9,20,.98))!important;
    min-height:100vh;
    color:var(--text);
    overflow-x:hidden;
  }
  body::before{
    content:"";
    position:fixed;
    inset:0;
    pointer-events:none;
    opacity:.46;
    background-image:
      linear-gradient(rgba(88,199,255,.08) 1px,transparent 1px),
      linear-gradient(90deg,rgba(155,107,255,.06) 1px,transparent 1px);
    background-size:42px 42px;
    mask-image:linear-gradient(180deg,#000,transparent 88%);
  }
  .container{max-width:none!important;width:100%!important;padding:0 0 34px!important}
  .header,#panel-overview,.nav-tip,.product-mini,.feature-list,.ref-grid{display:none!important}
  .nav{
    position:sticky!important;
    top:0;
    z-index:50;
    margin:0 0 18px!important;
    padding:12px!important;
    border:1px solid rgba(120,165,255,.18)!important;
    border-radius:18px!important;
    background:rgba(7,15,30,.76)!important;
    backdrop-filter:blur(24px) saturate(140%);
    box-shadow:0 16px 44px rgba(0,0,0,.26), inset 0 1px 0 rgba(255,255,255,.05);
    gap:8px!important;
  }
  .nav button{
    border-radius:999px!important;
    min-height:38px;
    padding:0 14px!important;
    transition:background .42s var(--ease),border-color .42s var(--ease),box-shadow .42s var(--ease),color .42s var(--ease),transform .42s var(--ease)!important;
    border:1px solid rgba(255,255,255,.08)!important;
    background:rgba(255,255,255,.035)!important;
    color:#b9c8df!important;
  }
  .nav button.active{
    color:#fff!important;
    border-color:rgba(120,205,255,.58)!important;
    background:linear-gradient(135deg,rgba(54,128,255,.88),rgba(142,83,255,.84))!important;
    box-shadow:0 12px 28px rgba(63,130,255,.24),0 0 0 1px rgba(255,255,255,.12) inset!important;
  }
  .panel{animation:fusionPanel .54s var(--ease);padding:0!important}
  @keyframes fusionPanel{from{opacity:0;transform:translateY(18px);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
  .section-grid{gap:18px!important}
  .card,.library-card,.output-card,.history-item{
    border-radius:18px!important;
    border:1px solid rgba(126,175,255,.18)!important;
    background:linear-gradient(180deg,rgba(13,25,48,.82),rgba(6,14,29,.76))!important;
    box-shadow:0 20px 54px rgba(0,0,0,.26), inset 0 1px 0 rgba(255,255,255,.05)!important;
  }
  .title h2{
    color:#fff!important;
    letter-spacing:0!important;
  }
  .title p,.hint,.library-card p{color:var(--muted)!important}
  .ops{gap:10px!important}
  button,.primary,.secondary,.ghost,.danger{
    border-radius:12px!important;
    transition:transform .36s var(--ease),box-shadow .36s var(--ease),background .36s var(--ease),border-color .36s var(--ease)!important;
  }
  button:active{transform:scale(.98)}
  .primary{
    background:linear-gradient(135deg,#2f7dff,#945cff)!important;
    box-shadow:0 12px 30px rgba(66,129,255,.24)!important;
  }
  .secondary{background:rgba(88,199,255,.12)!important;border-color:rgba(88,199,255,.28)!important;color:#dff6ff!important}
  .ghost{background:rgba(255,255,255,.04)!important;border-color:rgba(255,255,255,.1)!important;color:#d9e6f6!important}
  .danger{background:rgba(255,103,128,.12)!important;border-color:rgba(255,103,128,.28)!important;color:#ffd6dd!important}
  .prompt-box{
    border-radius:16px!important;
    border-color:rgba(125,176,255,.2)!important;
    background:rgba(3,8,18,.66)!important;
    color:#eaf4ff!important;
    line-height:1.8!important;
  }
  .library-details{
    border-radius:14px!important;
    background:rgba(255,255,255,.035)!important;
    border-color:rgba(255,255,255,.08)!important;
  }
  .library-grid div{
    border-radius:12px!important;
    border-color:rgba(125,176,255,.16)!important;
    background:rgba(6,16,34,.68)!important;
  }
  .batch-wrap input{
    border-radius:12px!important;
    border-color:rgba(255,211,109,.36)!important;
    background:rgba(255,211,109,.08)!important;
    color:#fff!important;
  }
  @media(max-width:900px){
    .section-grid{grid-template-columns:1fr!important}
    .nav{overflow:auto;justify-content:flex-start!important}
    .nav button{white-space:nowrap}
  }
</style>`;

  const childScript = String.raw`
<script id="fusion-ice-frame-resize">
(() => {
  function sendHeight(){
    const h = Math.max(
      document.documentElement.scrollHeight || 0,
      document.body ? document.body.scrollHeight : 0,
      760
    );
    parent.postMessage({type:'fusion-ice-height', height:h}, '*');
  }
  window.addEventListener('load', sendHeight);
  window.addEventListener('resize', sendHeight);
  document.addEventListener('click', () => setTimeout(sendHeight, 90), true);
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(sendHeight);
    window.addEventListener('load', () => {
      if (document.body) ro.observe(document.body);
    });
  }
  setTimeout(sendHeight, 240);
})();
</script>`;

  let html = source;
  html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>冰丝凉凉裤 · 15 AI Prompt Modules</title>');
  html = html.replace(/src="data:image\/(?:png|jpeg);base64,[^"]+"/g, 'src=""');
  html = html.replace(/href="data:image\/(?:png|jpeg);base64,[^"]+"/g, 'href="#"');
  html = html.replace(/<header class="header">[\s\S]*?<\/header>\s*/i, '');
  html = html.replace(/<button class="active" data-panel="overview">产品概览<\/button>\s*/i, '');
  html = html.replace(/<section class="panel active" id="panel-overview">[\s\S]*?<\/section>\s*/i, '');
  html = html.replace(
    /\s*<div class="title"><div><h2>最近生成<\/h2><p>这里只保留最近 6 条定点换装记录，方便你复盘和回找。<\/p><\/div><\/div>\s*<div class="history-list" id="lookbook-history"><\/div>/i,
    '\n<div class="history-list" id="lookbook-history" hidden></div>'
  );
  html = html.replace('<button data-panel="lookbook">定点换装</button>', '<button class="active" data-panel="lookbook">定点换装</button>');
  html = html.replace('<section class="panel" id="panel-lookbook">', '<section class="panel active" id="panel-lookbook">');
  html = html.replace('</head>', `${childStyle}\n</head>`);
  html = html.replace('</body>', `${childScript}\n</body>`);
  return html;
}

function buildIdeaDock() {
  return String.raw`
<div class="fusion-idea-dock" id="fusion-idea-dock" data-side="right" style="top:72vh">
  <button class="fusion-idea-ball" id="fusion-idea-ball" type="button" aria-label="打开提示词灵感记录">
    <span class="fusion-idea-mark"></span>
  </button>
  <section class="fusion-idea-panel" id="fusion-idea-panel" aria-label="提示词灵感记录">
    <div class="fusion-idea-head">
      <div>
        <div class="fusion-idea-kicker">Prompt Notes</div>
        <h3>灵感备忘录</h3>
      </div>
      <button class="fusion-icon-btn" id="fusion-idea-close" type="button" aria-label="关闭">×</button>
    </div>
    <textarea id="fusion-idea-input" placeholder="随手记下一句提示词、镜头想法或变量组合..."></textarea>
    <div class="fusion-color-row" id="fusion-color-row" aria-label="标记颜色">
      <button class="active" type="button" data-color="gold" aria-label="金色"></button>
      <button type="button" data-color="blue" aria-label="蓝色"></button>
      <button type="button" data-color="violet" aria-label="紫色"></button>
      <button type="button" data-color="green" aria-label="绿色"></button>
      <button type="button" data-color="rose" aria-label="玫红"></button>
    </div>
    <div class="fusion-idea-actions">
      <button class="fusion-note-primary" id="fusion-idea-save" type="button">记录</button>
      <button class="fusion-note-ghost" id="fusion-idea-copy-input" type="button">复制输入</button>
      <button class="fusion-note-ghost" id="fusion-idea-copy-all" type="button">复制全部</button>
    </div>
    <div class="fusion-idea-list" id="fusion-idea-list"></div>
  </section>
</div>
<div class="fusion-copy-toast" id="fusion-copy-toast">已复制</div>`;
}

function buildOpsLibrary() {
  return String.raw`
<aside class="fusion-ops-drawer" id="fusion-ops-drawer" aria-hidden="true" aria-label="运营素材库">
  <div class="fusion-ops-backdrop" id="fusion-ops-backdrop"></div>
  <section class="fusion-ops-panel" role="dialog" aria-modal="true">
    <div class="fusion-ops-head">
      <div>
        <div class="fusion-ops-kicker">Operations Library</div>
        <h2>运营素材库</h2>
      </div>
      <button class="fusion-icon-btn" id="fusion-close-ops" type="button" aria-label="关闭">×</button>
    </div>
    <div class="fusion-ops-filters">
      <select id="fusion-ops-product" aria-label="素材产品">
        <option value="hair">直发梳 / Hair Brush</option>
        <option value="foot">磨脚器 / Foot File</option>
        <option value="trim">脱毛仪 / Trimmer</option>
        <option value="pore">黑头仪 / Pore Vacuum</option>
      </select>
      <select id="fusion-ops-module" aria-label="素材类型">
        <option value="vo">口播</option>
        <option value="flower">花字</option>
        <option value="comment">评论回复</option>
      </select>
      <input id="fusion-ops-search" type="search" autocomplete="off" placeholder="搜索素材关键词">
    </div>
    <div class="fusion-ops-summary" id="fusion-ops-summary"></div>
    <div class="fusion-ops-list" id="fusion-ops-list"></div>
  </section>
</aside>`;
}

function buildLeanHeader(logoSrc) {
  return String.raw`
<header class="fusion-v2-hero fusion-v3-hero">
  <div class="fusion-brandbar">
    <div class="fusion-brand-left">
      <img class="fusion-brand-logo" src="${logoSrc}" alt="HiDream.ai">
    </div>
    <div class="fusion-v2-actions" aria-label="工作台操作">
      <button class="fusion-v2-action" type="button" id="fusion-open-ops">素材库</button>
      <button class="fusion-v2-action" type="button" id="fusion-open-search">Search</button>
      <button class="fusion-v2-action" type="button" id="fusion-open-recent">Recent</button>
      <button class="fusion-v2-action" type="button" id="fusion-open-notes">Notes</button>
    </div>
  </div>
  <div class="fusion-v3-hero-grid">
    <div class="fusion-v2-hero-copy">
      <div class="fusion-v2-kicker">HiDream.ai · Creative Intelligence Workspace</div>
      <h1>智象未来上海</h1>
      <p>海外互动营销内容创作工作台</p>
      <div class="product-switch header-product-switch" aria-label="产品切换">
        <button class="product-btn active" data-product="ice" onclick="switchProduct('ice',this)">Prompt Hub</button>
        <button class="product-btn" data-product="hair" onclick="switchProduct('hair',this)">Hair Brush</button>
        <button class="product-btn" data-product="foot" onclick="switchProduct('foot',this)">Foot File</button>
        <button class="product-btn" data-product="trim" onclick="switchProduct('trim',this)">Trimmer</button>
        <button class="product-btn" data-product="pore" onclick="switchProduct('pore',this)">Pore Vacuum</button>
      </div>
    </div>
    <section class="fusion-v3-status-card" aria-label="当前工作流">
      <div class="fusion-v3-status-top">
        <span>Control Hub</span>
        <strong id="fusion-status-count">15</strong>
      </div>
      <div class="fusion-v3-status-main" id="fusion-status-product">冰丝凉凉裤 / AI Prompt Hub</div>
      <div class="fusion-v3-status-note" id="fusion-status-note">AI 视频提示词核心模块</div>
      <div class="fusion-v3-status-actions">
        <button class="fusion-v2-action primary" type="button" id="fusion-open-ops-hero">运营素材库</button>
        <button class="fusion-v2-action" type="button" id="fusion-focus-current-hero">进入当前模块</button>
      </div>
    </section>
  </div>
  <div class="product-subtitle" id="product-subtitle">当前产品：冰丝凉凉裤 / AI Prompt Hub · 15 个 AI 视频提示词核心模块</div>
  <div class="fusion-command-center" id="fusion-command-center">
    <label class="fusion-search-box" for="fusion-global-search">
      <span>Search</span>
      <input id="fusion-global-search" type="search" autocomplete="off" placeholder="输入关键词">
    </label>
    <select id="fusion-quick-product" aria-label="快速切换产品">
      <option value="ice">Prompt Hub</option>
      <option value="hair">Hair Brush</option>
      <option value="foot">Foot File</option>
      <option value="trim">Trimmer</option>
      <option value="pore">Pore Vacuum</option>
    </select>
    <select id="fusion-quick-module" aria-label="快速切换模块">
      <option value="prompt">AI 提示词</option>
      <option value="vo">口播</option>
      <option value="flower">花字</option>
      <option value="comment">评论</option>
    </select>
    <button class="fusion-v2-action primary" type="button" id="fusion-focus-current">Focus</button>
  </div>
  <div class="fusion-search-results" id="fusion-search-results" hidden></div>
</header>`;
}

function stripRedundantUi(source) {
  let html = source;
  html = html.replace(/<script id="ui-upgrade-script">[\s\S]*?<\/script>\s*/g, '');
  html = html.replace(/<style id="ui-upgrade-round[2-5]">[\s\S]*?<\/style>\s*/g, '');
  html = html.replace(/<script id="ui-upgrade-round[3-5]-script">[\s\S]*?<\/script>\s*/g, '');
  html = html.replace(/<div class="product-dock"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*/g, '');
  return html;
}

function optimizeEmbeddedImages(source) {
  const minBytes = 180 * 1024;
  const maxEdge = '1500';
  const jpegQuality = '76';
  const cache = new Map();
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fusion-images-'));
  let originalBytes = 0;
  let optimizedBytes = 0;
  let optimizedCount = 0;

  function optimizeDataUri(match, type, payload) {
    const uri = `data:image/${type};base64,${payload}`;
    if(cache.has(uri)) return cache.get(uri);
    const inputBuffer = Buffer.from(payload, 'base64');
    originalBytes += inputBuffer.length;
    if(inputBuffer.length < minBytes) {
      cache.set(uri, uri);
      optimizedBytes += inputBuffer.length;
      return uri;
    }
    const inputPath = path.join(tmpDir, `source-${cache.size}.${type === 'jpeg' ? 'jpg' : type}`);
    const outputPath = path.join(tmpDir, `optimized-${cache.size}.jpg`);
    try {
      fs.writeFileSync(inputPath, inputBuffer);
      execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', jpegQuality, '-Z', maxEdge, inputPath, '--out', outputPath], {stdio:'ignore'});
      const outputBuffer = fs.readFileSync(outputPath);
      if(outputBuffer.length > 0 && outputBuffer.length < inputBuffer.length) {
        const nextUri = `data:image/jpeg;base64,${outputBuffer.toString('base64')}`;
        cache.set(uri, nextUri);
        optimizedBytes += outputBuffer.length;
        optimizedCount += 1;
        return nextUri;
      }
    } catch(err) {
      // Keep the original image if macOS image conversion is unavailable.
    }
    cache.set(uri, uri);
    optimizedBytes += inputBuffer.length;
    return uri;
  }

  let html = source.replace(/data:image\/(png|jpeg);base64,([^"]+)/g, optimizeDataUri);
  html = html.replace(/download="([^"]+)\.png"/g, 'download="$1.jpg"');
  imageOptimizeStats = {optimizedCount, originalBytes, optimizedBytes};
  return html;
}

function buildFusionCss() {
  return String.raw`
<style id="fusion-visual-upgrade">
:root{
  --fusion-bg:#050b18;
  --fusion-panel:rgba(10,20,39,.78);
  --fusion-line:rgba(126,175,255,.18);
  --fusion-text:#eef6ff;
  --fusion-muted:#92a7c5;
  --fusion-blue:#3b82ff;
  --fusion-cyan:#58c7ff;
  --fusion-violet:#9b6bff;
  --fusion-gold:#ffd36d;
  --fusion-green:#77efaa;
  --fusion-rose:#ff7aa8;
  --fusion-ease:cubic-bezier(.22,1,.36,1);
}
body{
  background:
    radial-gradient(circle at 50% -20%, rgba(48,108,255,.22), transparent 38%),
    linear-gradient(180deg,#050b18 0%,#061123 52%,#040812 100%)!important;
  color:var(--fusion-text)!important;
}
.bg-orbs{display:none!important}
.bg-grid{opacity:.5!important;background-size:44px 44px!important}
.wrap{max-width:1880px!important}
header.fusion-hero, header{
  min-height:360px!important;
  border:1px solid rgba(126,175,255,.2)!important;
  border-radius:28px!important;
  background:
    linear-gradient(120deg,rgba(9,18,37,.94),rgba(8,18,38,.72) 56%,rgba(11,10,27,.86)),
    linear-gradient(90deg,rgba(88,199,255,.08),rgba(155,107,255,.08))!important;
  box-shadow:0 26px 80px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.06)!important;
  overflow:hidden!important;
}
header::before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    linear-gradient(rgba(88,199,255,.1) 1px,transparent 1px),
    linear-gradient(90deg,rgba(155,107,255,.07) 1px,transparent 1px);
  background-size:54px 54px;
  mask-image:linear-gradient(180deg,#000,transparent 78%);
  opacity:.55;
}
.fusion-brandbar{
  position:relative;
  z-index:2;
  width:min(96%,1760px);
  min-height:74px;
  margin:0 auto 38px;
  padding:14px 22px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:18px;
  border:1px solid rgba(255,255,255,.13);
  border-radius:24px;
  background:rgba(4,10,22,.64);
  backdrop-filter:blur(24px) saturate(140%);
}
.fusion-brand-left{display:flex;align-items:center;gap:16px;min-width:0}
.fusion-brand-logo{height:38px;width:auto;max-width:min(300px,42vw);object-fit:contain;display:block}
.fusion-brand-chip{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:36px;
  padding:0 16px;
  border-radius:999px;
  border:1px solid rgba(126,175,255,.2);
  background:rgba(255,255,255,.04);
  color:#d8e9ff;
  font-size:13px;
  white-space:nowrap;
}
.logo-sub{color:#7fcaff!important;letter-spacing:.12em!important}
.logo-text{
  font-size:clamp(42px,7vw,92px)!important;
  line-height:1.02!important;
  letter-spacing:0!important;
  background:linear-gradient(90deg,#ffffff 0%,#65cfff 44%,#a36cff 78%,#ffd36d 100%);
  -webkit-background-clip:text;
  color:transparent!important;
  text-shadow:none!important;
}
.header-tags{max-width:980px!important}
.header-tag{
  border-radius:999px!important;
  border-color:rgba(126,175,255,.2)!important;
  background:rgba(255,255,255,.045)!important;
  color:#dceaff!important;
}
.product-switch{
  border-radius:999px!important;
  border:1px solid rgba(126,175,255,.16)!important;
  background:rgba(4,10,22,.58)!important;
  padding:8px!important;
}
.product-btn{
  border-radius:999px!important;
  min-height:38px!important;
  transition:background .44s var(--fusion-ease),border-color .44s var(--fusion-ease),box-shadow .44s var(--fusion-ease),transform .44s var(--fusion-ease),color .44s var(--fusion-ease)!important;
}
.product-btn.active{
  background:linear-gradient(135deg,var(--fusion-blue),var(--fusion-violet))!important;
  border-color:rgba(255,255,255,.18)!important;
  box-shadow:0 14px 34px rgba(74,128,255,.28), inset 0 1px 0 rgba(255,255,255,.22)!important;
}
.product-subtitle{
  border-radius:999px!important;
  border:1px solid rgba(88,199,255,.2)!important;
  background:rgba(4,10,22,.52)!important;
  backdrop-filter:blur(16px);
  padding:11px 18px!important;
}
.nav-wrap{backdrop-filter:blur(22px) saturate(140%)!important}
.nav{
  border-radius:20px!important;
  border:1px solid rgba(126,175,255,.16)!important;
  background:rgba(6,14,29,.72)!important;
  box-shadow:0 18px 54px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.045)!important;
}
.nav-btn{
  border-radius:14px!important;
  transition:background .42s var(--fusion-ease),border-color .42s var(--fusion-ease),box-shadow .42s var(--fusion-ease),transform .42s var(--fusion-ease),color .42s var(--fusion-ease)!important;
}
.nav-btn.active{
  background:linear-gradient(135deg,rgba(50,122,255,.92),rgba(142,83,255,.86))!important;
  box-shadow:0 12px 32px rgba(58,129,255,.22)!important;
}
.card,.random-box,.history-panel,.batch-mode-panel,.mode-switcher,.prompt-shell,.workspace-intro{
  border-radius:22px!important;
  border-color:rgba(126,175,255,.17)!important;
  background:linear-gradient(180deg,rgba(13,25,48,.80),rgba(6,14,29,.72))!important;
  box-shadow:0 22px 64px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.05)!important;
}
.product-app{animation:fusionAppIn .58s var(--fusion-ease)}
@keyframes fusionAppIn{from{opacity:0;transform:translateY(18px);filter:blur(8px)}to{opacity:1;transform:none;filter:none}}
.fusion-workbench{display:grid;gap:18px}
.fusion-section-head{
  display:grid;
  grid-template-columns:minmax(0,1fr) auto;
  gap:18px;
  align-items:end;
  margin:0 0 18px;
  padding:22px;
  border:1px solid rgba(126,175,255,.17);
  border-radius:24px;
  background:linear-gradient(120deg,rgba(8,18,36,.9),rgba(16,23,46,.68));
  box-shadow:0 20px 60px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.045);
}
.fusion-kicker{
  font-family:inherit;
  color:var(--fusion-cyan);
  font-size:12px;
  text-transform:uppercase;
  letter-spacing:.14em;
  margin-bottom:8px;
}
.fusion-section-head h2{
  margin:0;
  font-size:32px;
  letter-spacing:0;
  color:#fff;
}
.fusion-section-head p{
  margin:10px 0 0;
  color:var(--fusion-muted);
  line-height:1.8;
  max-width:850px;
}
.fusion-metrics{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
.fusion-metric{
  min-width:126px;
  padding:14px 16px;
  border-radius:18px;
  border:1px solid rgba(255,255,255,.09);
  background:rgba(255,255,255,.04);
}
.fusion-metric strong{display:block;font-size:22px;color:#fff}
.fusion-metric span{font-size:12px;color:var(--fusion-muted)}
.ice-frame-shell{
  position:relative;
  overflow:hidden;
  border-radius:26px;
  border:1px solid rgba(126,175,255,.18);
  background:rgba(4,10,22,.7);
  box-shadow:0 28px 80px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.05);
}
.ice-frame-shell::before{
  content:"";
  position:absolute;
  left:22px;
  right:22px;
  top:0;
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(88,199,255,.6),rgba(155,107,255,.5),transparent);
  z-index:2;
}
#ice-prompt-frame{
  display:block;
  width:100%;
  min-height:860px;
  border:0;
  background:transparent;
}
.fusion-idea-dock{
  position:fixed;
  right:22px;
  z-index:9999;
  display:block;
}
.fusion-idea-dock[data-side="left"]{left:22px;right:auto}
.fusion-idea-ball{
  width:58px;
  height:58px;
  border-radius:50%;
  border:1px solid rgba(255,255,255,.16);
  background:linear-gradient(145deg,rgba(255,211,109,.96),rgba(255,145,92,.92));
  box-shadow:0 18px 44px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.42);
  cursor:pointer;
  padding:0;
}
.fusion-idea-mark{
  display:block;
  width:20px;
  height:25px;
  margin:0 auto;
  border-radius:5px;
  background:rgba(26,20,8,.8);
  box-shadow:8px 3px 0 rgba(26,20,8,.55),-8px 7px 0 rgba(26,20,8,.36);
}
.fusion-idea-panel{
  position:absolute;
  right:0;
  bottom:72px;
  width:min(390px,calc(100vw - 34px));
  max-height:min(620px,calc(100vh - 130px));
  display:flex;
  flex-direction:column;
  gap:12px;
  padding:16px;
  border-radius:24px;
  border:1px solid rgba(255,255,255,.14);
  background:rgba(247,249,242,.92);
  color:#19202b;
  box-shadow:0 30px 88px rgba(0,0,0,.36), inset 0 1px 0 rgba(255,255,255,.7);
  backdrop-filter:blur(28px) saturate(145%);
  opacity:0;
  pointer-events:none;
  transform:translateY(16px) scale(.96);
  transform-origin:bottom right;
  transition:opacity .44s var(--fusion-ease),transform .44s var(--fusion-ease);
}
.fusion-idea-dock[data-side="left"] .fusion-idea-panel{left:0;right:auto;transform-origin:bottom left}
.fusion-idea-dock.open .fusion-idea-panel{opacity:1;pointer-events:auto;transform:none}
.fusion-idea-head{display:flex;align-items:start;justify-content:space-between;gap:12px}
.fusion-idea-kicker{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#7a7f88;margin-bottom:4px}
.fusion-idea-head h3{margin:0;font-size:20px;letter-spacing:0;color:#171b22}
.fusion-icon-btn{
  width:34px;
  height:34px;
  border-radius:50%;
  border:1px solid rgba(0,0,0,.08);
  background:rgba(255,255,255,.72);
  color:#20242c;
  font-size:20px;
  cursor:pointer;
}
#fusion-idea-input{
  min-height:116px;
  resize:vertical;
  border:1px solid rgba(0,0,0,.08);
  border-radius:18px;
  padding:14px;
  background:rgba(255,255,255,.78);
  color:#1c2430;
  font:14px/1.65 -apple-system,BlinkMacSystemFont,"SF Pro Text","PingFang SC",sans-serif;
  outline:none;
}
.fusion-color-row{display:flex;gap:8px}
.fusion-color-row button{
  width:30px;
  height:30px;
  border-radius:50%;
  border:2px solid rgba(255,255,255,.8);
  box-shadow:0 0 0 1px rgba(0,0,0,.08);
  cursor:pointer;
}
.fusion-color-row button.active{box-shadow:0 0 0 2px #1e2531,0 0 0 5px rgba(30,37,49,.12)}
[data-color="gold"],.fusion-note-card[data-color="gold"]::before{background:#ffd66e}
[data-color="blue"],.fusion-note-card[data-color="blue"]::before{background:#66b7ff}
[data-color="violet"],.fusion-note-card[data-color="violet"]::before{background:#a989ff}
[data-color="green"],.fusion-note-card[data-color="green"]::before{background:#78e9a7}
[data-color="rose"],.fusion-note-card[data-color="rose"]::before{background:#ff86aa}
.fusion-idea-actions{display:flex;gap:8px;flex-wrap:wrap}
.fusion-note-primary,.fusion-note-ghost,.fusion-note-mini{
  min-height:34px;
  border-radius:11px;
  border:1px solid rgba(0,0,0,.08);
  padding:0 12px;
  cursor:pointer;
  font-weight:700;
}
.fusion-note-primary{background:#202633;color:#fff}
.fusion-note-ghost,.fusion-note-mini{background:rgba(255,255,255,.72);color:#202633}
.fusion-idea-list{display:grid;gap:10px;overflow:auto;padding-right:2px}
.fusion-note-empty{
  padding:18px;
  border-radius:16px;
  background:rgba(255,255,255,.56);
  color:#737b86;
  line-height:1.65;
}
.fusion-note-card{
  position:relative;
  padding:12px 12px 12px 18px;
  border-radius:16px;
  background:rgba(255,255,255,.72);
  border:1px solid rgba(0,0,0,.07);
}
.fusion-note-card::before{
  content:"";
  position:absolute;
  left:0;
  top:12px;
  bottom:12px;
  width:5px;
  border-radius:99px;
}
.fusion-note-text{white-space:pre-wrap;color:#1d2633;line-height:1.62;font-size:13px}
.fusion-note-meta{margin-top:8px;color:#858b94;font-size:11px}
.fusion-note-tools{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.fusion-note-swatches{display:flex;gap:5px;margin-left:auto}
.fusion-note-swatches button{width:20px;height:20px;border-radius:50%;border:1px solid rgba(0,0,0,.12);padding:0}
.fusion-copy-toast{
  position:fixed;
  left:50%;
  bottom:28px;
  z-index:10000;
  transform:translate(-50%,16px);
  opacity:0;
  pointer-events:none;
  padding:10px 14px;
  border-radius:999px;
  background:rgba(236,244,255,.94);
  color:#152033;
  box-shadow:0 16px 40px rgba(0,0,0,.25);
  transition:opacity .32s var(--fusion-ease),transform .32s var(--fusion-ease);
}
.fusion-copy-toast.show{opacity:1;transform:translate(-50%,0)}
@media(max-width:900px){
  header{min-height:420px!important;border-radius:22px!important}
  .fusion-brandbar{align-items:flex-start;flex-direction:column}
  .fusion-section-head{grid-template-columns:1fr}
  .fusion-metrics{justify-content:flex-start}
  .fusion-idea-dock,.fusion-idea-dock[data-side="left"]{right:16px!important;left:auto!important}
  .fusion-idea-panel{right:0!important;left:auto!important;bottom:70px}
}
</style>`;
}

function buildFusionV2Css() {
  return String.raw`
<style id="fusion-v2-product-upgrade">
body{
  min-height:100vh;
  background:
    linear-gradient(180deg,rgba(6,12,25,.96),rgba(4,8,17,.98)),
    radial-gradient(circle at 52% -18%,rgba(61,123,255,.28),transparent 38%)!important;
}
.wrap{max-width:1760px!important;padding-top:24px!important}
.fusion-v2-hero{
  min-height:auto!important;
  padding:28px!important;
  display:grid!important;
  gap:20px!important;
  align-items:start!important;
}
.fusion-v2-hero::before{
  mask-image:linear-gradient(180deg,#000,transparent 82%)!important;
}
.fusion-brandbar{
  width:100%!important;
  min-height:64px!important;
  margin:0!important;
}
.fusion-v2-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.fusion-v2-action{
  min-height:38px;
  border-radius:999px;
  border:1px solid rgba(126,175,255,.18);
  background:rgba(255,255,255,.045);
  color:#e9f4ff;
  padding:0 16px;
  cursor:pointer;
  font-weight:800;
  letter-spacing:.02em;
  transition:transform .32s var(--fusion-ease),background .32s var(--fusion-ease),border-color .32s var(--fusion-ease),box-shadow .32s var(--fusion-ease);
}
.fusion-v2-action.primary,
.fusion-v2-action.active{
  border-color:rgba(255,255,255,.18);
  background:linear-gradient(135deg,var(--fusion-blue),var(--fusion-violet));
  box-shadow:0 12px 28px rgba(63,130,255,.25);
}
.fusion-v2-action:active{transform:scale(.98)}
.fusion-v2-hero-copy{position:relative;z-index:2;max-width:920px}
.fusion-v2-kicker{
  color:#7fcaff;
  font-size:12px;
  letter-spacing:.18em;
  text-transform:uppercase;
  margin-bottom:8px;
}
.fusion-v2-hero-copy h1{
  margin:0;
  font-size:clamp(44px,7vw,104px);
  line-height:.98;
  letter-spacing:0;
  background:linear-gradient(90deg,#fff 0%,#69d5ff 45%,#a36cff 78%,#ffd36d 100%);
  -webkit-background-clip:text;
  color:transparent;
}
.fusion-v2-hero-copy p{margin:10px 0 0;color:#9eb3cf;font-size:16px;line-height:1.7}
.header-tags,.logo-line,.logo-sub,.header-glow,.hero-summary,.workspace-intro,.product-dock,.ui-top-fab{display:none!important}
.header-product-switch{position:relative;z-index:2;width:fit-content;max-width:100%;overflow:auto;scrollbar-width:none}
.header-product-switch::-webkit-scrollbar{display:none}
.product-subtitle{position:relative;z-index:2;width:fit-content;max-width:100%}
.fusion-command-center{
  position:sticky;
  top:14px;
  z-index:70;
  display:grid;
  grid-template-columns:minmax(260px,1fr) minmax(150px,190px) minmax(140px,170px) auto;
  gap:10px;
  align-items:center;
  padding:10px;
  border:1px solid rgba(126,175,255,.18);
  border-radius:22px;
  background:rgba(5,12,25,.76);
  backdrop-filter:blur(24px) saturate(150%);
  box-shadow:0 18px 48px rgba(0,0,0,.26), inset 0 1px 0 rgba(255,255,255,.05);
}
.fusion-search-box{
  min-height:42px;
  display:flex;
  align-items:center;
  gap:10px;
  padding:0 14px;
  border-radius:16px;
  border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.045);
}
.fusion-search-box span{
  color:#7fcaff;
  font-size:11px;
  font-weight:900;
  letter-spacing:.14em;
  text-transform:uppercase;
}
#fusion-global-search{
  width:100%;
  border:0;
  outline:0;
  background:transparent;
  color:#f3f8ff;
  font:14px/1.4 -apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;
}
#fusion-global-search::placeholder{color:#7588a5}
.fusion-command-center select{
  min-height:42px;
  border-radius:16px;
  border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.045);
  color:#f3f8ff;
  padding:0 12px;
  outline:0;
}
.fusion-search-results{
  position:relative;
  z-index:68;
  display:grid;
  gap:10px;
  margin-top:-10px;
  padding:14px;
  border:1px solid rgba(126,175,255,.18);
  border-radius:22px;
  background:rgba(5,12,25,.82);
  backdrop-filter:blur(22px) saturate(150%);
  box-shadow:0 18px 48px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.04);
}
.fusion-result-item{
  display:grid;
  grid-template-columns:minmax(0,1fr) auto;
  gap:12px;
  align-items:center;
  padding:12px;
  border-radius:16px;
  border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.04);
}
.fusion-result-meta{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
  color:#7fcaff;
  font-size:11px;
  letter-spacing:.04em;
  margin-bottom:5px;
}
.fusion-result-text{
  color:#eaf4ff;
  font-size:13px;
  line-height:1.62;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
.fusion-result-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
.fusion-result-actions button{
  min-height:32px;
  border-radius:10px;
  border:1px solid rgba(126,175,255,.16);
  background:rgba(255,255,255,.06);
  color:#eaf4ff;
  cursor:pointer;
  padding:0 10px;
  font-weight:800;
}
.fusion-result-actions button.primary{background:rgba(88,199,255,.15);border-color:rgba(88,199,255,.34)}
.product-app{margin-top:22px!important}
.fusion-section-head{
  grid-template-columns:minmax(0,1fr) auto!important;
}
.nav-wrap{top:12px!important}
.nav{gap:10px!important}
.panel.active{gap:18px!important}
.card.fusion-foldable{position:relative}
.card.fusion-folded:not(.fusion-expanded) .lang-content.active .copy-item:nth-of-type(n+9),
.card.fusion-folded:not(.fusion-expanded) > .copy-item:nth-of-type(n+9){
  display:none!important;
}
.fusion-card-toggle{
  margin-top:12px;
  min-height:36px;
  border-radius:12px;
  border:1px solid rgba(126,175,255,.16);
  background:rgba(255,255,255,.045);
  color:#dfeeff;
  cursor:pointer;
  font-weight:800;
}
.fusion-highlight{
  animation:fusionHighlight 1.6s var(--fusion-ease) both;
}
@keyframes fusionHighlight{
  0%{box-shadow:0 0 0 0 rgba(88,199,255,.0),0 0 0 rgba(88,199,255,0)}
  18%{box-shadow:0 0 0 3px rgba(88,199,255,.55),0 0 36px rgba(88,199,255,.28)}
  100%{box-shadow:inherit}
}
.fusion-recent-rail{
  position:fixed;
  left:22px;
  bottom:24px;
  z-index:1200;
  width:min(360px,calc(100vw - 44px));
  max-height:48vh;
  display:none;
  gap:8px;
  padding:12px;
  border-radius:20px;
  border:1px solid rgba(126,175,255,.18);
  background:rgba(5,12,25,.84);
  backdrop-filter:blur(22px) saturate(150%);
  box-shadow:0 22px 62px rgba(0,0,0,.3);
  overflow:auto;
}
.fusion-recent-rail.open{display:grid}
.fusion-recent-head{display:flex;align-items:center;justify-content:space-between;gap:10px;color:#eaf4ff;font-weight:900}
.fusion-recent-card{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.045);border-radius:14px;padding:10px;color:#dce9fa;font-size:12px;line-height:1.55}
@media(max-width:900px){
  .wrap{padding:14px 14px 54px!important}
  .fusion-v2-hero{padding:18px!important;border-radius:22px!important}
  .fusion-brandbar{align-items:flex-start!important}
  .fusion-v2-actions{width:100%}
  .fusion-command-center{grid-template-columns:1fr;position:relative;top:auto}
  .fusion-section-head{grid-template-columns:1fr!important}
  .fusion-result-item{grid-template-columns:1fr}
  .fusion-result-actions{justify-content:flex-start}
}
</style>`;
}

function buildFusionV3Css() {
  return String.raw`
<style id="fusion-v3-product-upgrade">
:root{
  --fusion-max:1480px;
  --fusion-gutter:clamp(18px,3vw,36px);
}
body,button,input,select,textarea,.fusion-v2-kicker,.fusion-kicker,.fusion-ops-kicker,.product-btn,.nav-btn{
  letter-spacing:0!important;
}
.wrap{
  max-width:none!important;
  width:100%!important;
  padding:24px var(--fusion-gutter) 72px!important;
}
.fusion-v3-hero,
.product-app{
  width:min(var(--fusion-max),100%)!important;
  margin-left:auto!important;
  margin-right:auto!important;
}
.fusion-v3-hero{
  padding:22px!important;
  gap:16px!important;
  border-radius:8px!important;
  background:
    linear-gradient(120deg,rgba(7,15,30,.96),rgba(10,18,38,.88) 58%,rgba(12,10,28,.9)),
    linear-gradient(90deg,rgba(87,198,255,.06),rgba(154,106,255,.08))!important;
}
.fusion-v3-hero::before{opacity:.42!important;background-size:48px 48px!important}
.fusion-brandbar{
  width:100%!important;
  min-height:58px!important;
  padding:10px 14px!important;
  border-radius:8px!important;
}
.fusion-brand-logo{height:34px!important;max-width:260px!important}
.fusion-v2-actions{gap:8px!important}
.fusion-v2-action{
  min-height:36px!important;
  border-radius:8px!important;
  padding:0 14px!important;
  white-space:nowrap;
}
.fusion-v3-hero-grid{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:minmax(0,1fr) 360px;
  gap:16px;
  align-items:stretch;
}
.fusion-v2-hero-copy{
  max-width:none!important;
  min-height:214px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:10px 0;
}
.fusion-v2-kicker{
  margin-bottom:8px!important;
  color:#80d9ff!important;
  font-size:12px!important;
}
.fusion-v2-hero-copy h1{
  font-size:72px!important;
  line-height:1.02!important;
  max-width:900px;
}
.fusion-v2-hero-copy p{
  margin-top:8px!important;
  font-size:15px!important;
}
.header-product-switch{
  width:100%!important;
  max-width:900px!important;
  display:grid!important;
  grid-template-columns:repeat(5,minmax(0,1fr));
  gap:8px!important;
  margin-top:20px!important;
  border-radius:8px!important;
  overflow:visible!important;
}
.product-btn{
  min-height:40px!important;
  border-radius:8px!important;
  padding:0 12px!important;
  font-size:13px!important;
  overflow:hidden;
  text-overflow:ellipsis;
}
.fusion-v3-status-card{
  border:1px solid rgba(126,175,255,.18);
  border-radius:8px;
  background:linear-gradient(180deg,rgba(12,23,45,.82),rgba(5,12,25,.78));
  box-shadow:0 22px 58px rgba(0,0,0,.24),inset 0 1px 0 rgba(255,255,255,.05);
  padding:18px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  min-height:214px;
}
.fusion-v3-status-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  color:#8ea6c5;
  font-size:12px;
  text-transform:uppercase;
}
.fusion-v3-status-top strong{
  width:42px;
  height:42px;
  display:grid;
  place-items:center;
  border-radius:50%;
  color:#fff;
  background:rgba(255,255,255,.07);
  border:1px solid rgba(255,255,255,.1);
}
.fusion-v3-status-main{
  color:#fff;
  font-size:22px;
  line-height:1.25;
  font-weight:900;
}
.fusion-v3-status-note{
  color:#9db2d0;
  font-size:13px;
  line-height:1.65;
}
.fusion-v3-status-actions{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
}
.product-subtitle{
  width:100%!important;
  border-radius:8px!important;
  padding:10px 14px!important;
}
.fusion-command-center{
  width:100%!important;
  top:12px!important;
  grid-template-columns:minmax(260px,1fr) 180px 160px auto!important;
  border-radius:8px!important;
  padding:8px!important;
}
.fusion-search-box,
.fusion-command-center select,
.fusion-result-item,
.fusion-search-results,
.fusion-card-toggle{
  border-radius:8px!important;
}
.fusion-search-results{
  margin-top:0!important;
}
.product-app{
  margin-top:18px!important;
}
.product-app:not(#product-ice) .nav-wrap{
  display:none!important;
}
.product-app:not(#product-ice) .panel.active{
  align-items:stretch!important;
}
.fusion-section-head,
.ice-frame-shell,
.card,
.random-box,
.history-panel,
.batch-mode-panel,
.mode-switcher,
.prompt-shell,
.workspace-intro,
.fusion-metric,
.fusion-recent-rail,
.fusion-recent-card{
  border-radius:8px!important;
}
.fusion-section-head{
  padding:20px!important;
  grid-template-columns:minmax(0,1fr) auto!important;
}
.fusion-section-head h2{
  font-size:28px!important;
}
.fusion-section-head p{
  max-width:920px!important;
}
.ice-frame-shell{
  overflow:hidden!important;
}
#ice-prompt-frame{
  min-height:760px!important;
}
.fusion-ops-drawer{
  position:fixed;
  inset:0;
  z-index:9500;
  pointer-events:none;
}
.fusion-ops-drawer.open{
  pointer-events:auto;
}
.fusion-ops-backdrop{
  position:absolute;
  inset:0;
  background:rgba(0,0,0,.38);
  opacity:0;
  transition:opacity .36s var(--fusion-ease);
}
.fusion-ops-drawer.open .fusion-ops-backdrop{
  opacity:1;
}
.fusion-ops-panel{
  position:absolute;
  top:18px;
  right:max(18px,calc((100vw - var(--fusion-max)) / 2 + 18px));
  bottom:18px;
  width:min(560px,calc(100vw - 36px));
  display:grid;
  grid-template-rows:auto auto auto minmax(0,1fr);
  gap:12px;
  padding:16px;
  border-radius:8px;
  border:1px solid rgba(126,175,255,.2);
  background:rgba(7,15,30,.92);
  backdrop-filter:blur(28px) saturate(150%);
  box-shadow:0 34px 90px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.06);
  opacity:0;
  transform:translateX(calc(100% + 180px));
  transition:opacity .28s var(--fusion-ease),transform .5s var(--fusion-ease);
}
.fusion-ops-drawer.open .fusion-ops-panel{
  opacity:1;
  transform:none;
}
.fusion-ops-head{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:12px;
}
.fusion-ops-kicker{
  color:#80d9ff;
  font-size:12px;
  margin-bottom:4px;
}
.fusion-ops-head h2{
  margin:0;
  color:#fff;
  font-size:24px;
}
.fusion-ops-filters{
  display:grid;
  grid-template-columns:1fr 130px;
  gap:8px;
}
.fusion-ops-filters select,
.fusion-ops-filters input{
  min-height:40px;
  border-radius:8px;
  border:1px solid rgba(255,255,255,.09);
  background:rgba(255,255,255,.05);
  color:#f2f7ff;
  padding:0 12px;
  outline:0;
}
.fusion-ops-filters input{
  grid-column:1/-1;
}
.fusion-ops-summary{
  min-height:34px;
  display:flex;
  align-items:center;
  color:#9eb3cf;
  font-size:13px;
}
.fusion-ops-list{
  display:grid;
  gap:10px;
  overflow:auto;
  padding-right:2px;
}
.fusion-ops-item{
  display:grid;
  gap:10px;
  padding:12px;
  border-radius:8px;
  border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.045);
}
.fusion-ops-meta{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
  color:#80d9ff;
  font-size:12px;
}
.fusion-ops-text{
  color:#eaf4ff;
  font-size:13px;
  line-height:1.65;
  display:-webkit-box;
  -webkit-line-clamp:4;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
.fusion-ops-actions{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
}
.fusion-ops-actions button{
  min-height:32px;
  border-radius:8px;
  border:1px solid rgba(126,175,255,.16);
  background:rgba(255,255,255,.06);
  color:#eaf4ff;
  cursor:pointer;
  padding:0 10px;
  font-weight:800;
}
.fusion-ops-actions button.primary{
  background:rgba(88,199,255,.15);
  border-color:rgba(88,199,255,.34);
}
.fusion-idea-dock{
  right:max(18px,calc((100vw - var(--fusion-max)) / 2 + 18px))!important;
}
.fusion-idea-dock[data-side="left"]{
  left:max(18px,calc((100vw - var(--fusion-max)) / 2 + 18px))!important;
}
.fusion-idea-ball{
  width:52px!important;
  height:52px!important;
}
.fusion-idea-panel{
  border-radius:8px!important;
}
@media(max-width:980px){
  .wrap{padding:14px 14px 56px!important}
  .fusion-v3-hero,.product-app{width:100%!important}
  .fusion-v3-hero{padding:16px!important}
  .fusion-brandbar{align-items:flex-start!important;flex-direction:column!important}
  .fusion-v3-hero-grid{grid-template-columns:1fr}
  .fusion-v2-hero-copy{min-height:auto}
  .fusion-v2-hero-copy h1{font-size:46px!important}
  .header-product-switch{grid-template-columns:repeat(2,minmax(0,1fr));max-width:none!important}
  .fusion-v3-status-card{min-height:auto;gap:14px}
  .fusion-command-center{grid-template-columns:1fr!important;position:relative!important;top:auto!important}
  .fusion-section-head{grid-template-columns:1fr!important}
  .fusion-ops-panel{top:10px;right:10px;bottom:10px;width:calc(100vw - 20px)}
  .fusion-idea-dock,.fusion-idea-dock[data-side="left"]{
    top:auto!important;
    bottom:18px!important;
    right:14px!important;
    left:auto!important;
  }
}
</style>`;
}

function buildFusionScript(base64Chunks, logoSrc) {
  const chunkLiteral = JSON.stringify(base64Chunks);
  const logoLiteral = JSON.stringify(logoSrc);
  return String.raw`
<script id="fusion-controller">
(() => {
  const ICE_SRC_CHUNKS = __ICE_CHUNKS__;
  const FUSION_LOGO_SRC = __LOGO_SRC__;
  const PRODUCT_META = {
    ice: {name:'冰丝凉凉裤', en:'AI Prompt Hub', tagline:'15 个 AI 视频提示词核心模块'},
    hair: {name:'直发梳', en:'Hair Brush', tagline:'AI 提示词主工作流 · 运营素材库：口播 / 花字 / 评论回复'},
    foot: {name:'磨脚器', en:'Foot File', tagline:'AI 提示词主工作流 · 运营素材库：口播 / 花字 / 评论回复'},
    trim: {name:'脱毛仪', en:'Trimmer', tagline:'AI 提示词主工作流 · 运营素材库：口播 / 花字 / 评论回复'},
    pore: {name:'黑头仪', en:'Pore Vacuum', tagline:'AI 提示词主工作流 · 运营素材库：口播 / 花字 / 评论回复'}
  };
  let iceBooted = false;

  function decodeBase64Utf8(b64){
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder('utf-8').decode(bytes);
  }

  function bootIceFrame(){
    if(iceBooted) return;
    const frame = document.getElementById('ice-prompt-frame');
    if(!frame) return;
    frame.srcdoc = decodeBase64Utf8(ICE_SRC_CHUNKS.join(''));
    iceBooted = true;
  }

  function setSubtitle(type){
    const meta = PRODUCT_META[type] || PRODUCT_META.ice;
    const subtitle = document.getElementById('product-subtitle');
    if(!subtitle) return;
    subtitle.innerHTML = '<span class="subtitle-dot"></span><span>当前产品：' + meta.name + ' / ' + meta.en + '</span><span class="subtitle-sep">·</span><span>' + meta.tagline + '</span>';
  }

  function syncFusionHero(type){
    const meta = PRODUCT_META[type] || PRODUCT_META.ice;
    setSubtitle(type);
    const statusProduct = document.getElementById('fusion-status-product');
    const statusNote = document.getElementById('fusion-status-note');
    const statusCount = document.getElementById('fusion-status-count');
    if(statusProduct) statusProduct.textContent = meta.name + ' / ' + meta.en;
    if(statusNote) statusNote.textContent = meta.tagline;
    if(statusCount) statusCount.textContent = type === 'ice' ? '15' : 'AI';
    const current = document.getElementById('hero-current-product');
    if(current) current.textContent = meta.name + ' / ' + meta.en;
    const stats = document.querySelectorAll('.hero-stat');
    if(stats[1]){
      const value = stats[1].querySelector('.hero-stat-value');
      const note = stats[1].querySelector('.hero-stat-note');
      if(value) value.textContent = type === 'ice' ? '15 个 AI 提示词模块' : '4 个核心模块';
      if(note) note.textContent = type === 'ice'
        ? '冰丝凉凉裤保留核心提示词模块，自运营图文参考仍在其他工作台中。'
        : '口播、花字、评论回复、AI 视频提示词完整保留。';
    }
    if(stats[2]){
      const value = stats[2].querySelector('.hero-stat-value');
      const note = stats[2].querySelector('.hero-stat-note');
      if(value) value.textContent = type === 'ice' ? '先定镜头，再填变量，再复制' : '先随机，再筛选，再批量';
      if(note) note.textContent = type === 'ice'
        ? '从 15 种视频结构里选节奏，再进入变量和复制流。'
        : '先出方向，再进提示词批量流，整体效率会更高。';
    }
    document.body.setAttribute('data-active-product', type);
  }

  function activeFusionType(){
    const active = document.querySelector('.product-app.active');
    return active ? active.id.replace('product-', '') : 'ice';
  }

  function resyncFusionHero(type){
    [0, 220, 440].forEach(function(delay){
      setTimeout(function(){
        syncFusionHero(activeFusionType() || type || 'ice');
      }, delay);
    });
  }

  window.switchProduct = function(type, btn){
    if(!document.getElementById('product-' + type)) return;
    document.querySelectorAll('.product-btn[data-product]').forEach(function(button){
      button.classList.toggle('active', button.dataset.product === type);
    });
    if(btn && btn.dataset && btn.dataset.product) btn.classList.add('active');
    document.querySelectorAll('.product-app').forEach(function(app){
      app.classList.toggle('active', app.id === 'product-' + type);
    });
    document.body.setAttribute('data-active-product', type);
    setSubtitle(type);
    if(type === 'ice') bootIceFrame();
    if(type !== 'ice'){
      setTimeout(function(){ switchPanelByType(type, 'prompt'); }, 0);
    }
    if(typeof window.refreshUiUpgrade === 'function') {
      setTimeout(function(){
        window.refreshUiUpgrade();
        syncFusionHero(type);
      }, 0);
    } else {
      syncFusionHero(type);
    }
    window.scrollTo({top:0, behavior:'smooth'});
  };

  window.addEventListener('message', function(event){
    if(!event.data || event.data.type !== 'fusion-ice-height') return;
    const frame = document.getElementById('ice-prompt-frame');
    if(!frame) return;
    const nextHeight = Math.min(Math.max(Number(event.data.height) || 860, 860), 3200);
    frame.style.height = nextHeight + 'px';
  });

  function copyText(text){
    const value = String(text || '');
    if(!value.trim()) return Promise.resolve(false);
    if(navigator.clipboard && navigator.clipboard.writeText){
      return navigator.clipboard.writeText(value).then(function(){ return true; }).catch(function(){ return fallbackCopy(value); });
    }
    return Promise.resolve(fallbackCopy(value));
  }

  function fallbackCopy(value){
    const el = document.createElement('textarea');
    el.value = value;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    try { document.execCommand('copy'); } catch(err) {}
    el.remove();
    return true;
  }

  function showToast(text){
    const toast = document.getElementById('fusion-copy-toast');
    if(!toast) return;
    toast.textContent = text || '已复制';
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(function(){ toast.classList.remove('show'); }, 1300);
  }

  function initIdeaDock(){
    const dock = document.getElementById('fusion-idea-dock');
    const ball = document.getElementById('fusion-idea-ball');
    const panel = document.getElementById('fusion-idea-panel');
    const close = document.getElementById('fusion-idea-close');
    const input = document.getElementById('fusion-idea-input');
    const save = document.getElementById('fusion-idea-save');
    const copyInput = document.getElementById('fusion-idea-copy-input');
    const copyAll = document.getElementById('fusion-idea-copy-all');
    const colors = document.getElementById('fusion-color-row');
    const list = document.getElementById('fusion-idea-list');
    if(!dock || !ball || !panel || !input || !list) return;

    const notesKey = 'hidreamFusionPromptIdeasV1';
    const dockKey = 'hidreamFusionPromptIdeaDockV1';
    let selectedColor = 'gold';
    let notes = [];
    try { notes = JSON.parse(localStorage.getItem(notesKey) || '[]'); } catch(err) { notes = []; }
    try {
      const savedDock = JSON.parse(localStorage.getItem(dockKey) || '{}');
      if(savedDock.side) dock.dataset.side = savedDock.side;
      if(savedDock.top) dock.style.top = savedDock.top;
    } catch(err) {}

    function persist(){
      localStorage.setItem(notesKey, JSON.stringify(notes.slice(0, 80)));
    }
    function persistDock(){
      localStorage.setItem(dockKey, JSON.stringify({side:dock.dataset.side || 'right', top:dock.style.top || '62vh'}));
    }
    function noteTime(){
      return new Date().toLocaleString('zh-CN', {month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit'});
    }
    function setColor(color){
      selectedColor = color || 'gold';
      colors.querySelectorAll('button').forEach(function(btn){
        btn.classList.toggle('active', btn.dataset.color === selectedColor);
      });
    }
    function render(){
      list.innerHTML = '';
      if(!notes.length){
        const empty = document.createElement('div');
        empty.className = 'fusion-note-empty';
        empty.textContent = '还没有灵感记录。把提示词片段、镜头变量或口播方向先放在这里，随时复制回工作流。';
        list.appendChild(empty);
        return;
      }
      notes.forEach(function(note){
        const card = document.createElement('article');
        card.className = 'fusion-note-card';
        card.dataset.id = note.id;
        card.dataset.color = note.color || 'gold';

        const text = document.createElement('div');
        text.className = 'fusion-note-text';
        text.textContent = note.text;
        card.appendChild(text);

        const meta = document.createElement('div');
        meta.className = 'fusion-note-meta';
        meta.textContent = note.time || '';
        card.appendChild(meta);

        const tools = document.createElement('div');
        tools.className = 'fusion-note-tools';
        [
          ['copy', '复制'],
          ['use', '调用'],
          ['delete', '删除']
        ].forEach(function(item){
          const btn = document.createElement('button');
          btn.className = 'fusion-note-mini';
          btn.type = 'button';
          btn.dataset.action = item[0];
          btn.textContent = item[1];
          tools.appendChild(btn);
        });
        const swatches = document.createElement('div');
        swatches.className = 'fusion-note-swatches';
        ['gold','blue','violet','green','rose'].forEach(function(color){
          const swatch = document.createElement('button');
          swatch.type = 'button';
          swatch.dataset.action = 'color';
          swatch.dataset.color = color;
          swatch.setAttribute('aria-label', '改为' + color);
          swatches.appendChild(swatch);
        });
        tools.appendChild(swatches);
        card.appendChild(tools);
        list.appendChild(card);
      });
    }
    function addNote(){
      const text = input.value.trim();
      if(!text) return;
      notes.unshift({id:String(Date.now()), text:text, color:selectedColor, time:noteTime()});
      input.value = '';
      persist();
      render();
      showToast('已记录');
    }

    window.fusionSaveIdea = function(text, color){
      const value = String(text || '').trim();
      if(!value) return false;
      notes.unshift({id:String(Date.now()), text:value, color:color || selectedColor, time:noteTime()});
      persist();
      render();
      showToast('已存入灵感');
      return true;
    };
    window.fusionOpenIdeaDock = function(){
      dock.classList.add('open');
      setTimeout(function(){ input.focus(); }, 80);
    };

    colors.addEventListener('click', function(event){
      const btn = event.target.closest('button[data-color]');
      if(btn) setColor(btn.dataset.color);
    });
    save.addEventListener('click', addNote);
    input.addEventListener('keydown', function(event){
      if((event.metaKey || event.ctrlKey) && event.key === 'Enter') addNote();
    });
    copyInput.addEventListener('click', function(){
      copyText(input.value).then(function(){ showToast('已复制输入'); });
    });
    copyAll.addEventListener('click', function(){
      copyText(notes.map(function(note){ return note.text; }).join('\n\n')).then(function(){ showToast('已复制全部'); });
    });
    list.addEventListener('click', function(event){
      const card = event.target.closest('.fusion-note-card');
      const action = event.target.closest('[data-action]');
      if(!card || !action) return;
      const id = card.dataset.id;
      const idx = notes.findIndex(function(note){ return note.id === id; });
      if(idx < 0) return;
      if(action.dataset.action === 'copy'){
        copyText(notes[idx].text).then(function(){ showToast('已复制'); });
      }
      if(action.dataset.action === 'use'){
        input.value = notes[idx].text;
        input.focus();
        copyText(notes[idx].text).then(function(){ showToast('已调用并复制'); });
      }
      if(action.dataset.action === 'delete'){
        notes.splice(idx, 1);
        persist();
        render();
      }
      if(action.dataset.action === 'color'){
        notes[idx].color = action.dataset.color || 'gold';
        persist();
        render();
      }
    });

    close.addEventListener('click', function(){ dock.classList.remove('open'); });

    let drag = null;
    let suppressSyntheticClick = false;
    ball.addEventListener('pointerdown', function(event){
      drag = {x:event.clientX, y:event.clientY, top:dock.getBoundingClientRect().top, moved:false};
      ball.setPointerCapture(event.pointerId);
    });
    ball.addEventListener('pointermove', function(event){
      if(!drag) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if(Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
      if(!drag.moved) return;
      const nextTop = Math.min(Math.max(drag.top + dy, 80), window.innerHeight - 90);
      dock.style.top = nextTop + 'px';
    });
    ball.addEventListener('pointerup', function(event){
      if(!drag) return;
      if(drag.moved){
        dock.dataset.side = event.clientX < window.innerWidth / 2 ? 'left' : 'right';
        persistDock();
      } else {
        dock.classList.toggle('open');
      }
      suppressSyntheticClick = true;
      setTimeout(function(){ suppressSyntheticClick = false; }, 0);
      drag = null;
    });
    ball.addEventListener('pointercancel', function(){
      drag = null;
      suppressSyntheticClick = true;
      setTimeout(function(){ suppressSyntheticClick = false; }, 0);
    });
    ball.addEventListener('click', function(){
      if(suppressSyntheticClick){
        suppressSyntheticClick = false;
        return;
      }
      dock.classList.toggle('open');
    });

    setColor(selectedColor);
    render();
  }

  function productLabel(type){
    const meta = PRODUCT_META[type] || PRODUCT_META.ice;
    return meta.name + ' / ' + meta.en;
  }

  function panelLabel(panel){
    const map = {vo:'口播', flower:'花字', comment:'评论', prompt:'提示词'};
    return map[panel] || panel || '模块';
  }

  function panelFromElement(el){
    const panel = el && el.closest ? el.closest('.panel') : null;
    if(!panel) return '';
    return panel.id.replace(/^panel-|^foot-panel-|^trim-panel-|^pore-panel-/, '');
  }

  function syncQuickControls(){
    const product = activeFusionType();
    const quickProduct = document.getElementById('fusion-quick-product');
    const quickModule = document.getElementById('fusion-quick-module');
    if(quickProduct) quickProduct.value = product;
    if(quickModule && product !== 'ice'){
      const app = document.getElementById('product-' + product);
      const activePanel = app && app.querySelector('.panel.active');
      if(activePanel) quickModule.value = activePanel.id.replace(/^panel-|^foot-panel-|^trim-panel-|^pore-panel-/, '');
    } else if(quickModule) {
      quickModule.value = 'prompt';
    }
  }

  function switchPanelByType(product, panel){
    if(!panel || product === 'ice') return;
    const app = document.getElementById('product-' + product);
    if(!app) return;
    const navBtn = Array.from(app.querySelectorAll('.nav-btn')).find(function(btn){
      return (btn.getAttribute('onclick') || '').includes("'" + panel + "'");
    });
    if(navBtn) navBtn.click();
  }

  function activeCopyText(item){
    return (item && (item.dataset.t || item.getAttribute('data-t') || item.textContent || '')).replace(/\s+/g, ' ').trim();
  }

  function buildSearchItems(){
    const items = [];
    document.querySelectorAll('.product-app:not(#product-ice) .copy-item').forEach(function(item, idx){
      const text = activeCopyText(item);
      if(!text) return;
      const app = item.closest('.product-app');
      const product = app ? app.id.replace('product-', '') : 'hair';
      const panel = panelFromElement(item);
      items.push({type:'copy', id:'copy-' + idx, product:product, panel:panel, label:productLabel(product), module:panelLabel(panel), text:text, el:item});
    });
    const frame = document.getElementById('ice-prompt-frame');
    const doc = frame && frame.contentDocument;
    if(doc){
      Array.from(doc.querySelectorAll('button[data-panel]')).forEach(function(btn, idx){
        const text = (btn.textContent || '').replace(/\s+/g, ' ').trim();
        if(!text) return;
        items.push({type:'ice', id:'ice-' + idx, product:'ice', panel:btn.dataset.panel, label:productLabel('ice'), module:'Prompt Hub', text:text, icePanel:btn.dataset.panel});
      });
    }
    return items;
  }

  let latestSearchItems = [];
  let latestSearchResults = [];

  function renderSearchResults(query){
    const box = document.getElementById('fusion-search-results');
    if(!box) return;
    const q = String(query || '').trim().toLowerCase();
    if(!q){
      box.hidden = true;
      box.innerHTML = '';
      return;
    }
    latestSearchItems = buildSearchItems();
    latestSearchResults = latestSearchItems.filter(function(item){
      return (item.text + ' ' + item.label + ' ' + item.module).toLowerCase().includes(q);
    }).slice(0, 14);
    box.innerHTML = '';
    box.hidden = false;
    if(!latestSearchResults.length){
      const empty = document.createElement('div');
      empty.className = 'fusion-result-item';
      empty.textContent = '没有匹配结果';
      box.appendChild(empty);
      return;
    }
    latestSearchResults.forEach(function(item, idx){
      const row = document.createElement('article');
      row.className = 'fusion-result-item';
      row.dataset.index = String(idx);

      const main = document.createElement('div');
      const meta = document.createElement('div');
      meta.className = 'fusion-result-meta';
      meta.textContent = item.label + ' · ' + item.module;
      const text = document.createElement('div');
      text.className = 'fusion-result-text';
      text.textContent = item.text;
      main.appendChild(meta);
      main.appendChild(text);

      const actions = document.createElement('div');
      actions.className = 'fusion-result-actions';
      [
        ['locate','定位','primary'],
        ['copy','复制',''],
        ['note','灵感','']
      ].forEach(function(action){
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.dataset.action = action[0];
        btn.className = action[2];
        btn.textContent = action[1];
        actions.appendChild(btn);
      });
      row.appendChild(main);
      row.appendChild(actions);
      box.appendChild(row);
    });
  }

  function locateSearchItem(item){
    if(!item) return;
    window.switchProduct(item.product);
    setTimeout(function(){
      if(item.type === 'ice'){
        bootIceFrame();
        const frame = document.getElementById('ice-prompt-frame');
        const doc = frame && frame.contentDocument;
        const btn = doc && doc.querySelector('button[data-panel="' + item.icePanel + '"]');
        if(btn) btn.click();
        if(frame) frame.scrollIntoView({behavior:'smooth', block:'start'});
        return;
      }
      switchPanelByType(item.product, item.panel);
      setTimeout(function(){
        if(item.el){
          item.el.scrollIntoView({behavior:'smooth', block:'center'});
          item.el.classList.add('fusion-highlight');
          setTimeout(function(){ item.el.classList.remove('fusion-highlight'); }, 1700);
        }
      }, 100);
    }, 80);
  }

  function addRecentCopy(text, meta){
    const value = String(text || '').trim();
    if(!value) return;
    const key = 'hidreamFusionRecentCopiesV2';
    let items = [];
    try { items = JSON.parse(localStorage.getItem(key) || '[]'); } catch(err) { items = []; }
    items.unshift({text:value, meta:meta || '', time:new Date().toLocaleString('zh-CN', {month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit'})});
    localStorage.setItem(key, JSON.stringify(items.slice(0, 16)));
    renderRecentRail();
  }

  function renderRecentRail(){
    const rail = document.getElementById('fusion-recent-rail');
    if(!rail) return;
    const key = 'hidreamFusionRecentCopiesV2';
    let items = [];
    try { items = JSON.parse(localStorage.getItem(key) || '[]'); } catch(err) { items = []; }
    rail.querySelectorAll('.fusion-recent-card').forEach(function(el){ el.remove(); });
    if(!items.length){
      const empty = document.createElement('div');
      empty.className = 'fusion-recent-card';
      empty.textContent = '暂无记录';
      rail.appendChild(empty);
      return;
    }
    items.slice(0, 8).forEach(function(item){
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'fusion-recent-card';
      card.textContent = (item.meta ? item.meta + ' · ' : '') + item.text;
      card.addEventListener('click', function(){
        copyText(item.text).then(function(){ showToast('已复制记录'); });
      });
      rail.appendChild(card);
    });
  }

  function ensureRecentRail(){
    if(document.getElementById('fusion-recent-rail')) return;
    const rail = document.createElement('section');
    rail.className = 'fusion-recent-rail';
    rail.id = 'fusion-recent-rail';
    rail.innerHTML = '<div class="fusion-recent-head"><span>Recent Copies</span><button class="fusion-v2-action" type="button" id="fusion-close-recent">Close</button></div>';
    document.body.appendChild(rail);
    rail.querySelector('#fusion-close-recent').addEventListener('click', function(){ rail.classList.remove('open'); });
    renderRecentRail();
  }

  function buildOpsItems(){
    const allowed = {vo:true, flower:true, comment:true};
    return buildSearchItems().filter(function(item){
      return item.type === 'copy' && allowed[item.panel];
    });
  }

  function renderOpsLibrary(){
    const list = document.getElementById('fusion-ops-list');
    const summary = document.getElementById('fusion-ops-summary');
    const product = document.getElementById('fusion-ops-product');
    const module = document.getElementById('fusion-ops-module');
    const search = document.getElementById('fusion-ops-search');
    if(!list || !summary || !product || !module || !search) return;
    const activeProduct = product.value || 'hair';
    const activeModule = module.value || 'vo';
    const q = search.value.trim().toLowerCase();
    const items = buildOpsItems().filter(function(item){
      const matchesProduct = item.product === activeProduct;
      const matchesModule = item.panel === activeModule;
      const matchesQuery = !q || (item.text + ' ' + item.label + ' ' + item.module).toLowerCase().includes(q);
      return matchesProduct && matchesModule && matchesQuery;
    }).slice(0, 80);

    summary.textContent = productLabel(activeProduct) + ' · ' + panelLabel(activeModule) + ' · ' + items.length + ' 条素材';
    list.innerHTML = '';
    if(!items.length){
      const empty = document.createElement('div');
      empty.className = 'fusion-ops-item';
      empty.textContent = '没有匹配素材';
      list.appendChild(empty);
      return;
    }
    items.forEach(function(item, idx){
      const card = document.createElement('article');
      card.className = 'fusion-ops-item';
      card.dataset.index = String(idx);
      card.__fusionItem = item;

      const meta = document.createElement('div');
      meta.className = 'fusion-ops-meta';
      meta.textContent = item.label + ' · ' + item.module;
      card.appendChild(meta);

      const text = document.createElement('div');
      text.className = 'fusion-ops-text';
      text.textContent = item.text;
      card.appendChild(text);

      const actions = document.createElement('div');
      actions.className = 'fusion-ops-actions';
      [
        ['open','打开模块','primary'],
        ['copy','复制',''],
        ['note','灵感','']
      ].forEach(function(action){
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.dataset.action = action[0];
        btn.className = action[2];
        btn.textContent = action[1];
        actions.appendChild(btn);
      });
      card.appendChild(actions);
      list.appendChild(card);
    });
  }

  function openOpsLibrary(product, module, query){
    const drawer = document.getElementById('fusion-ops-drawer');
    const productSelect = document.getElementById('fusion-ops-product');
    const moduleSelect = document.getElementById('fusion-ops-module');
    const search = document.getElementById('fusion-ops-search');
    if(!drawer) return;
    const active = product || (activeFusionType() === 'ice' ? 'hair' : activeFusionType());
    if(productSelect && productSelect.querySelector('option[value="' + active + '"]')) productSelect.value = active;
    if(moduleSelect && moduleSelect.querySelector('option[value="' + (module || 'vo') + '"]')) moduleSelect.value = module || 'vo';
    if(search && typeof query === 'string') search.value = query;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    renderOpsLibrary();
    setTimeout(function(){ if(search) search.focus(); }, 80);
  }

  function closeOpsLibrary(){
    const drawer = document.getElementById('fusion-ops-drawer');
    if(!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }

  function initOpsLibrary(){
    const drawer = document.getElementById('fusion-ops-drawer');
    if(!drawer) return;
    window.fusionOpenOpsLibrary = openOpsLibrary;
    const openButtons = [
      document.getElementById('fusion-open-ops'),
      document.getElementById('fusion-open-ops-hero')
    ].filter(Boolean);
    openButtons.forEach(function(btn){
      btn.addEventListener('click', function(){
        openOpsLibrary(activeFusionType() === 'ice' ? 'hair' : activeFusionType(), 'vo');
      });
    });
    const close = document.getElementById('fusion-close-ops');
    const backdrop = document.getElementById('fusion-ops-backdrop');
    const product = document.getElementById('fusion-ops-product');
    const module = document.getElementById('fusion-ops-module');
    const search = document.getElementById('fusion-ops-search');
    if(close) close.addEventListener('click', closeOpsLibrary);
    if(backdrop) backdrop.addEventListener('click', closeOpsLibrary);
    [product, module].forEach(function(el){
      if(el) el.addEventListener('change', renderOpsLibrary);
    });
    if(search) search.addEventListener('input', renderOpsLibrary);
    drawer.addEventListener('click', function(event){
      const card = event.target.closest('.fusion-ops-item');
      const action = event.target.closest('button[data-action]');
      if(!card || !action || !card.__fusionItem) return;
      const item = card.__fusionItem;
      if(action.dataset.action === 'open'){
        closeOpsLibrary();
        locateSearchItem(item);
      }
      if(action.dataset.action === 'copy'){
        copyText(item.text).then(function(){
          showToast('已复制');
          addRecentCopy(item.text, item.label + ' · ' + item.module);
        });
      }
      if(action.dataset.action === 'note' && window.fusionSaveIdea){
        window.fusionSaveIdea(item.text, 'violet');
      }
    });
    document.addEventListener('keydown', function(event){
      if(event.key === 'Escape') closeOpsLibrary();
    });
    renderOpsLibrary();
  }

  function setupCardFolding(){
    document.querySelectorAll('.product-app:not(#product-ice) .card').forEach(function(card){
      if(card.dataset.fusionFoldReady) return;
      const count = card.querySelectorAll('.copy-item').length;
      if(count < 12) return;
      card.dataset.fusionFoldReady = '1';
      card.classList.add('fusion-foldable', 'fusion-folded');
      const btn = document.createElement('button');
      btn.className = 'fusion-card-toggle';
      btn.type = 'button';
      btn.textContent = '展开全部';
      btn.addEventListener('click', function(){
        const expanded = card.classList.toggle('fusion-expanded');
        btn.textContent = expanded ? '收起' : '展开全部';
      });
      card.appendChild(btn);
    });
  }

  function initFusionV2Experience(){
    ensureRecentRail();
    setupCardFolding();

    const search = document.getElementById('fusion-global-search');
    const quickProduct = document.getElementById('fusion-quick-product');
    const quickModule = document.getElementById('fusion-quick-module');
    const focus = document.getElementById('fusion-focus-current');
    const openSearch = document.getElementById('fusion-open-search');
    const openNotes = document.getElementById('fusion-open-notes');
    const openRecent = document.getElementById('fusion-open-recent');
    const focusHero = document.getElementById('fusion-focus-current-hero');
    const results = document.getElementById('fusion-search-results');

    function focusCurrent(){
      const active = document.querySelector('.product-app.active .panel.active, .product-app.active .fusion-workbench');
      if(active) active.scrollIntoView({behavior:'smooth', block:'start'});
    }

    if(search){
      let timer = null;
      search.addEventListener('input', function(){
        clearTimeout(timer);
        timer = setTimeout(function(){ renderSearchResults(search.value); }, 80);
      });
      search.addEventListener('keydown', function(event){
        if(event.key === 'Escape'){
          search.value = '';
          renderSearchResults('');
        }
      });
    }
    if(openSearch) openSearch.addEventListener('click', function(){ if(search) search.focus(); });
    if(openNotes) openNotes.addEventListener('click', function(){ if(window.fusionOpenIdeaDock) window.fusionOpenIdeaDock(); });
    if(openRecent) openRecent.addEventListener('click', function(){ document.getElementById('fusion-recent-rail')?.classList.toggle('open'); });
    if(quickProduct) quickProduct.addEventListener('change', function(){ window.switchProduct(quickProduct.value); syncQuickControls(); });
    if(quickModule) quickModule.addEventListener('change', function(){ switchPanelByType(activeFusionType(), quickModule.value); syncQuickControls(); });
    if(focus) focus.addEventListener('click', focusCurrent);
    if(focusHero) focusHero.addEventListener('click', focusCurrent);
    if(results){
      results.addEventListener('click', function(event){
        const row = event.target.closest('.fusion-result-item');
        const action = event.target.closest('button[data-action]');
        if(!row || !action) return;
        const item = latestSearchResults[Number(row.dataset.index)];
        if(!item) return;
        if(action.dataset.action === 'locate') locateSearchItem(item);
        if(action.dataset.action === 'copy') {
          copyText(item.text).then(function(){
            showToast('已复制');
            addRecentCopy(item.text, item.label + ' · ' + item.module);
          });
        }
        if(action.dataset.action === 'note' && window.fusionSaveIdea) {
          window.fusionSaveIdea(item.text, 'blue');
        }
      });
    }

    document.addEventListener('click', function(event){
      const item = event.target.closest('.copy-item');
      if(item){
        const app = item.closest('.product-app');
        const product = app ? app.id.replace('product-', '') : '';
        addRecentCopy(activeCopyText(item), product ? productLabel(product) + ' · ' + panelLabel(panelFromElement(item)) : '');
      }
      if(event.target.closest('.nav-btn, .product-btn')) setTimeout(syncQuickControls, 80);
    }, true);
    syncQuickControls();
  }

  function initFusion(){
    const header = document.querySelector('header');
    if(header && !header.querySelector('.fusion-brandbar')){
      header.classList.add('fusion-hero');
      const brand = document.createElement('div');
      brand.className = 'fusion-brandbar';
      brand.innerHTML = '<div class="fusion-brand-left"><img class="fusion-brand-logo" src="' + FUSION_LOGO_SRC + '" alt="HiDream.ai"></div><div class="fusion-brand-chip">Overseas Creative Operation System</div>';
      header.insertBefore(brand, header.firstElementChild);
    }
    const logoText = document.querySelector('.logo-text');
    if(logoText) logoText.textContent = '智象未来上海';
    const logoSub = document.querySelector('.logo-sub');
    if(logoSub) logoSub.textContent = 'HiDream.ai · Creative Intelligence Workspace';
    window.switchProduct('ice');
    bootIceFrame();
    initIdeaDock();
    initOpsLibrary();
    initFusionV2Experience();
    resyncFusionHero('ice');
    window.addEventListener('load', function(){
      resyncFusionHero(activeFusionType());
    });
  }

  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFusion);
  } else {
    initFusion();
  }
})();
</script>`.replace('__ICE_CHUNKS__', chunkLiteral).replace('__LOGO_SRC__', logoLiteral);
}

let base = fs.readFileSync(basePath, 'utf8');
const iceSrcdoc = buildIceSrcdoc(fs.readFileSync(icePath, 'utf8'));
const iceBase64 = Buffer.from(iceSrcdoc, 'utf8').toString('base64');
const iceChunks = chunkString(iceBase64);
const logoSrc = 'data:image/png;base64,' + fs.readFileSync(logoPath).toString('base64');

base = stripRedundantUi(base);
base = optimizeEmbeddedImages(base);
base = base.replace(/<title>[\s\S]*?<\/title>/, '<title>智象未来上海 · 海外互动营销融合创作平台</title>');
base = base.replace(/<header>[\s\S]*?<\/header>/, buildLeanHeader(logoSrc));
base = base.replace(/<button class="product-btn active" data-product="hair"/g, '<button class="product-btn" data-product="hair"');
base = base.replace('<div class="product-app active" id="product-hair">', '<div class="product-app" id="product-hair">');

const iceApp = String.raw`
<div class="product-app active fusion-ice-app" id="product-ice">
  <section class="fusion-workbench" aria-label="冰丝凉凉裤 15 个 AI 提示词核心模块">
    <div class="fusion-section-head">
      <div>
        <div class="fusion-kicker">Core Prompt Workspace</div>
        <h2>冰丝凉凉裤 · 15 个 AI 提示词模块</h2>
        <p>这里保留冰丝凉凉裤文件中的 15 个 AI 视频提示词生成模块，并剥离原产品概述和裤子参考图。自运营的口播、花字、评论回复与参考图仍在其它产品工作台中完整保留。</p>
      </div>
      <div class="fusion-metrics" aria-label="模块统计">
        <div class="fusion-metric"><strong>15</strong><span>提示词模块</span></div>
        <div class="fusion-metric"><strong>Batch</strong><span>批量创作</span></div>
        <div class="fusion-metric"><strong>Copy</strong><span>一键复制</span></div>
      </div>
    </div>
    <div class="ice-frame-shell">
      <iframe id="ice-prompt-frame" title="冰丝凉凉裤 15 个 AI 提示词模块" allow="clipboard-read; clipboard-write"></iframe>
    </div>
  </section>
</div>`;

base = base.replace('<div class="product-app" id="product-hair">', iceApp + '\n<div class="product-app" id="product-hair">');

const injection = [
  buildOpsLibrary(),
  buildIdeaDock(),
  buildFusionCss(),
  buildFusionV2Css(),
  buildFusionV3Css(),
  buildFusionScript(iceChunks, logoSrc)
].join('\n');

base = base.replace('</body>', injection + '\n</body>');

fs.writeFileSync(outPath, base);
console.log(`Wrote ${outPath}`);
console.log(`Ice srcdoc size: ${(iceSrcdoc.length / 1024 / 1024).toFixed(2)} MB`);
if(imageOptimizeStats){
  console.log(`Reference images: ${imageOptimizeStats.optimizedCount} optimized, ${(imageOptimizeStats.originalBytes / 1024 / 1024).toFixed(2)} MB -> ${(imageOptimizeStats.optimizedBytes / 1024 / 1024).toFixed(2)} MB`);
}
console.log(`Output size: ${(base.length / 1024 / 1024).toFixed(2)} MB`);
