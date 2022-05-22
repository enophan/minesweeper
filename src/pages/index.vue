<script setup lang="ts">
import type { BlockState } from '~/types'
const HEIGHT = 5 // 高是y
const WIDTH = 5 // 宽是x
const state = ref(
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from({ length: WIDTH },
      (_, x): BlockState => ({
        x,
        y,
        revealed: false,
        adjacentMines: 0,
      }),
    ),
  ))
// 代表了某个block周围八个block的坐标
const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
]
const numberColors = [
  'text-transparent',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-pink-500',
  'text-purple-500',
  'text-orange-500',
  'text-teal-500',
]
// 炸弹是在点击的一瞬间计算好的，这个变量就是炸弹生成的标志
let minesGenerate = false
// 四周的炸弹数
function updateNumbers() {
  state.value.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block.mine)
        return
      blockAround(block)
        .forEach((item) => {
          if (item.mine)
            block.adjacentMines += 1
        })
    })
  })
}
// 埋炸弹
function generateMines(initial: BlockState) {
  for (const row of state.value) {
    for (const block of row)
      block.mine = Math.random() < 0.2
  }
  initial.mine = false
  blockAround(initial).forEach(item => item.mine = false)
  updateNumbers()
}
// 格子上色
function getBlockClass(block: BlockState) {
  if (!block.revealed)
    return 'bg-gray-500/10 hover:bg-gray/50'
  return block.mine
    ? 'bg-red/85'
    : numberColors[block.adjacentMines]
}
// 获取坐标
function onClick(block: BlockState) {
  if (block.flagged)
    return
  block.revealed = true
  if (block.mine) {
    alert('game over')
    return
  }
  if (!minesGenerate) {
    minesGenerate = true
    generateMines(block)
  }
  expendZero(block)
  gameState()
}
// 展开周围没炸弹的格子
function expendZero(block: BlockState) {
  if (block.adjacentMines)
    return
  blockAround(block).forEach((item) => {
    if (item.revealed)
      return
    item.revealed = true
    expendZero(item)
  })
}
// 搜集某个block周围的格子
function blockAround(block: BlockState) {
  return directions.map(([dy, dx]) => {
    const y2 = dy + block.y
    const x2 = dx + block.x
    if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT)
      return undefined
    return state.value[y2][x2]
  }).filter(Boolean) as BlockState[]
  // .filter((elem) => { return Boolean(elem) })
}
// 插旗
function plantFlag(block: BlockState) {
  if (block.revealed)
    return
  block.flagged = !block.flagged
  gameState()
}
// 判断输赢
function gameState() {
  const blocks = state.value.flat()
  if (blocks.every(block => block.revealed || block.flagged)) {
    if (blocks.some(block => !block.mine && block.flagged))
      alert('you cheat')
    else
      alert('you win')
  }
}
</script>

<template>
  <div>
    Minesweeper
    <div p5>
      <div
        v-for="row, y in state"
        :key="y"
        flex="~"
        items-center
        justify-center
      >
        <button
          v-for="block, x in row"
          :key="x"
          w-10 h-10 m=".4"
          border="1 gray-400/10"
          flex="~" items-center justify-center
          :class="getBlockClass(block)"
          @click="onClick(block)"
          @contextmenu.prevent="plantFlag(block)"
        >
          <template v-if="block.flagged">
            <div i-mdi-flag text-red />
          </template>
          <template v-else-if="block.revealed">
            <div v-if="block.mine" i-mdi-mine />
            <div v-else>
              {{ block.adjacentMines }}
            </div>
          </template>
        </button>
      </div>
    </div>
  </div>
</template>
