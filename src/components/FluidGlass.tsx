"use client";

/* eslint-disable react/no-unknown-property */
import { memo, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { Image, MeshTransmissionMaterial, Text, useFBO, useGLTF } from "@react-three/drei";
import { easing } from "maath";

type Mode = "lens" | "bar" | "cube";

type FluidGlassProps = {
  mode?: Mode;
  lensProps?: Record<string, unknown>;
  barProps?: Record<string, unknown>;
  cubeProps?: Record<string, unknown>;
};

export default function FluidGlass({
  mode = "lens",
  lensProps = {},
  barProps = {},
  cubeProps = {},
}: FluidGlassProps) {
  const Wrapper = mode === "bar" ? Bar : mode === "cube" ? Cube : Lens;
  const rawOverrides = mode === "bar" ? barProps : mode === "cube" ? cubeProps : lensProps;
  const { navItems, ...modeProps } = rawOverrides as {
    navItems?: { label: string; link: string }[];
  } & Record<string, unknown>;

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }} className="h-full w-full">
      <Suspense fallback={null}>
        {mode === "bar" && navItems ? <NavItems items={navItems} /> : null}
        <Wrapper modeProps={modeProps}>
          <Typography />
          <Images />
        </Wrapper>
      </Suspense>
    </Canvas>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}: {
  children: React.ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: Record<string, unknown>;
} & Record<string, unknown>) {
  const ref = useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF(glb) as unknown as { nodes: Record<string, THREE.Mesh> };
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(2);
  const geometry = nodes[geometryKey]?.geometry;

  useEffect(() => {
    if (!geometry) return;
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    geoWidthRef.current = box ? box.max.x - box.min.x || 1 : 1;
  }, [geometry]);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
    easing.damp3(mesh.position, [destX, destY, 15], 0.15, delta);

    if (modeProps.scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      mesh.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x120608, 1);
  });

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps as {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
  } & Record<string, unknown>;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={geometry}
        {...props}
      >
        {!geometry ? <cylinderGeometry args={[1, 1, 0.22, 64]} /> : null}
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({
  modeProps,
  children,
  ...p
}: {
  modeProps: Record<string, unknown>;
  children?: React.ReactNode;
}) {
  return (
    <ModeWrapper
      glb="/assets/3d/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
      {...p}
    >
      {children}
    </ModeWrapper>
  );
}

function Cube({
  modeProps,
  children,
  ...p
}: {
  modeProps: Record<string, unknown>;
  children?: React.ReactNode;
}) {
  return (
    <ModeWrapper
      glb="/assets/3d/cube.glb"
      geometryKey="Cube"
      followPointer
      modeProps={modeProps}
      {...p}
    >
      {children}
    </ModeWrapper>
  );
}

function Bar({
  modeProps = {},
  children,
  ...p
}: {
  modeProps?: Record<string, unknown>;
  children?: React.ReactNode;
}) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: "#ffffff",
    attenuationColor: "#ffffff",
    attenuationDistance: 0.25,
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    >
      {children}
    </ModeWrapper>
  );
}

function NavItems({ items }: { items: { label: string; link: string }[] }) {
  const group = useRef<THREE.Group>(null);
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.035 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.035 },
  };
  const getDevice = (): "mobile" | "tablet" | "desktop" => {
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max ? "mobile" : w <= DEVICE.tablet.max ? "tablet" : "desktop";
  };

  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);
    group.current.children.forEach((child, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          renderOrder={10}
          onClick={(e) => {
            e.stopPropagation();
            if (!link) return;
            if (link.startsWith("#")) window.location.hash = link;
            else window.location.href = link;
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function Images() {
  const group = useRef<THREE.Group>(null);
  const { height } = useThree((s) => s.viewport);

  return (
    <group ref={group}>
      <Image position={[-2, 0, 0]} scale={[3, height / 1.1]} url="/work/lti-seo/slide-01.jpg" />
      <Image position={[2, 0, 3]} scale={3} url="/work/omnigel/slide-01.jpg" />
      <Image position={[-2.05, -height * 0.15, 6]} scale={[1, 3]} url="/work/lti-seo/slide-02.jpg" />
      <Image position={[-0.6, -height * 0.12, 9]} scale={[1, 2]} url="/work/mastertrust/02.png" />
      <Image position={[0.75, -height * 0.1, 10.5]} scale={1.5} url="/work/lti-seo/slide-03.jpg" />
    </group>
  );
}

function Typography() {
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= 639 ? "mobile" : w <= 1023 ? "tablet" : "desktop";
  };
  const DEVICE = { mobile: 0.2, tablet: 0.4, desktop: 0.55 };
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Text
      position={[0, 0, 12]}
      fontSize={DEVICE[device]}
      letterSpacing={-0.05}
      outlineWidth={0}
      outlineBlur="20%"
      outlineColor="#000"
      outlineOpacity={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      Dreamers
    </Text>
  );
}

useGLTF.preload("/assets/3d/lens.glb");

