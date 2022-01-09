export const vshader_source = `
attribute vec4 aPos;
attribute vec2 aSt;
varying vec2 vSt;
void main() {
    gl_Position = aPos;
    vSt = aSt;
}
`

export const fshader_source = `
#ifdef GL_ES
    precision mediump float;
#endif
uniform sampler2D uSampler1;
uniform sampler2D uSampler2;
varying vec2 vSt;
void main() {
    vec4 color0 = texture2D(uSampler1, vSt);
    vec4 color1 = texture2D(uSampler2, vSt);
    gl_FragColor = color0 * color1;
}
`
