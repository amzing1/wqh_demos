import { glMatrix, mat4, vec3 } from 'gl-matrix'
import { initShaders } from './lib/util'
import { fshader_source, vshader_source } from './shader/shader'
import { Point2D, ShaderParamLocation } from './types/type'

function rotateTriangle(gl: WebGL2RenderingContext, location: ShaderParamLocation) {
  function tick() {
    mat4.rotateZ(matrix, matrix, glMatrix.toRadian(angle))
    gl.uniformMatrix4fv(location.uMat, false, matrix)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    requestAnimationFrame(tick)
  }
  const angle = 2
  const matrix = mat4.create()
  tick()
}

function initVertexBuffers(gl: WebGL2RenderingContext, location: ShaderParamLocation) {
  const vertices = new Float32Array([-0.5, -0.5, 0, 0.5, 0.5, -0.5])

  const vertexBuffer = gl.createBuffer()
  if (!vertexBuffer) {
    throw Error('failed to create the buffer object')
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  gl.vertexAttribPointer(location.aPos, 2, gl.FLOAT, false, 0, 0)

  gl.enableVertexAttribArray(location.aPos)

  return 3
}

function initWebGL(gl: WebGL2RenderingContext, location: ShaderParamLocation) {
  if (!gl) {
    throw Error('failed to get rendering context for WebGL')
  }

  const program = initShaders(gl, vshader_source, fshader_source)

  location.aPos = gl.getAttribLocation(program, 'aPos')
  // location.uTrans = gl.getUniformLocation(program, 'uTrans')
  location.uFragColor = gl.getUniformLocation(program, 'uFragColor')
  location.uMat = gl.getUniformLocation(program, 'uMat')

  if (location.aPos < 0 || !location.uFragColor) {
    throw Error('failed to get the storage location')
  }

  const n = initVertexBuffers(gl, location)

  gl.uniform4f(location.uFragColor, 1, 0, 0, 1)
  gl.uniformMatrix4fv(location.uMat, false, mat4.create())

  gl.clearColor(0.5, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
}

function init() {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement
  const gl = canvas.getContext('webgl2', { antialias: true })
  const gPoints: Point2D[] = []
  let location: ShaderParamLocation = {
    aPos: -1,
    uMat: -1,
    uFragColor: 0,
  }
  initWebGL(gl, location)
  rotateTriangle(gl, location)
}

init()
