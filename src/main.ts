import './style.css'

type Category = 'hair' | 'dress' | 'socks' | 'shoes' | 'headwear' | 'background'

type Item = {
  id: string
  name: string
  category: Category
  theme: 'strawberry' | 'sailor'
  swatch: string
  icon: string
}

type Look = Record<Category, string>

const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'hair', label: '发型', icon: '⌁' },
  { id: 'dress', label: '裙装', icon: '♢' },
  { id: 'socks', label: '袜子', icon: '〢' },
  { id: 'shoes', label: '鞋子', icon: '⌣' },
  { id: 'headwear', label: '头饰', icon: '♡' },
  { id: 'background', label: '背景', icon: '▦' },
]

const items: Item[] = [
  { id: 'hair-strawberry', name: '莓果长卷', category: 'hair', theme: 'strawberry', swatch: '#b8957e', icon: '卷' },
  { id: 'hair-sailor', name: '晴空双马尾', category: 'hair', theme: 'sailor', swatch: '#f1a9c6', icon: '双' },
  { id: 'dress-strawberry', name: '草莓甜心', category: 'dress', theme: 'strawberry', swatch: '#f28eac', icon: '莓' },
  { id: 'dress-sailor', name: '晴空水手', category: 'dress', theme: 'sailor', swatch: '#9acdf4', icon: '空' },
  { id: 'socks-strawberry', name: '莓果荷叶袜', category: 'socks', theme: 'strawberry', swatch: '#f7c1d3', icon: '粉' },
  { id: 'socks-sailor', name: '蓝白菱格袜', category: 'socks', theme: 'sailor', swatch: '#c6e1f7', icon: '蓝' },
  { id: 'shoes-strawberry', name: '草莓玛丽珍', category: 'shoes', theme: 'strawberry', swatch: '#e96f94', icon: '莓' },
  { id: 'shoes-sailor', name: '晴空学院鞋', category: 'shoes', theme: 'sailor', swatch: '#70b5e8', icon: '空' },
  { id: 'headwear-strawberry', name: '草莓蝴蝶结', category: 'headwear', theme: 'strawberry', swatch: '#ef668d', icon: '蝴' },
  { id: 'headwear-sailor', name: '晴空水手帽', category: 'headwear', theme: 'sailor', swatch: '#8fc8ef', icon: '帽' },
  { id: 'background-pink', name: '奶油粉房间', category: 'background', theme: 'strawberry', swatch: '#ffe9f2', icon: '粉' },
  { id: 'background-blue', name: '晴空房间', category: 'background', theme: 'sailor', swatch: '#e8f6ff', icon: '蓝' },
]

const defaultLook: Look = {
  hair: 'hair-strawberry',
  dress: 'dress-strawberry',
  socks: 'socks-strawberry',
  shoes: 'shoes-strawberry',
  headwear: 'headwear-strawberry',
  background: 'background-pink',
}

let selectedCategory: Category = 'dress'
let look: Look = { ...defaultLook }
let saveOpen = false

const app = document.querySelector<HTMLDivElement>('#app')!

function itemById(id: string) {
  return items.find(item => item.id === id)!
}

function themeFor(category: Category) {
  return itemById(look[category]).theme
}

function randomize() {
  categories.forEach(({ id }) => {
    const pool = items.filter(item => item.category === id)
    look[id] = pool[Math.floor(Math.random() * pool.length)].id
  })
  render()
}

function reset() {
  look = { ...defaultLook }
  render()
}

function hairSvg(theme: 'strawberry' | 'sailor') {
  if (theme === 'sailor') {
    return `
      <g class="layer hair-back">
        <path d="M92 158C52 181 45 250 65 328c8 31 28 49 47 50 9-48 13-122 9-184-4-42-13-58-29-36Z" fill="#f0abc6"/>
        <path d="M208 158c40 23 47 92 27 170-8 31-28 49-47 50-9-48-13-122-9-184 4-42 13-58 29-36Z" fill="#f0abc6"/>
        <path d="M85 205c-24 18-31 48-23 78M215 205c24 18 31 48 23 78" fill="none" stroke="#8b6d7b" stroke-width="5" stroke-linecap="round"/>
      </g>`
  }
  return `
    <g class="layer hair-back">
      <path d="M77 151c-34 40-30 152-4 210 15 33 42 47 63 43 3-56 3-163-7-221-8-43-30-55-52-32Z" fill="#b99a84"/>
      <path d="M223 151c34 40 30 152 4 210-15 33-42 47-63 43-3-56-3-163 7-221 8-43 30-55 52-32Z" fill="#b99a84"/>
      <path d="M93 212c-19 20-24 47-17 79m148-79c19 20 24 47 17 79" fill="none" stroke="#786a69" stroke-width="5" stroke-linecap="round"/>
      <path d="M91 170c14 23 19 47 14 73" fill="none" stroke="#8e756b" stroke-width="5" stroke-linecap="round"/>
    </g>`
}

