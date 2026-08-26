"use client";

import { useEffect, useRef } from "react";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import "./CircularGallery.css";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function CircularGallery({
  items = [],
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
  onSelect,
}) {
  const ref = useRef(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const container = ref.current;
    if (!container || !items.length) return;

    const renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    const camera = new Camera(gl);
    camera.fov = 45;
    camera.position.z = 20;
    const scene = new Transform();
    const geometry = new Plane(gl, { heightSegments: 20, widthSegments: 40 });

    const vertex = `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      uniform float uSpeed;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `;
    const fragment = `
      precision highp float;
      uniform vec2 uImageSizes;
      uniform vec2 uPlaneSizes;
      uniform sampler2D tMap;
      uniform float uBorderRadius;
      varying vec2 vUv;
      float roundedBoxSDF(vec2 p, vec2 b, float r) {
        vec2 d = abs(p) - b;
        return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
      }
      void main() {
        vec2 ratio = vec2(
          min((uPlaneSizes.x / uPlaneSizes.y) / max(uImageSizes.x / uImageSizes.y, 0.001), 1.0),
          min((uPlaneSizes.y / uPlaneSizes.x) / max(uImageSizes.y / uImageSizes.x, 0.001), 1.0)
        );
        vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5);
        vec4 color = texture2D(tMap, uv);
        float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
        float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
        gl_FragColor = vec4(color.rgb, alpha);
      }
    `;

    const gallery = items.concat(items);
    const medias = gallery.map((data, index) => {
      const sourceIndex = index % items.length;
      const texture = new Texture(gl, { generateMipmaps: true });
      const program = new Program(gl, {
        depthTest: false,
        depthWrite: false,
        vertex,
        fragment,
        uniforms: {
          tMap: { value: texture },
          uPlaneSizes: { value: [1, 1] },
          uImageSizes: { value: [1, 1] },
          uSpeed: { value: 0 },
          uTime: { value: Math.random() * 100 },
          uBorderRadius: { value: borderRadius },
        },
        transparent: true,
      });
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = data.image;
      img.onload = () => {
        texture.image = img;
        program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      };
      const plane = new Mesh(gl, { geometry, program });
      plane.setParent(scene);
      return { plane, program, extra: 0, index, sourceIndex };
    });

    const scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    let screen = { width: 1, height: 1 };
    let viewport = { width: 1, height: 1 };
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let dragDistance = 0;
    let raf = 0;

    const layout = () => {
      screen = { width: Math.max(1, container.clientWidth), height: Math.max(1, container.clientHeight) };
      renderer.setSize(screen.width, screen.height);
      camera.perspective({ aspect: screen.width / screen.height });
      const fov = (camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(fov / 2) * camera.position.z;
      viewport = { width: height * camera.aspect, height };
      const scale = screen.height / 1500;
      medias.forEach((media, i) => {
        media.plane.scale.y = (viewport.height * (900 * scale)) / screen.height;
        media.plane.scale.x = (viewport.width * (700 * scale)) / screen.width;
        media.program.uniforms.uPlaneSizes.value = [media.plane.scale.x, media.plane.scale.y];
        media.width = media.plane.scale.x + 2;
        media.widthTotal = media.width * medias.length;
        media.x = media.width * i;
      });
    };

    const onWheel = (e) => {
      e.preventDefault();
      scroll.target += (e.deltaY > 0 ? scrollSpeed : -scrollSpeed) * 0.2;
    };
    const onDown = (e) => {
      isDown = true;
      dragDistance = 0;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startScroll = scroll.current;
    };
    const onMove = (e) => {
      if (!isDown) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      dragDistance += Math.abs(x - startX);
      startX = x;
      scroll.target = startScroll + (startX - x) * (scrollSpeed * 0.025);
    };
    const pickCenterItem = () => {
      if (!onSelectRef.current || !medias.length) return;
      let closest = medias[0];
      let minDist = Infinity;
      medias.forEach((media) => {
        const dist = Math.abs(media.plane.position.x);
        if (dist < minDist) {
          minDist = dist;
          closest = media;
        }
      });
      if (minDist > viewport.width * 0.42) return;
      onSelectRef.current(closest.sourceIndex);
    };
    const onUp = () => {
      if (isDown && dragDistance < 12) pickCenterItem();
      isDown = false;
    };

    const tick = () => {
      scroll.current = lerp(scroll.current, scroll.target, scroll.ease);
      const direction = scroll.current > scroll.last ? "right" : "left";
      medias.forEach((media) => {
        media.plane.position.x = media.x - scroll.current - media.extra;
        const x = media.plane.position.x;
        const H = viewport.width / 2;
        if (bend === 0) {
          media.plane.position.y = 0;
          media.plane.rotation.z = 0;
        } else {
          const B = Math.abs(bend);
          const R = (H * H + B * B) / (2 * B);
          const effectiveX = Math.min(Math.abs(x), H);
          const arc = R - Math.sqrt(Math.max(R * R - effectiveX * effectiveX, 0));
          media.plane.position.y = bend > 0 ? -arc : arc;
          media.plane.rotation.z =
            (bend > 0 ? -Math.sign(x) : Math.sign(x)) * Math.asin(Math.min(effectiveX / R, 1));
        }
        media.program.uniforms.uTime.value += 0.04;
        media.program.uniforms.uSpeed.value = scroll.current - scroll.last;
        const planeOffset = media.plane.scale.x / 2;
        const viewportOffset = viewport.width / 2;
        if (direction === "right" && media.plane.position.x + planeOffset < -viewportOffset) {
          media.extra -= media.widthTotal;
        }
        if (direction === "left" && media.plane.position.x - planeOffset > viewportOffset) {
          media.extra += media.widthTotal;
        }
      });
      renderer.render({ scene, camera });
      scroll.last = scroll.current;
      raf = requestAnimationFrame(tick);
    };

    layout();
    window.addEventListener("resize", layout);
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    container.addEventListener("touchstart", onDown, { passive: true });
    container.addEventListener("touchmove", onMove, { passive: true });
    container.addEventListener("touchend", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", layout);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("mousedown", onDown);
      container.removeEventListener("touchstart", onDown);
      container.removeEventListener("touchmove", onMove);
      container.removeEventListener("touchend", onUp);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
    };
  }, [items, bend, borderRadius, scrollSpeed, scrollEase, textColor, onSelect]);

  return (
    <div
      ref={ref}
      className="circular-gallery"
      tabIndex={0}
      role="region"
      aria-label="Circular image gallery"
    />
  );
}
