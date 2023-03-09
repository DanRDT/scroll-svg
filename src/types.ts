export type Options = {
  invert?: boolean
  offset?: number
  speed?: number
  scroll_origin?: "top" | "center" | "bottom"
}

export type DefaultOptions = Required<Options>
