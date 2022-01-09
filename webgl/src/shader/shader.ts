export const vshader_source = `
attribute vec4 aPos;
uniform mat4 uMat;
void main() {
    gl_Position = aPos * uMat;
}`

export const fshader_source = `
#ifdef GL_ES
    precision mediump float;
#endif
uniform vec4 uFragColor;
void main() {
    gl_FragColor = uFragColor;
}`
