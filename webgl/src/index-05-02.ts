import { glMatrix, mat4 } from 'gl-matrix'
import { initShaders } from './lib/util'
import { fshader_source, vshader_source } from './shader/05/shader-2'
import { Point2D, Color, ShaderParamLocation } from './types/type'
import sky from './resources/sky.jpg'
import circle from './resources/circle.gif'

// 在WebGL中，要进行纹理映射，需要遵循以下四步：
// 准备好映射到几何图形上的纹理图像
// 为集合图形配置纹理映射方式
// 加载纹理图像，对其进行一些配置，以在WebGL中使用它
// 在片元着色器中将相应的文素从纹理中抽取出来，并将纹素的颜色赋给片元

function initWebGL(gl: WebGL2RenderingContext, location: ShaderParamLocation) {
  if (!gl) {
    throw Error('failed to get rendering context for WebGL')
  }

  const program = initShaders(gl, vshader_source, fshader_source)

  location.aPos = gl.getAttribLocation(program, 'aPos')
  location.aSt = gl.getAttribLocation(program, 'aSt')
  location.uSampler = gl.getUniformLocation(program, 'uSampler1')
  location.uSampler2 = gl.getUniformLocation(program, 'uSampler2')

  if (location.aPos < 0 || location.aSt < 0 || !location.uSampler || !location.uSampler2) {
    throw Error('failed to get the storage location')
  }

  gl.clearColor(0.5, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  initVertices(gl, location)
  initTextures(gl, location)
}

function initVertices(gl: WebGL2RenderingContext, location: ShaderParamLocation) {
  const vertices = new Float32Array([
    -0.5, 0.5, 0.0, 1.0, -0.5, -0.5, 0.0, 0.0, 0.5, 0.5, 1.0, 1.0, 0.5, -0.5, 1.0, 0.0,
  ])
  const FSIZE = vertices.BYTES_PER_ELEMENT
  const vBuffer = gl.createBuffer()
  if (!vBuffer) {
    throw Error('failed to create buffer')
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  gl.vertexAttribPointer(location.aPos, 2, gl.FLOAT, false, FSIZE * 4, 0)
  gl.vertexAttribPointer(location.aSt, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)

  gl.enableVertexAttribArray(location.aPos)
  gl.enableVertexAttribArray(location.aSt)
}

function initTextures(gl: WebGL2RenderingContext, location: ShaderParamLocation) {
  function loadTexture(unit: number, texture: WebGLTexture, img: HTMLImageElement, samplerLoc: WebGLUniformLocation) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    switch (unit) {
      case 0:
        imgOk0 = true
        gl.activeTexture(gl.TEXTURE0)
        break
      case 1:
        imgOk1 = true
        gl.activeTexture(gl.TEXTURE1)
        break
    }
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
    gl.uniform1i(samplerLoc, unit)
    if (imgOk0 && imgOk1) {
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
  }

  const texture0 = gl.createTexture()
  const texture1 = gl.createTexture()
  const img0 = new Image()
  const img1 = new Image()
  img0.onload = function () {
    loadTexture(0, texture0, img0, location.uSampler)
  }
  img1.onload = function () {
    loadTexture(1, texture1, img1, location.uSampler2)
  }
  img0.src = sky
  img1.src = circle
  let imgOk0 = false
  let imgOk1 = false
}

function init() {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement
  const gl = canvas.getContext('webgl2', { antialias: true })
  const location: ShaderParamLocation = {
    aPos: -1,
    uFragColor: 0,
  }
  initWebGL(gl, location)
}

init()
