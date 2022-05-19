<script setup lang="ts">
const data = reactive(Array.from({ length: 10 },
  () => Array.from({ length: 10 }, () => 0),
))

function onClick(x: number, y: number) {
  const xy = x + y
  return xy
}
</script>

<template>
  <div>
    Minesweeper

    {{ data }}

    <div
      v-for="y in 10"
      :key="y"
    >
      <button
        v-for="x in 10"
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
