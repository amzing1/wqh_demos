export const vshader_source = `
attribute vec4 aPos;
attribute vec4 aColor;
attribute vec4 aNormal;
uniform mat4 uModelMat;
uniform mat4 uMvpMat;
uniform mat4 uNormalMat;
varying vec4 vColor;
varying vec3 vNormal;
varying vec3 vPos;
void main() {
    gl_Position = uMvpMat * aPos;
    vPos = vec3(uModelMat * aPos);
    vNormal = normalize(vec3(uNormalMat * aNormal));
    vColor = aColor;
}
`

export const fshader_source = `
#ifdef GL_ES
    precision mediump float;
#endif
uniform vec3 uLightColor;
uniform vec3 uAmbientColor;
uniform vec3 uLightPosition;
varying vec4 vColor;
varying vec3 vNormal;
varying vec3 vPos;
void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDirection = normalize(uLightPosition - vPos);
    float nDotL = max(dot(lightDirection, normal), 0.0);
    vec3 diffuse = uLightColor * vColor.rgb * nDotL;
    vec3 ambient = uAmbientColor * vColor.rgb;
    gl_FragColor = vec4(diffuse + ambient, vColor.a);
}
`