function frontHairSvg(theme: 'strawberry' | 'sailor') {
  if (theme === 'sailor') {
    return `
      <g class="layer hair-front">
        <path d="M96 137c18-41 90-41 108 0 7 17 3 46-4 62-13-24-31-37-50-37s-37 13-50 37c-7-16-11-45-4-62Z" fill="#f0abc6" stroke="#7e6874" stroke-width="4"/>
        <path d="M115 153c4 15 2 27-5 40m30-42c2 15-1 29-7 42m33-41c-1 14 2 27 9 39" fill="none" stroke="#c27f9d" stroke-width="4" stroke-linecap="round"/>
      </g>`
  }
  return `
    <g class="layer hair-front">
      <path d="M95 138c18-43 92-43 110 0 7 18 2 49-5 65-14-25-31-39-50-39s-36 14-50 39c-7-16-12-47-5-65Z" fill="#b99a84" stroke="#77686a" stroke-width="4"/>
      <path d="M114 152c5 14 3 28-4 42m30-44c2 16-1 30-7 44m34-42c-1 14 2 28 8 40" fill="none" stroke="#907568" stroke-width="4" stroke-linecap="round"/>
    </g>`
}

function dressSvg(theme: 'strawberry' | 'sailor') {
  if (theme === 'sailor') {
    return `
      <g class="layer outfit">
        <path d="M111 255c12-13 66-13 78 0l8 55-12 18h-70l-12-18 8-55Z" fill="#fff9fb" stroke="#776d78" stroke-width="4"/>
        <path d="M113 256h74l-14 26-23-18-23 18-14-26Z" fill="#9fcff2"/>
        <path d="M140 270h20l-5 20h-10l-5-20Z" fill="#f29bb9"/>
        <path d="M114 320h72l18 92c-33 16-75 16-108 0l18-92Z" fill="#a9d8f6" stroke="#776d78" stroke-width="4"/>
        <path d="M124 346h52M120 370h60" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>
        <circle cx="132" cy="391" r="4" fill="#fff"/><circle cx="151" cy="383" r="4" fill="#f8c3d5"/><circle cx="170" cy="397" r="4" fill="#fff"/>
      </g>`
  }
  return `
    <g class="layer outfit">
      <path d="M109 252c13-15 69-15 82 0l9 62-14 17h-72l-14-17 9-62Z" fill="#fff7fa" stroke="#796b72" stroke-width="4"/>
      <path d="M119 258c9 8 17 16 31 16s22-8 31-16l4 49h-70l4-49Z" fill="#f5b3c7"/>
      <path d="M138 271l12 13 12-13 9 10-21 26-21-26 9-10Z" fill="#ed6f97"/>
      <path d="M112 322h76l23 91c-38 19-84 19-122 0l23-91Z" fill="#f49ab8" stroke="#796b72" stroke-width="4"/>
      <path d="M99 397c33 13 69 13 102 0" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
      <path d="M122 343h56" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".75"/>
      <circle cx="129" cy="374" r="6" fill="#e95f7f"/><path d="M124 369l5-8 5 8" fill="#7fbd67"/>
      <circle cx="171" cy="389" r="6" fill="#e95f7f"/><path d="M166 384l5-8 5 8" fill="#7fbd67"/>
    </g>`
}

function legsSvg(socks: 'strawberry' | 'sailor', shoes: 'strawberry' | 'sailor') {
  const sockFill = socks === 'sailor' ? '#d8ebfa' : '#fde9f0'
  const sockAccent = socks === 'sailor' ? '#78b9e8' : '#e9799d'
  const shoeFill = shoes === 'sailor' ? '#77b8e8' : '#e86f93'
  return `
    <g class="layer legs">
      <path d="M122 402h25v57c0 12-5 23-13 23s-12-11-12-23v-57Z" fill="#fff2ef" stroke="#796c70" stroke-width="4"/>
      <path d="M153 402h25v57c0 12-4 23-12 23s-13-11-13-23v-57Z" fill="#fff2ef" stroke="#796c70" stroke-width="4"/>
      <path d="M121 429h27v39h-27Z" fill="${sockFill}"/><path d="M152 429h27v39h-27Z" fill="${sockFill}"/>
      <path d="M122 433h25M153 433h25" stroke="${sockAccent}" stroke-width="5"/>
      <path d="M116 465c7-5 25-5 34 1v17c-8 7-27 7-34 0v-18Z" fill="${shoeFill}" stroke="#796c70" stroke-width="4"/>
      <path d="M150 466c9-6 27-6 34-1v18c-7 7-26 7-34 0v-17Z" fill="${shoeFill}" stroke="#796c70" stroke-width="4"/>
      <path d="M123 471h20M157 471h20" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    </g>`
}

