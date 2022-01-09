import { mat4, vec3 } from 'gl-matrix'

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

export interface BufferData {
  buffer: Float32Array
  shaderLocName: string
  length: number
}

export interface VertexAndIndexData {
  buffers: BufferData[]
  indices: Uint8Array
}

export interface ShaderLocationNames {
  attributes: string[]
  uniforms: string[]
}

export type ShaderValue = mat4 | vec3

export enum ShaderType {
  MAT4,
  VEC3,
}

export enum MatrixType {
  PROJ_MATRIX,
  MODEL_MATRIX,
  VIEW_MATRIX,
  NORMAL_MATRIX,
}
