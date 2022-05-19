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

在每一个`button`上添加点击事件，获取坐标

接下来判断状态，判断这个按钮是按下去了还是没有。

这里用`reactive`，[vue reactive()](https://staging-cn.vuejs.org/api/reactivity-core.html#reactive)

先留着，以后再看，现在还看不懂

还涉及到`Array.from()`，[MDN Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

`arrayLike`：想要转换成数组的伪数组对象或可迭代对象。

`mapFn` （可选）：如果指定了该参数，新数组中的每个元素会执行该回调函数。

`thisArg` （可选）：可选参数，执行回调函数 mapFn 时 this 对象。

`Array.from()`第一个参数是`arrayLike`，意思就是一个伪数组可迭代的对象，`Array.from()`可以把伪数组或者可迭代对象转变为一个数组。

Array.from() 可以通过以下方式来创建数组对象：

- 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）

- 可迭代对象（可以获取对象中的元素,如 Map和 Set 等）

这里antfu是这样构造的

```vue
<script setup lang="ts">
const data = reactive(Array.from({ length: 10 }, () => []))
</script>

<template>
  <div>
    <pre>
    {{ data }}
    </pre>
  </div>
</template>

```

这样就会构造出

![](D:\personal\study\1-编程\4-项目\minesweeper\minesweeper\public\notesImg\ArrayFrom.jpg)

然后只需要每一个元素都`Array.from()`一下即可，这样就构造出一个扫雷的方阵

```js
const data = reactive(Array.from({ length: 10 },
  () => Array.from({ length: 10 }, () => 0),
))
```

```
[
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
]
```











