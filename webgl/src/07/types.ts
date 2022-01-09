export interface ShaderParamLocation {
  aPos: number
  aColor: number
  uViewMat: WebGLUniformLocation
  uModelMat: WebGLUniformLocation
  uProjMat: WebGLUniformLocation
}

export interface Vertex {
  shaderLocName: string
  length: number
  offset: number
}

export interface VerticesData {
  vertices: Float32Array
  length: number
  myVertices: Vertex[]
}

export interface VertexAndIndexData {
  verticesData: VerticesData
  indicesData: Uint8Array
}

export interface ShaderLocationNames {
  attributes: string[]
  uniforms: string[]
}
