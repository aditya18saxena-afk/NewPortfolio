const SYMBOLS = ['♠', '♥', '♦', '♣', '★', '●', '▲', '■']
const PAIRS = SYMBOLS.length

const board = document.querySelector('#board')
const movesEl = document.querySelector('#moves')
const pairsEl = document.querySelector('#pairs')
const timeEl = document.querySelector('#time')
const winEl = document.querySelector('#win')
const winLine = document.querySelector('#win-line')

let first = null
let second = null
let lock = false
let moves = 0
let matched = 0
let seconds = 0
let timer = null
let started = false

function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const swap = cards[i]
    cards[i] = cards[j]
    cards[j] = swap
  }
  return cards
}

function formatTime(total) {
  const minutes = Math.floor(total / 60)
  const rest = total % 60
  return minutes + ':' + String(rest).padStart(2, '0')
}

function buildBoard() {
  board.innerHTML = ''
  shuffle([...SYMBOLS, ...SYMBOLS]).forEach((symbol) => {
    const card = document.createElement('div')
    card.className = 'card'
    card.dataset.symbol = symbol
    card.innerHTML =
      '<span class="face face--cover"></span>' +
      '<span class="face face--front">' + symbol + '</span>'
    card.addEventListener('click', () => flip(card))
    board.appendChild(card)
  })
}

function startTimer() {
  if (started) return
  started = true
  timer = setInterval(() => {
    seconds += 1
    timeEl.textContent = formatTime(seconds)
  }, 1000)
}

function flip(card) {
  if (lock || card.classList.contains('flipped')) return
  startTimer()
  card.classList.add('flipped')

  if (!first) {
    first = card
    return
  }

  second = card
  moves += 1
  movesEl.textContent = moves

  if (first.dataset.symbol === second.dataset.symbol) {
    first.classList.add('matched')
    second.classList.add('matched')
    matched += 1
    pairsEl.textContent = matched + ' / ' + PAIRS
    first = null
    second = null
    if (matched === PAIRS) finish()
    return
  }

  lock = true
  const missedA = first
  const missedB = second
  first = null
  second = null
  setTimeout(() => {
    missedA.classList.remove('flipped')
    missedB.classList.remove('flipped')
    lock = false
  }, 800)
}

function finish() {
  clearInterval(timer)
  timer = null
  winLine.textContent = moves + ' moves · ' + formatTime(seconds)
  setTimeout(() => winEl.classList.add('show'), 400)
}

function reset() {
  clearInterval(timer)
  timer = null
  first = null
  second = null
  lock = false
  moves = 0
  matched = 0
  seconds = 0
  started = false
  movesEl.textContent = '0'
  pairsEl.textContent = '0 / ' + PAIRS
  timeEl.textContent = '0:00'
  winEl.classList.remove('show')
  buildBoard()
}

document.querySelector('#new').addEventListener('click', reset)
document.querySelector('#again').addEventListener('click', reset)

reset()
