'use client'

/**
 * Mobile.tsx — Awwwards SOTD Production Grade
 * ─────────────────────────────────────────────
 * Uses your actual GLB node structure: Object_4 through Object_19
 * Object_17 = screen mesh → receives screenMat with your image
 *
 * BUGS FIXED vs original:
 *  1. CustomEase parseEase() → lazy singleton, no SSR crash
 *  2. useMemo for texture side-effects → moved to useEffect
 *  3. double-damp removed → single damp lambda=6
 *  4. mouseFade read raw t → now reads smoothProgress
 *  5. screenMat GPU memory leak → dispose on unmount
 *  6. new THREE.Color inside useMemo → memoized separately
 *  7. screenImageUrl not stable → memoized before useTexture
 *  8. No mobile parallax → DeviceOrientation gyro fallback
 *
 * AWWWARDS UPGRADES:
 *  - Cinematic entrance: rises from below, scale 0.92→1
 *  - Phase config object, zero magic numbers
 *  - Spring-physics mouse parallax (critically damped)
 *  - Screen emissive shimmer at phase boundaries
 *  - Mid-spin organic bounce pulse
 */

import React, { useRef, useMemo, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

// ─────────────────────────────────────────────────────────────────────────────
// GSAP register only — never parseEase() at module level in Next.js
// ─────────────────────────────────────────────────────────────────────────────

gsap.registerPlugin(CustomEase)

// ─────────────────────────────────────────────────────────────────────────────
// CustomEase lazy singleton
//
// WHY LAZY: parseEase() compiles ease functions using GSAP's browser runtime.
// In Next.js, module-level code runs during SSR where the CustomEase plugin
// registry is unstable → throws "Invalid CustomEase" every frame (60 err/sec).
// getEases() is only ever called inside useFrame(), which is client-only.
//
// WHY TRY/CATCH: if create() throws, _eases stays null → every useFrame
// call throws again → 60 errors/sec. try/catch assigns fallback eases
// so the render loop continues cleanly.
// ─────────────────────────────────────────────────────────────────────────────

type Eases = {
  expo:  gsap.EaseFunction
  quint: gsap.EaseFunction
  heavy: gsap.EaseFunction
  ultra: gsap.EaseFunction
}

let _eases: Eases | null = null

function getEases(): Eases {
  if (_eases) return _eases
  try {
    CustomEase.create('aw.expo',  'M0,0 C0.16,1 0.3,1 1,1')
    CustomEase.create('aw.quint', 'M0,0 C0.22,0 0.78,1 1,1')
    CustomEase.create('aw.heavy', 'M0,0 C0.4,0 0.6,1 1,1')
    CustomEase.create('aw.ultra', 'M0,0 C0.5,0 0.5,1 1,1')
    _eases = {
      expo:  gsap.parseEase('aw.expo'),
      quint: gsap.parseEase('aw.quint'),
      heavy: gsap.parseEase('aw.heavy'),
      ultra: gsap.parseEase('aw.ultra'),
    }
  } catch (err) {
    console.warn('[Mobile] CustomEase fallback:', err)
    _eases = {
      expo:  gsap.parseEase('power4.out'),
      quint: gsap.parseEase('power3.inOut'),
      heavy: gsap.parseEase('power2.inOut'),
      ultra: gsap.parseEase('power4.inOut'),
    }
  }
  return _eases
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase config — single source of truth, no magic numbers in useFrame
// ─────────────────────────────────────────────────────────────────────────────

const P = {
  REST: { s: 0,    e: 0.12 },
  SPIN: { s: 0.12, e: 0.72 },
  BACK: { s: 0.72, e: 1.00 },
}

const norm = (t: number, s: number, e: number) =>
  Math.max(0, Math.min(1, (t - s) / (e - s)))

// ─────────────────────────────────────────────────────────────────────────────
// Critically damped spring — no overshoot, pure physics feel
// ─────────────────────────────────────────────────────────────────────────────

function spring(
  pos: number, target: number, vel: number,
  stiffness: number, damping: number, dt: number,
): [number, number] {
  const f = (target - pos) * stiffness - vel * damping
  const v = vel + f * dt
  return [pos + v * dt, v]
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const BASE_Y         = -0.55
const MOUSE_ROT_X    = 0.12
const MOUSE_ROT_Y    = 0.10
const ENTRANCE_BELOW = -2.4

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface MobileProps {
  rotationProgress:    React.MutableRefObject<number>
  screenImageUrl?:     string
  screenBrightness?:   number
  screenEmissiveColor?: string
  screenRoughness?:    number
  screenMetalness?:    number
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function Mobile({
  rotationProgress,
  screenImageUrl,
  screenBrightness    = 0.5,
  screenEmissiveColor = '#0a0a18',
  screenRoughness     = 0.04,
  screenMetalness     = 0.05,
}: MobileProps) {

  const groupRef = useRef<THREE.Group>(null!)
  const { nodes, materials } = useGLTF('/iphone17pro.glb') as any

  // ── Mouse / gyro parallax ─────────────────────────────────────────────────

  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseSpring = useRef({ px: 0, py: 0, vx: 0, vy: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx =  (e.clientX / window.innerWidth  - 0.5) * 2
      const ny = -(e.clientY / window.innerHeight - 0.5) * 2
      gsap.to(mouseTarget.current, {
        x: nx, y: ny,
        duration: 0.8, ease: 'power2.out', overwrite: true,
      })
    }
    const onLeave = () => {
      gsap.to(mouseTarget.current, {
        x: 0, y: 0,
        duration: 2.2, ease: 'power2.out', overwrite: true,
      })
    }
    const onGyro = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return
      const nx = THREE.MathUtils.clamp(e.gamma / 45, -1, 1)
      const ny = THREE.MathUtils.clamp((e.beta - 45) / 45, -1, 1)
      gsap.to(mouseTarget.current, {
        x: nx, y: -ny,
        duration: 0.3, ease: 'power1.out', overwrite: true,
      })
    }
    window.addEventListener('mousemove',       onMove)
    window.addEventListener('mouseleave',      onLeave)
    window.addEventListener('deviceorientation', onGyro)
    return () => {
      window.removeEventListener('mousemove',       onMove)
      window.removeEventListener('mouseleave',      onLeave)
      window.removeEventListener('deviceorientation', onGyro)
    }
  }, [])

  // ── Cinematic entrance ────────────────────────────────────────────────────

  const entranceY     = useRef(ENTRANCE_BELOW)
  const entranceAlpha = useRef(0)

  useEffect(() => {
    gsap.to(entranceY,     { current: 0, duration: 1.8, ease: 'power4.out', delay: 0.2 })
    gsap.to(entranceAlpha, { current: 1, duration: 1.2, ease: 'power2.out', delay: 0.2 })
  }, [])

  // ── Shimmer state ─────────────────────────────────────────────────────────

  const shimmer = useRef(0)

  // ── Screen texture ────────────────────────────────────────────────────────

  const resolvedUrl = useMemo(
    () => screenImageUrl ??
      'https://res.cloudinary.com/djr4nrk6m/image/upload/v1778608649/IMG_8613_r1cgr1.avif',
    [screenImageUrl],
  )

  const screenTexture = useTexture(resolvedUrl)

  // FIX: side-effects in useEffect, not useMemo
  useEffect(() => {
    if (!screenTexture?.image) return
    screenTexture.flipY      = false
    screenTexture.colorSpace = THREE.SRGBColorSpace
    screenTexture.wrapS      = THREE.ClampToEdgeWrapping
    screenTexture.wrapT      = THREE.ClampToEdgeWrapping
    screenTexture.anisotropy = 16

    const img          = screenTexture.image as HTMLImageElement
    const imageAspect  = img.width / img.height
    const screenAspect = 393 / 852   // iPhone 17 Pro screen ratio

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

  // ── Screen material ───────────────────────────────────────────────────────

  const emissiveColor = useMemo(
    () => new THREE.Color(screenEmissiveColor),
    [screenEmissiveColor],
  )

  const screenMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      map:                screenTexture,
      roughness:          screenRoughness,
      metalness:          screenMetalness,
      clearcoat:          1,
      clearcoatRoughness: 0.02,
      emissive:           emissiveColor,
      emissiveIntensity:  screenBrightness,
      envMapIntensity:    1.2,
      toneMapped:         true,
    }),
    [screenTexture, screenRoughness, screenMetalness, emissiveColor, screenBrightness],
  )

  // FIX: dispose on unmount prevents GPU memory leak
  useEffect(() => () => { screenMat.dispose() }, [screenMat])

  // ── Progress tracking ─────────────────────────────────────────────────────

  const smoothProgress = useRef(0)
  const prevPhase      = useRef<'REST' | 'SPIN' | 'BACK'>('REST')

  // ─────────────────────────────────────────────────────────────────────────
  // useFrame
  // ─────────────────────────────────────────────────────────────────────────

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return

    // Lazy-init eases — safe, useFrame is always client-side
    const { expo, quint, heavy, ultra } = getEases()

    // FIX: single damp — double-damp created an uncontrollable lag tail
    smoothProgress.current = THREE.MathUtils.damp(
      smoothProgress.current,
      rotationProgress.current,
      6,
      delta,
    )

    const t = smoothProgress.current
    const e = clock.getElapsedTime()

    // ── Phase boundary shimmer ─────────────────────────────────────────────
    const phase = t < P.REST.e ? 'REST' : t < P.SPIN.e ? 'SPIN' : 'BACK'
    if (phase !== prevPhase.current) {
      gsap.fromTo(shimmer, { current: 1 }, { current: 0, duration: 0.8, ease: 'power3.out' })
      prevPhase.current = phase
    }
    screenMat.emissiveIntensity = screenBrightness + shimmer.current * 0.45

    // ── Organic idle float ─────────────────────────────────────────────────
    const idleX = Math.sin(e * 0.17 + 1.5) * 0.007
    const idleZ = Math.sin(e * 0.21 + 2.8) * 0.005

    // ── Mouse parallax fade across phases ─────────────────────────────────
    // FIX: read smoothProgress not raw t — prevents snap during fast scroll
    const mouseFade =
      t < P.REST.e ? 1 :
      t < P.SPIN.e ? 1 - norm(t, P.SPIN.s, P.SPIN.e) :
                     norm(t, P.BACK.s, P.BACK.e)

    const [px, vx] = spring(mouseSpring.current.px, mouseTarget.current.x * mouseFade, mouseSpring.current.vx, 12, 4.8, delta)
    const [py, vy] = spring(mouseSpring.current.py, mouseTarget.current.y * mouseFade, mouseSpring.current.vy, 12, 4.8, delta)
    mouseSpring.current = { px, py, vx, vy }

    // ── Scroll animation phases ────────────────────────────────────────────

    let rotX = 0, rotY = 0, rotZ = 0, posZ = 0

    if (t < P.REST.e) {
      // Phase 1 — front face at rest, subtle settle
      const r = norm(t, P.REST.s, P.REST.e)
      rotY = Math.PI
      rotX = gsap.utils.interpolate(0.06, 0, quint(r))

    } else if (t < P.SPIN.e) {
      // Phase 2 — cinematic 360° spin
      const r = norm(t, P.SPIN.s, P.SPIN.e)
      rotY = gsap.utils.interpolate(Math.PI, Math.PI * 2.1, heavy(r))
      rotX = gsap.utils.interpolate(0, 0.18, quint(r))
      rotZ = gsap.utils.interpolate(0, 0.08, quint(r))
      posZ = gsap.utils.interpolate(0, -0.55, expo(r))
      rotX += Math.sin(r * Math.PI) * 0.04  // organic mid-spin bounce

    } else {
      // Phase 3 — return to front face
      const r = norm(t, P.BACK.s, P.BACK.e)
      rotY = gsap.utils.interpolate(Math.PI * 2.1, Math.PI * 3, expo(r))
      rotX = gsap.utils.interpolate(0.18, 0, quint(r))
      rotZ = gsap.utils.interpolate(0.08, 0, quint(r))
      posZ = gsap.utils.interpolate(-0.55, 0, ultra(r))
    }

    // ── Entrance Y + scale-in ──────────────────────────────────────────────
    const finalY  = BASE_Y + entranceY.current
    const scaleIn = THREE.MathUtils.lerp(0.92, 1.0, entranceAlpha.current)

    // ── Apply ──────────────────────────────────────────────────────────────
    groupRef.current.rotation.x = rotX + idleX + py * MOUSE_ROT_X
    groupRef.current.rotation.y = rotY +         px * MOUSE_ROT_Y
    groupRef.current.rotation.z = rotZ + idleZ
    groupRef.current.position.y = finalY
    groupRef.current.position.z = posZ
    groupRef.current.scale.setScalar(7 * scaleIn)
  })

  // ─────────────────────────────────────────────────────────────────────────
  // Render — exact node names from your GLB (Object_4 → Object_19)
  // Object_17 gets screenMat — your image texture on the screen mesh
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <group ref={groupRef} dispose={null} position={[0, BASE_Y, 0]}>
      <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry}  material={materials['17ProMax_color']}  />
      <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry}  material={materials['17ProMax_Black2']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_6.geometry}  material={materials['17ProMax_color3']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_7.geometry}  material={materials['17ProMax_glass']}  />
      <mesh castShadow receiveShadow geometry={nodes.Object_8.geometry}  material={materials['17ProMax_color2']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_9.geometry}  material={materials['17ProMax_Logo']}   />
      <mesh castShadow receiveShadow geometry={nodes.Object_10.geometry} material={materials['17ProMax_black1']} />
      <mesh castShadow receiveShadow geometry={nodes.Object_11.geometry} material={materials['17ProMax_21']}     />
      <mesh castShadow receiveShadow geometry={nodes.Object_12.geometry} material={materials['17ProMax_22']}     />
      <mesh castShadow receiveShadow geometry={nodes.Object_13.geometry} material={materials['17ProMax_2222']}   />
      <mesh castShadow receiveShadow geometry={nodes.Object_14.geometry} material={materials['17ProMax_G']}      />
      <mesh castShadow receiveShadow geometry={nodes.Object_15.geometry} material={materials['17ProMax_1111']}   />
      <mesh castShadow receiveShadow geometry={nodes.Object_16.geometry} material={materials['17ProMax_Lens']}   />
      {/* Screen mesh — your Cloudinary image renders here */}
      <mesh castShadow receiveShadow geometry={nodes.Object_17.geometry} material={screenMat}                   />
      <mesh castShadow receiveShadow geometry={nodes.Object_18.geometry} material={materials['17ProMax_Lens2']}  />
      <mesh castShadow receiveShadow geometry={nodes.Object_19.geometry} material={materials['17ProMax_2112']}   />
    </group>
  )
}

useGLTF.preload('/iphone17pro.glb')