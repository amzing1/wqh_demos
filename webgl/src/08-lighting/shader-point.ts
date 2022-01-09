export const vshader_source = `
attribute vec4 aPos;
attribute vec4 aColor;
attribute vec4 aNormal;
uniform mat4 uModelMat;
uniform mat4 uMvpMat;
uniform vec3 uLightColor;
uniform vec3 uAmbientColor;
uniform vec3 uLightPosition;
uniform mat4 uNormalMat;
varying vec4 vColor;
void main() {
    gl_Position = uMvpMat * aPos;
    vec3 normal = normalize(vec3(uNormalMat * aNormal));
    vec4 vertexPosition = uModelMat * aPos;
    vec3 lightDirection = normalize(uLightPosition - vec3(vertexPosition));
    float nDotL = max(dot(lightDirection, normal), 0.0);
    vec3 diffuse = uLightColor * vec3(aColor) * nDotL;
    vec3 ambient = uAmbientColor * aColor.rgb;
    vColor = vec4(diffuse + ambient, aColor.a);
    // vColor = aColor;
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
