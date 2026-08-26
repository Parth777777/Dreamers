"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle, Vec3 } from "ogl";

const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;
uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;
varying vec2 vUv;
#define PI 3.1415926538
const int uCount = 5;

float noise(vec2 uv) {
  return sin(uv.x * 12.9898 + uv.y * 78.233) * 43758.5453;
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= iResolution.x / max(iResolution.y, 1.0);
  vec2 mouse = uMouse * 2.0 - 1.0;
  mouse.x *= iResolution.x / max(iResolution.y, 1.0);
  float line = 0.0;
  for (int i = 0; i < uCount; i++) {
    float fi = float(i);
    float t = iTime * (0.12 + fi * 0.03);
    float y = sin(uv.x * (1.4 + fi * 0.35) + t + fi) * uAmplitude * (0.18 + fi * 0.04);
    y += sin(distance(uv, mouse) * 2.4 - t) * 0.08;
    float d = abs(uv.y + (fi - 2.0) * uDistance - y);
    line += smoothstep(0.018, 0.0, d) * (0.35 + 0.12 * sin(t + fi));
  }
  vec3 color = uColor * line;
  float fade = smoothstep(1.25, 0.15, length(uv * vec2(0.55, 1.0)));
  gl_FragColor = vec4(color * fade, clamp(line * fade, 0.0, 0.9));
}
`;

export default function Threads({
  color = [0.78, 0.06, 0.18],
  amplitude = 1,
  distance = 0.22,
  enableMouseInteraction = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(1, 1, 1) },
        uColor: { value: new Vec3(color[0], color[1], color[2]) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: [0.5, 0.5] },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const mouse = [0.5, 0.5];
    let raf = 0;

    const resize = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      renderer.setSize(w, h);
      program.uniforms.iResolution.value.set(w, h, 1);
    };

    const onMove = (event) => {
      if (!enableMouseInteraction) return;
      const rect = container.getBoundingClientRect();
      mouse[0] = (event.clientX - rect.left) / rect.width;
      mouse[1] = 1 - (event.clientY - rect.top) / rect.height;
    };

    const tick = (t) => {
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.uMouse.value = mouse;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    container.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onMove);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
    };
  }, [amplitude, color, distance, enableMouseInteraction]);

  return <div ref={ref} className="h-full w-full" />;
}
