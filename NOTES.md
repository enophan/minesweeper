先写了简单的 UI 和布局

```vue
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
      >
        {{ (y - 1) * 10 + x }}
      </button>
    </div>
  </div>
</template>

```

在每一个`button`上添加点击事件，去