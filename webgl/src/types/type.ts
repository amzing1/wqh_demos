export interface Point2D {
  x: number
  y: number
  color?: Color
}

export interface Color {
  r: number
  g: number
  b: number
  a: number
}

export interface ShaderParamLocation {
  aPos: number
  uTrans?: WebGLUniformLocation
  uMat?: WebGLUniformLocation
  aSize?: number
  uFragColor: WebGLUniformLocation
  aColor?: number
  aSt?: number
  uSampler?: WebGLUniformLocation
  uSampler2?: WebGLUniformLocation
}
