import { mat4 } from 'gl-matrix'
import { initShaders } from './lib/util'
import { fshader_source, vshader_source } from './shader/shader'
import { Point2D, ShaderParamLocation } from './types/type'

// 使用缓冲区对象向顶点着色器传入多个顶点的数据，需要遵循以下5个步骤
// 1. 创建缓冲区对象 gl.createBuffer()
// 2. 绑定缓冲区对象 gl.bindBuffer()
// 3. 将数据写入缓冲区对象 gl.bufferData()
// 4. 将缓冲区对象分配给一个attribute对象 gl.vertexAttribPointer()
// 5. 开启attribute变量 gl.enableVertexAttribArray()

function initEvent(gl: WebGL2RenderingContext, location: ShaderParamLocation) {
  function handleKeyEvent(e: KeyboardEvent) {
    let angle = 0
    switch (e.key) {
      case 'ArrowUp':
        angle = 0
        break
      case 'ArrowDown':
        angle = 120
        break
      case 'ArrowLeft':
        angle = 90
        break
      case 'ArrowRight':
        angle = -90
        break
      default:
        angle = 0
        break
    }
    const radian = (Math.PI * angle) / 180
    const cosB = Math.cos(radian)
    const sinB = Math.sin(radian)
    const matrix = new Float32Array([
      cosB,
      sinB,
      0.0,
      0.0,
      -sinB,
      cosB,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ])
    gl.uniformMatrix4fv(location.uMat, false, matrix)

    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
  document.addEventListener('keydown', handleKeyEvent)
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

  gl.uniform4f(location.uFragColor, 1, 0, 0, 1)
  gl.uniformMatrix4fv(location.uMat, false, mat4.create())

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
  initEvent(gl, location)
}

init()
