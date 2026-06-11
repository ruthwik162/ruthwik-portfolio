'use client'

/**
 * Mobile.tsx — Awwwards SOTD Optimized for Speed
 * ─────────────────────────────────────────────
 * Lightweight animations + faster GLB loading
 * Uses your actual GLB node structure: Object_4 through Object_19
 * Object_17 = screen mesh → receives screenMat with your image
 *
 * ANIMATION STYLE: Light & Smooth (Awwwards-quality but lightweight)
 *  - Entrance: quick rise, subtle scale, smooth ease
 *  - Idle float: minimal breathing, small amplitude
 *  - Mouse parallax: lightly damped spring, smooth drag
 */

import React, { useRef, useMemo, useEffect } from 'react'
import { useGLTF, useTexture, Preload } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
// Lighter constants for faster animations
// ─────────────────────────────────────────────────────────────────────────────

const P = {
  REST: { s: 0, e: 0.12 },
  SPIN: { s: 0.12, e: 0.72 },
  BACK: { s: 0.72, e: 1.00 },
}

const norm = (t: number, s: number, e: number) =>
  Math.max(0, Math.min(1, (t - s) / (e - s)))

// Light spring: faster response, less overshoot
function spring(
  pos: number, target: number, vel: number,
  stiffness: number, damping: number, dt: number,
): [number, number] {
  const f = (target - pos) * stiffness - vel * damping
  const v = vel + f * dt
  return [pos + v * dt, v]
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants — LIGHTER for faster feel
// ─────────────────────────────────────────────────────────────────────────────

const BASE_Y = -0.55

// LIGHT MOUSE: tighter influence for snappier response
const MOUSE_ROT_X = 0.08
const MOUSE_ROT_Y = 0.06

// LIGHT ENTRANCE: start closer, quicker rise
const ENTRANCE_BELOW = -1.2

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface MobileProps {
  rotationProgress: React.MutableRefObject<number>
  screenImageUrl?: string
  screenBrightness?: number
  screenEmissiveColor?: string
  screenRoughness?: number
  screenMetalness?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function Mobile({
  rotationProgress,
  screenImageUrl,
  screenBrightness = 0.5,
  screenEmissiveColor = '#0a0a18',
  screenRoughness = 0.04,
  screenMetalness = 0.05,
}: MobileProps) {

  const groupRef = useRef<THREE.Group>(null!)

  const { nodes, materials } = useGLTF('/iphone17pro.glb') as any

  // ── Mouse / gyro parallax — LIGHTER ───────────────────────────────────────

  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseSpring = useRef({ px: 0, py: 0, vx: 0, vy: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = -(e.clientY / window.innerHeight - 0.5) * 2
      // LIGHT: instant response (no GSAP tween)
      mouseTarget.current = { x: nx, y: ny }
    }
    const onLeave = () => {
      mouseTarget.current = { x: 0, y: 0 }
    }
    const onGyro = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return
      const nx = THREE.MathUtils.clamp(e.gamma / 45, -1, 1)
      const ny = THREE.MathUtils.clamp((e.beta - 45) / 45, -1, 1)
      mouseTarget.current = { x: nx, y: -ny }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('deviceorientation', onGyro)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('deviceorientation', onGyro)
    }
  }, [])

  // ── LIGHT ENTRANCE — quicker rise ─────────────────────────────────────────

  const entranceY = useRef(ENTRANCE_BELOW)
  const entranceAlpha = useRef(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 800
    const delay = 100

    const animate = () => {
      const elapsed = performance.now() - start
      if (elapsed < delay) return

      const progress = Math.min(1, (elapsed - delay) / duration)
      const eased = 1 - Math.pow(1 - progress, 2)

      entranceY.current = ENTRANCE_BELOW * (1 - eased)
      entranceAlpha.current = eased

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [])

  const shimmer = useRef(0)

  // ── Screen texture — OPTIMIZED ────────────────────────────────────────────

  const resolvedUrl = useMemo(
    () => screenImageUrl ??
      'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif',
    [screenImageUrl],
  )

  const screenTexture = useTexture(resolvedUrl)

  useEffect(() => {
    if (!screenTexture?.image) return
    screenTexture.flipY = false
    screenTexture.colorSpace = THREE.SRGBColorSpace
    screenTexture.wrapS = THREE.ClampToEdgeWrapping
    screenTexture.wrapT = THREE.ClampToEdgeWrapping
    // OPTIMIZATION: Lower anisotropy (8 vs 16)
    screenTexture.anisotropy = 8

    const img = screenTexture.image as HTMLImageElement
    const imageAspect = img.width / img.height
    const screenAspect = 393 / 852

    if (imageAspect > screenAspect) {
      screenTexture.repeat.x = screenAspect / imageAspect
      screenTexture.repeat.y = 1
      screenTexture.offset.x = (1 - screenTexture.repeat.x) * 0.5
      screenTexture.offset.y = 0
    } else {
      screenTexture.repeat.x = 1
      screenTexture.repeat.y = imageAspect / screenAspect
      screenTexture.offset.x = 0
      screenTexture.offset.y = (1 - screenTexture.repeat.y) * 0.5
    }
    screenTexture.needsUpdate = true
  }, [screenTexture])

  // ── Screen material — OPTIMIZED ───────────────────────────────────────────

  const emissiveColor = useMemo(
    () => new THREE.Color(screenEmissiveColor),
    [screenEmissiveColor],
  )

  const screenMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      map: screenTexture,
      roughness: screenRoughness,
      metalness: screenMetalness,
      clearcoat: 0.8,
      clearcoatRoughness: 0.05,
      emissive: emissiveColor,
      emissiveIntensity: screenBrightness,
      envMapIntensity: 0.8,
      toneMapped: true,
    }),
    [screenTexture, screenRoughness, screenMetalness, emissiveColor, screenBrightness],
  )

  useEffect(() => () => { screenMat.dispose() }, [screenMat])

  const smoothProgress = useRef(0)
  const prevPhase = useRef<'REST' | 'SPIN' | 'BACK'>('REST')

  // ─────────────────────────────────────────────────────────────────────────
  // useFrame — LIGHTER animations
  // ─────────────────────────────────────────────────────────────────────────

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return

    smoothProgress.current = THREE.MathUtils.damp(
      smoothProgress.current,
      rotationProgress.current,
      10,
      delta,
    )

    const t = smoothProgress.current
    const e = clock.getElapsedTime()

    const phase = t < P.REST.e ? 'REST' : t < P.SPIN.e ? 'SPIN' : 'BACK'
    if (phase !== prevPhase.current) {
      shimmer.current = 1
      prevPhase.current = phase
    }
    shimmer.current *= 0.88
    screenMat.emissiveIntensity = screenBrightness + shimmer.current * 0.35

    const idleX = Math.sin(e * 0.18 + 1.5) * 0.004
    const idleZ = Math.sin(e * 0.22 + 2.8) * 0.003

    const mouseFade =
      t < P.REST.e ? 1 :
        t < P.SPIN.e ? 0.25 :
          norm(t, P.BACK.s, P.BACK.e)

    const [px, vx] = spring(
      mouseSpring.current.px,
      mouseTarget.current.x * mouseFade,
      mouseSpring.current.vx,
      14,
      9,
      delta
    )
    const [py, vy] = spring(
      mouseSpring.current.py,
      mouseTarget.current.y * mouseFade,
      mouseSpring.current.vy,
      14,
      9,
      delta
    )
    mouseSpring.current = { px, py, vx, vy }

    let rotX = 0
    let rotY = 0
    let rotZ = 0
    let posZ = 0

    if (t < P.REST.e) {
      const r = norm(t, P.REST.s, P.REST.e)
      const k = 1 - Math.pow(1 - r, 3)
      rotY = Math.PI
      rotX = 0.08 * (1 - k)
      rotZ = -0.02 * (1 - k)
      posZ = 0
    } else if (t < P.SPIN.e) {
      const r = norm(t, P.SPIN.s, P.SPIN.e)

      const hold = r < 0.08 ? 0 : norm(r, 0.08, 1)
      const accel = 1 - Math.pow(1 - hold, 4)

      rotY = Math.PI + accel * Math.PI * 2.05
      rotX = THREE.MathUtils.lerp(0.02, 0.16, accel) + Math.sin(accel * Math.PI) * 0.03
      rotZ = THREE.MathUtils.lerp(0.00, 0.06, accel)
      posZ = THREE.MathUtils.lerp(0, -0.42, accel)
    } else {
      const r = norm(t, P.BACK.s, P.BACK.e)
      const settle = 1 - Math.pow(1 - r, 3)

      rotY = Math.PI * 3.05 + settle * 0.18
      rotX = THREE.MathUtils.lerp(0.16, 0, settle)
      rotZ = THREE.MathUtils.lerp(0.06, 0, settle)
      posZ = THREE.MathUtils.lerp(-0.42, 0, settle)
    }

    const finalY = BASE_Y + entranceY.current
    const scaleIn = 0.92 + entranceAlpha.current * 0.08

    groupRef.current.rotation.x = rotX + idleX + py * MOUSE_ROT_X
    groupRef.current.rotation.y = rotY + px * MOUSE_ROT_Y
    groupRef.current.rotation.z = rotZ + idleZ
    groupRef.current.position.y = finalY
    groupRef.current.position.z = posZ
    groupRef.current.scale.setScalar(7 * scaleIn)
  })

  // ─────────────────────────────────────────────────────────────────────────
  // Render — OPTIMIZED with Preload
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <group ref={groupRef} dispose={null} position={[0, BASE_Y, 0]}>
      <Preload all />
      <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials['17ProMax_color']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} material={materials['17ProMax_Black2']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_6.geometry} material={materials['17ProMax_color3']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_7.geometry} material={materials['17ProMax_glass']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_8.geometry} material={materials['17ProMax_color2']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_9.geometry} material={materials['17ProMax_Logo']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_10.geometry} material={materials['17ProMax_black1']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_11.geometry} material={materials['17ProMax_21']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_12.geometry} material={materials['17ProMax_22']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_13.geometry} material={materials['17ProMax_2222']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_14.geometry} material={materials['17ProMax_G']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_15.geometry} material={materials['17ProMax_1111']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_16.geometry} material={materials['17ProMax_Lens']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_17.geometry} material={screenMat} />
      <mesh castShadow receiveShadow geometry={nodes.Object_18.geometry} material={materials['17ProMax_Lens2']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_19.geometry} material={materials['17ProMax_2112']} />
    </group>
  )
}

useGLTF.preload('/iphone17pro.glb')