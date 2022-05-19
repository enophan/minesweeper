<script setup lang="ts">
function onClick(x: number, y: number) {
  const xy = x + y
  return xy
}
</script>

<template>
  <div>
    Minesweeper

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
