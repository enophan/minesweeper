<script setup lang="ts">
interface BlockState {
  x: number
  y: number
  reveal?: Boolean // 有没有被翻开
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
function generateMines() {
  for (const row of state) {
    for (const block of row)
      block.mine = Math.random() < 0.3
  }
}
function onClick(x: number, y: number) {
  const xy = x + y
  return xy
}

generateMines()
updateNumbers()
</script>

<template>
  <div>
    Minesweeper
    <div>(y,x)</div>
    <div
      v-for="row, y in state"
      :key="y"
    >
      <button
        v-for="item, x in row"
        :key="x"
        w-10
        h-10
        hover:bg-gray
        border
        @click="onClick(x, y)"
      >
        <!-- {{ `${y},${x}` }} -->
        {{ item.mine ? 'x' : item.adjacentMines }}
      </button>
    </div>
  </div>
</template>