function headwearSvg(theme: 'strawberry' | 'sailor') {
  if (theme === 'sailor') {
    return `
      <g class="layer headwear">
        <path d="M117 121c13-16 53-18 70 1l-10 14h-53l-7-15Z" fill="#fff" stroke="#776d78" stroke-width="4"/>
        <path d="M129 121c13-7 32-7 46 1" fill="none" stroke="#86c2ec" stroke-width="5"/>
        <path d="M178 126l19 8-16 16-9-10 6-14Z" fill="#8dc7ef" stroke="#776d78" stroke-width="3"/>
      </g>`
  }
  return `
    <g class="layer headwear">
      <path d="M116 127c-17-6-28 1-25 16 3 14 20 16 31 8l11-10-17-14Z" fill="#ef7095" stroke="#77696f" stroke-width="4"/>
      <path d="M184 127c17-6 28 1 25 16-3 14-20 16-31 8l-11-10 17-14Z" fill="#ef7095" stroke="#77696f" stroke-width="4"/>
      <rect x="137" y="133" width="26" height="19" rx="8" fill="#f6a8bd" stroke="#77696f" stroke-width="4"/>
      <circle cx="191" cy="122" r="9" fill="#ed5f7f"/><path d="M186 115l5-8 5 8" fill="#7dbf69"/>
    </g>`
}

function roomSvg(theme: 'strawberry' | 'sailor') {
  if (theme === 'sailor') {
    return `
      <g class="room-art" opacity=".82">
        <rect x="26" y="48" width="98" height="132" rx="22" fill="#fff" stroke="#cbe7f8" stroke-width="4"/>
        <path d="M75 49v130M27 109h96" stroke="#d8edf9" stroke-width="4"/>
        <circle cx="57" cy="78" r="9" fill="#f6c6d8"/><path d="M198 69h74v66h-74z" fill="#fff" stroke="#cbe7f8" stroke-width="4" rx="18"/>
        <path d="M209 118c12-22 31-31 53-27" stroke="#9bd0ef" stroke-width="5" fill="none" stroke-linecap="round"/>
      </g>`
  }
  return `
    <g class="room-art" opacity=".82">
      <rect x="24" y="52" width="104" height="126" rx="24" fill="#fff" stroke="#f4c8d8" stroke-width="4"/>
      <path d="M76 53v124M25 113h102" stroke="#f7d9e4" stroke-width="4"/>
      <path d="M48 149c9-18 19-26 30-25 10 1 18 10 24 25" fill="#f7bfd1"/>
      <rect x="198" y="72" width="78" height="68" rx="18" fill="#fff" stroke="#f4c8d8" stroke-width="4"/>
      <circle cx="222" cy="99" r="11" fill="#f2a5bd"/><circle cx="252" cy="114" r="8" fill="#f7c8d8"/>
    </g>`
}

function renderDoll() {
  const bgTheme = themeFor('background')
  const hairTheme = themeFor('hair')
  const dressTheme = themeFor('dress')
  const socksTheme = themeFor('socks')
  const shoesTheme = themeFor('shoes')
  const headTheme = themeFor('headwear')

  const bg = bgTheme === 'sailor' ? '#eaf7ff' : '#fff0f6'
  return `
    <div class="stage" style="--stage-bg:${bg}">
      <svg class="doll-svg" viewBox="0 0 300 520" role="img" aria-label="当前装扮角色">
        ${roomSvg(bgTheme)}
        ${hairSvg(hairTheme)}
        <g class="layer body-base">
          <ellipse cx="150" cy="191" rx="55" ry="58" fill="#fff1ee" stroke="#786b70" stroke-width="4"/>
          <path d="M126 240h48l9 76h-66l9-76Z" fill="#fff3f1" stroke="#786b70" stroke-width="4"/>
          <path d="M116 260c-18 12-27 37-28 68M184 260c18 12 27 37 28 68" fill="none" stroke="#786b70" stroke-width="18" stroke-linecap="round"/>
          <path d="M116 260c-18 12-27 37-28 68M184 260c18 12 27 37 28 68" fill="none" stroke="#fff1ee" stroke-width="11" stroke-linecap="round"/>
          <ellipse cx="132" cy="194" rx="11" ry="15" fill="#7f5f8d"/>
          <ellipse cx="168" cy="194" rx="11" ry="15" fill="#7f5f8d"/>
          <circle cx="136" cy="189" r="4" fill="#fff"/><circle cx="172" cy="189" r="4" fill="#fff"/>
          <path d="M143 216c5 5 9 5 14 0" stroke="#e58b9f" stroke-width="3" fill="none" stroke-linecap="round"/>
          <ellipse cx="112" cy="214" rx="13" ry="7" fill="#f7c4ce" opacity=".55"/><ellipse cx="188" cy="214" rx="13" ry="7" fill="#f7c4ce" opacity=".55"/>
        </g>
        ${dressSvg(dressTheme)}
        ${legsSvg(socksTheme, shoesTheme)}
        ${frontHairSvg(hairTheme)}
        ${headwearSvg(headTheme)}
      </svg>
      <div class="stage-caption">轻触下方衣柜开始搭配</div>
    </div>`
}

