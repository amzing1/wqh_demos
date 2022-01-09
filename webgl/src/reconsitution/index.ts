import { Actor } from './common/base/Actor'
import { Camera } from './common/base/Camera'
import { vshader_source, fshader_source } from './shaders/shader'
import { ShaderLocationNames, VertexAndIndexData } from './types/types'
export function init() {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement
  const gl = canvas.getContext('webgl2')
  const shaLocNames: ShaderLocationNames = {
    attributes: ['aPos', 'aColor', 'aNormal'],
    uniforms: ['uMvpMat', 'uLightColor', 'uLightDirection', 'uAmbientColor', 'uNormalMat', 'uModelMat'],
  }
  const actor = new Actor(gl, vshader_source, fshader_source, shaLocNames)
  const camera = new Camera(gl, vshader_source, fshader_source, shaLocNames, canvas.width / canvas.height)
  actor.setMvpMatrix(actor.modelMatrix, camera.viewMatrix, camera.projMatrix)
  actor.initVertices(initVertices())
  actor.draw()
  // actor.tick([actor.rotate])
}

function initVertices(): VertexAndIndexData {
  const vertices = new Float32Array([
    1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1,
    1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, 1,
    1, 1, 1, 1, 1, -1,
  ])

  const colors = new Float32Array([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ])

  const normals = new Float32Array([
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, -1,
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
  ])
  const indices = new Uint8Array([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22,
    20, 22, 23,
  ])
  return {
    buffers: [
      {
        buffer: vertices,
        length: 3,
        shaderLocName: 'aPos',
      },
      {
        buffer: colors,
        length: 3,
        shaderLocName: 'aColor',
      },
      {
        buffer: normals,
        length: 3,
        shaderLocName: 'aNormal',
      },
    ],
    indices,
  }
}
