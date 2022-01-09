export const vshader_source = `
attribute vec4 aPos;
attribute vec4 aColor;
uniform mat4 uViewMat;
uniform mat4 uModelMat;
uniform mat4 uProjMat;
varying vec4 vColor;
void main() {
    gl_Position = uProjMat * uViewMat * uModelMat  * aPos;
    vColor = aColor;
}
`

export const fshader_source = `
#ifdef GL_ES
    precision mediump float;
#endif
varying vec4 vColor;
void main() {
    gl_FragColor = vColor;
}
`
