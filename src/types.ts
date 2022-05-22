export interface BlockState {
  x: number
  y: number
  revealed: Boolean // 有没有被翻开
  mine?: Boolean // 有没有炸弹
  flagged?: Boolean // 插旗
  adjacentMines: number // 附近的炸弹数 adjacent 附近的
}
