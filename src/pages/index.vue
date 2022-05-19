<script setup lang="ts">
const HEIGHT = 10 // 高是y
const WIDTH = 10 // 宽是x

const state = reactive(
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from({ length: WIDTH },
      (_, x) => y * 10 + (x + 1),
    ),
  ))

function onClick(x: number, y: number) {
  const xy = x + y
  return xy
}
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
        {{ (y - 1) * 10 + x }}
      </button>
    </div>
  </div>
</template>
