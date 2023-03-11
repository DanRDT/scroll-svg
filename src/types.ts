export type OptionalOptions = {
  invert?: boolean
  draw_origin?: "top" | "center" | "bottom" | number
  offset?: number
  speed?: number
  undraw?: boolean
}

export type Options = Required<OptionalOptions>
