uniform vec3 uColor;
varying vec2 vUv;
uniform float uProgression;
const float pi = 3.141592654;
uniform vec2 uResolution;

void main() {
  vec2 uvs = vUv - 0.5;
  uvs.x *= uResolution.x / uResolution.y;
  float r = length(uvs * 0.92);
  float theta = atan(uvs.y, uvs.x);
  float spiral = fract(2.5 * theta / pi + 7.0 * pow(r, 0.4) - 4.5 * uProgression);
  float animatedProgression = smoothstep(0.25, 1.0, uProgression);
  float alphaSpiral = step(animatedProgression, spiral);
  float animatedProgressionCircle = smoothstep(0.25, 0.8, uProgression);
  float alphaCircle = step(animatedProgressionCircle, r);
  float alpha = max(alphaSpiral, alphaCircle);

  float animatedProgressionOut = smoothstep(0.5, 1.0, uProgression);
  float alphaCircleOut = step(animatedProgressionOut, r);
  alpha = min(alpha, alphaCircleOut);

  vec3 darkenColor = uColor * 0.2;
  vec3 finalColor = mix(uColor, darkenColor, smoothstep(0.42, 0.8, uProgression));

  gl_FragColor = vec4(finalColor, alpha);
  #include <encodings_fragment>
}
