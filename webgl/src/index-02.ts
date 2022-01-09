import { initShaders } from './lib/util'
import { fshader_source, vshader_source } from './shader/shader'
import { Point2D, Color, ShaderParamLocation } from './types/type'

function initEvent(
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext,
  gPoints: Point2D[],
  location: ShaderParamLocation
) {
  function handleClick(e: MouseEvent) {
    const { clientX, clientY } = e
    const rect = canvas.getBoundingClientRect()
    const x = (clientX - rect.left - canvas.width / 2) / (canvas.width / 2)
    const y = (canvas.height / 2 - (clientY - rect.top)) / (canvas.height / 2)
    const color: Color = {
      r: x < 0 ? 1.0 : 0.0,
      g: y < 0 ? 1.0 : 0.0,
      b: 1.0,
      a: 1.0,
    }
    gPoints.push({ x, y, color })

    gl.clear(gl.COLOR_BUFFER_BIT)

    gPoints.forEach((point) => {
      const { r, g, b, a } = point.color
      gl.vertexAttrib3f(location.aPos, point.x, point.y, 0.0)
      gl.uniform4f(location.uFragColor, r, g, b, a)
      gl.drawArrays(gl.POINTS, 0, 1)
    })
  }

  canvas.addEventListener('click', (e) => handleClick(e))
}

function initWebGL(gl: WebGL2RenderingContext, location: ShaderParamLocation) {
  if (!gl) {
    throw Error('failed to get rendering context for WebGL')
  }

  const program = initShaders(gl, vshader_source, fshader_source)

  location.aPos = gl.getAttribLocation(program, 'aPos')
  location.uFragColor = gl.getUniformLocation(program, 'uFragColor')

  if (location.aPos < 0 || !location.uFragColor) {
    throw Error('failed to get the storage location')
  }

  gl.clearColor(0.5, 0.5, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
}

function init() {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement
  const gl = canvas.getContext('webgl2', { antialias: true })
  const gPoints: Point2D[] = []
  let location: ShaderParamLocation = {
    aPos: -1,
    uFragColor: 0,
  }
  initWebGL(gl, location)
  initEvent(canvas, gl, gPoints, location)
}

init()
