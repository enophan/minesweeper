<script setup lang="ts">
const dev = true // 开发模式写完就删
interface BlockState {
  x: number
  y: number
  revealed: Boolean // 有没有被翻开
  mine?: Boolean // 有没有炸弹
  flagged?: Boolean // 插旗
  adjacentMines: number // 附近的炸弹数 adjacent 附近的
}
const HEIGHT = 10 // 高是y
const WIDTH = 10 // 宽是x
const state = reactive(
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
  state.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block.mine)
        return
      directions.forEach(([dy, dx]) => {
        const x2 = dx + x
        const y2 = dy + y
        if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT)
          return
        if (state[y2][x2].mine)
          block.adjacentMines += 1
      })
    })
  })
}
// 埋炸弹
function generateMines(inital: BlockState) {
  for (const row of state) {
    for (const block of row)
      block.mine = Math.random() < 0.2
  }
  inital.mine = false
  directions.forEach(([dy, dx]) => {
    const y2 = dy + inital.y
    const x2 = dx + inital.x
    state[y2][x2].mine = false
  })
  updateNumbers()
}
// 格子上色
function getBlockClass(block: BlockState) {
  if (!block.revealed)
    return 'bg-gray-500/10'
  return block.mine
    ? 'bg-red/85'
    : numberColors[block.adjacentMines]
}
// 获取坐标
function onClick(block: BlockState) {
  block.revealed = true
  if (!minesGenerate) {
    minesGenerate = true
    generateMines(block)
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
          hover="bg-gray/50"
          border="1 gray-400/10"
          flex="~" items-center justify-center
          :class="getBlockClass(block)"
          @click="onClick(block)"
        >
          <template v-if="block.revealed || dev">
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
