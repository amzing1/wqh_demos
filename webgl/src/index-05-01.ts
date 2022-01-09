import { glMatrix, mat4 } from 'gl-matrix'
import { initShaders } from './lib/util'
import { fshader_source, vshader_source } from './shader/05/shader'
import { Point2D, Color, ShaderParamLocation } from './types/type'

// 缓存区合并

function tick(gl: WebGL2RenderingContext, location: ShaderParamLocation) {
  function rotate() {
    gl.clear(gl.COLOR_BUFFER_BIT)
    mat4.rotateZ(matrix, matrix, glMatrix.toRadian(2))
    gl.uniformMatrix4fv(location.uMat, false, matrix)
    gl.drawArrays(gl.LINE_LOOP, 0, 3)
    requestAnimationFrame(rotate)
  }
  const matrix = mat4.create()
  rotate()
}

function initWebGL(gl: WebGL2RenderingContext, location: ShaderParamLocation) {
  if (!gl) {
    throw Error('failed to get rendering context for WebGL')
  }

  const program = initShaders(gl, vshader_source, fshader_source)

  location.aPos = gl.getAttribLocation(program, 'aPos')
  location.aSize = gl.getAttribLocation(program, 'aSize')
  location.aColor = gl.getAttribLocation(program, 'aColor')
  location.uMat = gl.getUniformLocation(program, 'uMat')

  if (location.aPos < 0 || !location.aSize) {
    throw Error('failed to get the storage location')
  }

  gl.clearColor(0.5, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  initVertices(gl, location)
  gl.drawArrays(gl.POINTS, 0, 3)
}

function initVertices(gl: WebGL2RenderingContext, location: ShaderParamLocation) {
  const vertices = new Float32Array([
    -0.5, 0.5, 10.0, 0.0, 1.0, 0.0, 0.5, 0.5, 20.0, 1.0, 0.0, 0.0, 0.0, -0.5, 30.0, 0.0, 0.0, 1.0,
  ])
  const FSIZE = vertices.BYTES_PER_ELEMENT
  const vBuffer = gl.createBuffer()
  if (!vBuffer) {
    throw Error('failed to create buffer')
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  gl.vertexAttribPointer(location.aPos, 2, gl.FLOAT, false, FSIZE * 6, 0)
  gl.vertexAttribPointer(location.aSize, 1, gl.FLOAT, false, FSIZE * 6, FSIZE * 2)
  gl.vertexAttribPointer(location.aColor, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
  gl.enableVertexAttribArray(location.aPos)
  gl.enableVertexAttribArray(location.aSize)
  gl.enableVertexAttribArray(location.aColor)
  gl.uniformMatrix4fv(location.uMat, false, mat4.create())
}

function init() {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement
  const gl = canvas.getContext('webgl2', { antialias: true })
  let location: ShaderParamLocation = {
    aPos: -1,
    uFragColor: 0,
  }
  initWebGL(gl, location)
  tick(gl, location)
}

init()
