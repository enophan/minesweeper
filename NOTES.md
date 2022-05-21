## 先写了简单的 UI 和布局

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

## 在每一个`button`上添加点击事件，获取坐标

接下来判断状态，判断这个按钮是按下去了还是没有。

### reactive

这里用`reactive`，[vue reactive()](https://staging-cn.vuejs.org/api/reactivity-core.html#reactive)先留着，以后再看，现在还看不懂

### Array.from()

还涉及到`Array.from()`，[MDN Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

+ `arrayLike`：想要转换成数组的伪数组对象或可迭代对象。

+ `mapFn` （可选）：如果指定了该参数，新数组中的每个元素会执行该回调函数。

  > mapFunction(item，index){...}
  >
  > (value, index) => ...

+ `thisArg` （可选）：可选参数，执行回调函数 mapFn 时 this 对象。

`Array.from()`第一个参数是`arrayLike`，意思就是一个伪数组可迭代的对象，`Array.from()`可以把伪数组或者可迭代对象转变为一个数组。

Array.from() 可以通过以下方式来创建数组对象：

- 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）

- 可迭代对象（可以获取对象中的元素,如 Map和 Set 等）

这里antfu是这样构造的

> 后来data改名为state

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

然后写入坐标

```vue
<script setup lang="ts">
const data = reactive(
  Array.from({ length: 10 }, (_, y) =>
    Array.from({ length: 10 },
      (_, x) => y * 10 + (x + 1),
    ),
  ))
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>

```

```
[ 
[  1 ,  2 ,  3 ,  4 ,  5 ,  6 ,  7 ,  8 ,  9 , 10 ],
[ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ],
[ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ],
[ 31, 32, 33, 34, 35, 36, 37, 38, 39, 40 ],
[ 41, 42, 43, 44, 45, 46, 47, 48, 49, 50 ],
[ 51, 52, 53, 54, 55, 56, 57, 58, 59, 60 ],
[ 61, 62, 63, 64, 65, 66, 67, 68, 69, 70 ],
[ 71, 72, 73, 74, 75, 76, 77, 78, 79, 80 ],
[ 81, 82, 83, 84, 85, 86, 87, 88, 89, 90 ],
[ 91, 92, 93, 94, 95, 96, 97, 98, 99, 100 ]
]
```

这里注意`v-for="i in 10"`，i 是从1开始的，而`Array.from()`出来的是数组，下标是从0开始的，所以表达式不太相同。

- (y - 1) * 10 + x
- y * 10 + (x + 1)

但是一会儿关联起来就一样了。

## 方阵和按钮关联起来

```vue
<script setup lang="ts">
const HEIGHT = 10 // 高是y
const WIDTH = 10 // 宽是x

const state = reactive(
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from({ length: WIDTH },
      (_, x) => y * 10 + (x + 1),
    ),
  ))

// 防止报错暂时写的
function onClick(x: number, y: number) {
  const xy = x + y
  return xy
}
</script>

<template>
  <div>
    Minesweeper
    <div v-for="row, y in state" :key="y">
      <button v-for="item, x in row" :key="x" w-10 h-10 hover:bg-gray border @click="onClick(x, y)">
        {{ (y - 1) * 10 + x }}
      </button>
    </div>
  </div>
</template>
```

这样就绑定了状态，但是状态不能是一个数字。

## interface

```js
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
```



## 生成炸弹

[MDN | for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)

## 炸弹数

```js
function updateNumbers() {
  state.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block.mine)
        return
      directions.forEach((elem) => {
        const _y = elem[0] + block.y
        const _x = elem[1] + block.x
        // if ([_x,_y]坐标上有炸弹)
        //   block.adjacentMine += 1
      })
    })
  })
}
```

然后我就想不出来`if([_x,_y]坐标上有炸弹)`该怎么写

antfu的代码如下

```js
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
```

还要考虑超出边界问题。`[_x, _y]`这样表示`state[y2][x2]`

还有`directions.forEach(([dy, dx]) => {}`原来可以直接写数组

```shell
ni -D @iconify-json/mdi
```

这个地方不太懂，主要是不懂vue

```vue
<template v-if="block.reveal">
  <div v-if="block.mine" i-mdi-mine />
  <div v-else>
    {{ block.adjacentMines }}
  </div>
</template>
```

有点懂了，因为下面是模板，每一个模板都要用`v-if`做一次判断，所以要用`<template>`

## 点下去再生成炸弹，上下左右不能生成炸弹

## 重构计算周围`block`的情况

antfu 把 forEach 换成 map

1. map速度比foreach快

2. map会返回一个新数组，不对原数组产生影响,foreach不会产生新数组，foreach返回undefined

3. map因为返回数组所以可以链式操作，foreach不能

4. map里可以用return ,而foreach里用return不起作用，foreach不能用break，会直接报错

```typescript
function checkBlockAround(block: BlockState) {
  return directions.map(([dy, dx]) => {
    const y2 = dy + block.y
    const x2 = dx + block.x
    if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT)
      return undefined
    return state[y2][x2]
  })
    .filter(Boolean)
}
```

`Boolean`是一个函数，它会对遍历数组中的元素，并根据元素的真假类型，对应返回 true 或 false。

`.filter(Boolean)`是`.filter((elem) => { return Boolean(elem) })`的简写。


```typescript
function checkBlockAround(block: BlockState) {
  return directions.map(([dy, dx]) => {
    const y2 = dy + block.y
    const x2 = dx + block.x
    if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT)
      return undefined
    return state[y2][x2]
  }).filter(Boolean) as BlockState[]
}
```

`as BlockState[]`这个是因为ts自身的原因，因为在上边`return undefine`，而整体返回的是一个数组，ts就认为`checkBlockAround()`可能会返回 BlockStae 或 undefined 

```typescript
(local function) checkBlockAround(block: BlockState): ({
    x: number;
    y: number;
    revealed: {
        valueOf: () => boolean;
    };
    mine?: {
        valueOf: () => boolean;
    } | undefined;
    flagged?: {
        valueOf: () => boolean;
    } | undefined;
    adjacentMines: number;
} | undefined)[] // <---
```

用的时候就得这样

```typescript
checkBlockAround(block)
  .forEach((item) => {
    if (item?.mine) // <---- 要写成 item?.mine 而不是 item.mine
      block.adjacentMines += 1
  })
```

加上断言就好了