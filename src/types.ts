export type OptionalOptions = {
  invert?: boolean
  draw_origin?: "top" | "center" | "bottom" | number
  offset_type?: "none" | "percent" | "pixel"
  offset_value?: number
  speed?: number
}

export type Options = Required<OptionalOptions>