function renderSaveModal() {
  if (!saveOpen) return ''
  const slots = [1, 2, 3].map(slot => {
    const saved = localStorage.getItem(`dress-up-slot-${slot}`)
    return `<button class="save-slot" data-slot="${slot}"><span class="slot-doll">${saved ? '♡' : '+'}</span><strong>${saved ? `装扮 ${slot}` : '空存档'}</strong><small>${saved ? '点击覆盖保存' : '保存当前搭配'}</small></button>`
  }).join('')
  return `<div class="modal-backdrop" id="modal-backdrop"><section class="save-modal"><button class="modal-close" id="modal-close">×</button><p class="modal-kicker">MY LOOKS</p><h2>我的装扮</h2><p class="modal-desc">选择一个位置保存当前搭配</p><div class="save-slots">${slots}</div></section></div>`
}

function render() {
  const visibleItems = items.filter(item => item.category === selectedCategory)
  app.innerHTML = `
    <main class="phone-shell">
      <header class="topbar">
        <button class="icon-btn" id="back" aria-label="返回">‹</button>
        <div class="title-wrap"><div class="eyebrow">V0.2 LAYER TEST</div><h1>装扮少女</h1></div>
        <button class="icon-btn heart" id="save" aria-label="保存">♡</button>
      </header>
      ${renderDoll()}
      <section class="actions"><button id="random"><span>✦</span> 随机搭配</button><button id="reset"><span>↺</span> 恢复默认</button></section>
      <section class="wardrobe">
        <nav class="categories" aria-label="服装分类">
          ${categories.map(category => `<button class="category ${category.id === selectedCategory ? 'active' : ''}" data-category="${category.id}"><span class="cat-icon">${category.icon}</span><span>${category.label}</span></button>`).join('')}
        </nav>
        <div class="item-grid">
          ${visibleItems.map(item => `<button class="item-card ${look[item.category] === item.id ? 'selected' : ''}" data-item="${item.id}" style="--swatch:${item.swatch}"><span class="item-preview"><b>${item.icon}</b><i></i></span><span class="item-copy"><strong>${item.name}</strong><small>${look[item.category] === item.id ? '✓ 正在使用' : '轻触换上'}</small></span></button>`).join('')}
        </div>
      </section>
      ${renderSaveModal()}
    </main>`

  document.querySelectorAll<HTMLButtonElement>('[data-category]').forEach(button => button.addEventListener('click', () => { selectedCategory = button.dataset.category as Category; render() }))
  document.querySelectorAll<HTMLButtonElement>('[data-item]').forEach(button => button.addEventListener('click', () => { const item = itemById(button.dataset.item!); look[item.category] = item.id; render() }))
  document.querySelector<HTMLButtonElement>('#random')?.addEventListener('click', randomize)
  document.querySelector<HTMLButtonElement>('#reset')?.addEventListener('click', reset)
  document.querySelector<HTMLButtonElement>('#save')?.addEventListener('click', () => { saveOpen = true; render() })
  document.querySelector<HTMLButtonElement>('#modal-close')?.addEventListener('click', () => { saveOpen = false; render() })
  document.querySelector<HTMLDivElement>('#modal-backdrop')?.addEventListener('click', event => { if (event.target === event.currentTarget) { saveOpen = false; render() } })
  document.querySelectorAll<HTMLButtonElement>('[data-slot]').forEach(button => button.addEventListener('click', () => { localStorage.setItem(`dress-up-slot-${button.dataset.slot}`, JSON.stringify(look)); localStorage.setItem('dress-up-v0-look', JSON.stringify(look)); saveOpen = false; render() }))
}

const saved = localStorage.getItem('dress-up-v0-look')
if (saved) {
  try { look = { ...defaultLook, ...JSON.parse(saved) } } catch { look = { ...defaultLook } }
}

render()
