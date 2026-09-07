import './style.css'

type Category = 'hair' | 'dress' | 'socks' | 'shoes' | 'headwear' | 'background'

type Item = {
  id: string
  name: string
  category: Category
  emoji: string
  tone: string
}

const categories: { id: Category; label: string }[] = [
  { id: 'hair', label: '发型' },
  { id: 'dress', label: '裙装' },
  { id: 'socks', label: '袜子' },
  { id: 'shoes', label: '鞋子' },
  { id: 'headwear', label: '头饰' },
  { id: 'background', label: '背景' },
]

const items: Item[] = [
  { id: 'hair-strawberry', name: '莓果长卷', category: 'hair', emoji: '〰️', tone: '#c9a98e' },
  { id: 'hair-sailor', name: '晴空双马尾', category: 'hair', emoji: '〰️', tone: '#f4b6c8' },
  { id: 'dress-strawberry', name: '草莓甜心', category: 'dress', emoji: '👗', tone: '#f49ab6' },
  { id: 'dress-sailor', name: '晴空水手', category: 'dress', emoji: '👗', tone: '#a9d4f7' },
  { id: 'socks-strawberry', name: '莓果荷叶袜', category: 'socks', emoji: '🧦', tone: '#f8c6d7' },
  { id: 'socks-sailor', name: '蓝白菱格袜', category: 'socks', emoji: '🧦', tone: '#c8e2f8' },
  { id: 'shoes-strawberry', name: '草莓玛丽珍', category: 'shoes', emoji: '👞', tone: '#ef789d' },
  { id: 'shoes-sailor', name: '晴空学院鞋', category: 'shoes', emoji: '👞', tone: '#78b7e8' },
  { id: 'headwear-strawberry', name: '草莓蝴蝶结', category: 'headwear', emoji: '🎀', tone: '#f06b91' },
  { id: 'headwear-sailor', name: '晴空水手帽', category: 'headwear', emoji: '🎀', tone: '#8ec5ed' },
  { id: 'background-pink', name: '奶油粉房间', category: 'background', emoji: '▦', tone: '#ffe8f1' },
  { id: 'background-blue', name: '晴空房间', category: 'background', emoji: '▦', tone: '#e7f5ff' },
]

const defaultLook: Record<Category, string> = {
  hair: 'hair-strawberry',
  dress: 'dress-strawberry',
  socks: 'socks-strawberry',
  shoes: 'shoes-strawberry',
  headwear: 'headwear-strawberry',
  background: 'background-pink',
}

let selectedCategory: Category = 'dress'
let look = { ...defaultLook }

const app = document.querySelector<HTMLDivElement>('#app')!

function itemById(id: string) {
  return items.find(item => item.id === id)!
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

function renderDoll() {
  const bg = itemById(look.background).tone
  const hair = itemById(look.hair).tone
  const dress = itemById(look.dress).tone
  const socks = itemById(look.socks).tone
  const shoes = itemById(look.shoes).tone
  const head = itemById(look.headwear).tone

  return `
    <div class="stage" style="--stage-bg:${bg}; --hair:${hair}; --dress:${dress}; --socks:${socks}; --shoes:${shoes}; --head:${head}">
      <div class="room-decor decor-a"></div>
      <div class="room-decor decor-b"></div>
      <div class="doll" aria-label="当前装扮角色">
        <div class="hair-back"></div>
        <div class="head">
          <div class="bangs"></div>
          <div class="eye eye-left"></div>
          <div class="eye eye-right"></div>
          <div class="mouth"></div>
          <div class="headwear"></div>
        </div>
        <div class="neck"></div>
        <div class="body">
          <div class="arm arm-left"></div>
          <div class="arm arm-right"></div>
          <div class="dress"></div>
          <div class="leg leg-left"><span class="sock"></span><span class="shoe"></span></div>
          <div class="leg leg-right"><span class="sock"></span><span class="shoe"></span></div>
        </div>
      </div>
    </div>
  `
}

function render() {
  const visibleItems = items.filter(item => item.category === selectedCategory)

  app.innerHTML = `
    <main class="phone-shell">
      <header class="topbar">
        <button class="icon-btn" id="back" aria-label="返回">‹</button>
        <div class="title-wrap">
          <div class="eyebrow">V0 可玩原型</div>
          <h1>装扮少女</h1>
        </div>
        <button class="icon-btn" id="save" aria-label="保存">♡</button>
      </header>

      ${renderDoll()}

      <section class="actions" aria-label="快捷操作">
        <button id="random">随机搭配</button>
        <button id="reset">恢复默认</button>
      </section>

      <section class="wardrobe">
        <nav class="categories" aria-label="服装分类">
          ${categories.map(category => `
            <button class="category ${category.id === selectedCategory ? 'active' : ''}" data-category="${category.id}">
              <span>${category.label}</span>
            </button>
          `).join('')}
        </nav>

        <div class="item-grid">
          ${visibleItems.map(item => `
            <button class="item-card ${look[item.category] === item.id ? 'selected' : ''}" data-item="${item.id}">
              <span class="item-preview" style="--tone:${item.tone}">${item.emoji}</span>
              <strong>${item.name}</strong>
              <small>${look[item.category] === item.id ? '正在使用' : '点击换上'}</small>
            </button>
          `).join('')}
        </div>
      </section>
    </main>
  `

  document.querySelectorAll<HTMLButtonElement>('[data-category]').forEach(button => {
    button.addEventListener('click', () => {
      selectedCategory = button.dataset.category as Category
      render()
    })
  })

  document.querySelectorAll<HTMLButtonElement>('[data-item]').forEach(button => {
    button.addEventListener('click', () => {
      const item = itemById(button.dataset.item!)
      look[item.category] = item.id
      render()
    })
  })

  document.querySelector<HTMLButtonElement>('#random')?.addEventListener('click', randomize)
  document.querySelector<HTMLButtonElement>('#reset')?.addEventListener('click', reset)
  document.querySelector<HTMLButtonElement>('#save')?.addEventListener('click', () => {
    localStorage.setItem('dress-up-v0-look', JSON.stringify(look))
    alert('当前搭配已保存在本机浏览器中 ♡')
  })
}

const saved = localStorage.getItem('dress-up-v0-look')
if (saved) {
  try {
    look = { ...defaultLook, ...JSON.parse(saved) }
  } catch {
    look = { ...defaultLook }
  }
}

render()
