<script setup lang="ts">
interface BlockState {
  x: number
  y: number
  reveal?: Boolean // 有没有被翻开
  mine?: Boolean // 有没有炸弹
  flagged?: Boolean // 插旗
  adjacentMine?: number // 附近的炸弹数 adjacent 附近的
}
const HEIGHT = 10 // 高是y
const WIDTH = 10 // 宽是x
const state = reactive(
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from({ length: WIDTH },
      (_, x): BlockState => ({
        x, y,
      }),
    ),
  ))
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
</script>

<template>
  <div>
    Minesweeper
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
        {{ item.mine ? 'x' : '.' }}
      </button>
    </div>
  </div>
</template>
