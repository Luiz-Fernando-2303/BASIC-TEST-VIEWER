import * as THREE from "three";

/**
 * @constructor
 * @param {number} progress - O progresso entre 0 e 1.
 * @param {object} colors - Um objeto contendo as cores iniciais e finais.
 */
class ProgressMaterial {
  constructor(progress, colors = { start: [1, 0, 0], end: [0, 1, 0] }) {
    this.uniforms = { uProgress: { value: progress * 2 - 0.5 } };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
                        varying vec3 vPosition;
                        void main() {
                            vPosition = position;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
      fragmentShader: `
                        varying vec3 vPosition;
                        uniform float uProgress;
                        void main() {
                            float mask = step(vPosition.y + 0.5, uProgress); // Define uma borda reta sem desfoque
                            vec3 color = mix(vec3(${colors.start.join(
                              ", "
                            )}), vec3(${colors.end.join(", ")}), mask);
                            gl_FragColor = vec4(color, 1.0);
                        }
                    `,
    });
    return this.material;
  }
}

export { ProgressMaterial };
