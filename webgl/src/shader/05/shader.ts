export const vshader_source = `
attribute vec4 aPos;
attribute float aSize;
attribute vec4 aColor;
uniform mat4 uMat;
varying vec4 vColor;
void main() {
    gl_Position = aPos * uMat;
    gl_PointSize = aSize;
    vColor = aColor;
}`

export const fshader_source = `
#ifdef GL_ES
    precision mediump float;
#endif
varying vec4 vColor;
void main() {
    gl_FragColor = vColor;
}`
