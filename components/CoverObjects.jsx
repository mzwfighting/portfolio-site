'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import fontData from '../lib/fonts/source-han-sans-cover.typeface.json';

let physicsReady;
const loadPhysics = () => physicsReady ??= import('@dimforge/rapier3d-compat').then(async ({ default: rapier }) => {
  await rapier.init();
  return rapier;
});

export function CoverObjects() {
  const host = useRef(null);
  const gyro = useRef(false);
  const [showGyro, setShowGyro] = useState(false);

  const enableGyro = async () => {
    const request = DeviceOrientationEvent.requestPermission;
    if (request && await request.call(DeviceOrientationEvent) !== 'granted') return;
    gyro.current = true;
    setShowGyro(false);
  };

  useEffect(() => {
    const el = host.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let dispose;

    async function start() {
      const RAPIER = await loadPhysics();
      if (cancelled) return;
      const canvas = document.createElement('canvas');
      if (!canvas.getContext('webgl2', { alpha: true, antialias: true })) return;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      el.appendChild(canvas);
      const scene = new THREE.Scene();
      const baseFov = 17.5;
      const camera = new THREE.PerspectiveCamera(baseFov, 1, .1, 100);
      camera.position.set(0, 0, 15);
      const group = new THREE.Group();
      scene.add(group);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const environment = pmrem.fromScene(room, .04);
      scene.environment = environment.texture;
      room.dispose();
      pmrem.dispose();
      scene.add(new THREE.AmbientLight(0xffffff, .5));
      const light = new THREE.DirectionalLight(0xffffff, 4);
      light.position.set(4, 6, 8);
      scene.add(light);
      const rim = new THREE.DirectionalLight(0xffffff, 3);
      rim.position.set(-5, 2, -4);
      scene.add(rim);
      const world = new RAPIER.World({ x: 0, y: 0, z: 0 });
      const font = new FontLoader().parse(fontData);
      const geometries = new Map();
      const materials = [0x111111, 0xffffff, 0x111111, 0xffffff].map((color, i) =>
        new THREE.MeshPhysicalMaterial({ color, roughness: i < 2 ? .1 : .75, metalness: .2, clearcoat: .4 })
      );
      const mobile = el.clientWidth < 640;
      setShowGyro(mobile && typeof DeviceOrientationEvent !== 'undefined');
      const scale = mobile ? .62 : 1;
      const bodies = [...'PORTFOLIO'].map((letter, i) => {
        if (!geometries.has(letter)) {
          const geometry = new TextGeometry(letter, {
            font, size: 1.25, depth: .3, curveSegments: 16,
            bevelEnabled: true, bevelThickness: .065, bevelSize: .045, bevelSegments: 4
          });
          geometry.center();
          geometries.set(letter, geometry);
        }
        const mesh = new THREE.Mesh(geometries.get(letter), materials[i % materials.length]);
        mesh.name = letter;
        mesh.scale.setScalar(scale);
        group.add(mesh);
        const angle = i / 9 * Math.PI * 2;
        const body = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic()
          .setTranslation(Math.cos(angle) * (mobile ? 1.8 : 4), Math.sin(angle) * 3, (i % 3 - 1) * 2)
          .setLinearDamping(4).setAngularDamping(1));
        world.createCollider(RAPIER.ColliderDesc.cuboid(.635 * scale, .635 * scale, .635 * scale).setFriction(.1), body);
        body.setAngvel({ x: .2 * Math.sin(i), y: .25 * Math.cos(i), z: .1 }, true);
        return { mesh, body };
      });
      const pointerBody = world.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(20, 20, 0));
      world.createCollider(RAPIER.ColliderDesc.ball(1), pointerBody);
      const cover = el.parentElement;
      const controls = new OrbitControls(camera, cover);
      controls.enablePan = controls.enableZoom = false;
      controls.enableDamping = true;
      controls.dampingFactor = .5;
      controls.rotateSpeed = .1;
      controls.minPolarAngle = controls.maxPolarAngle = Math.PI / 2;
      const guardControls = event => { controls.enabled = !event.target.closest('a, button'); };
      cover.addEventListener('pointerdown', guardControls, true);
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const point = new THREE.Vector3();
      let pointerInside = false;
      let revealed = false;
      let downX = 0, downY = 0;
      let orientationOrigin;
      const tilt = { x: 0, y: 0 };
      const orientation = event => {
        if (!gyro.current || event.beta == null || event.gamma == null) return;
        orientationOrigin ??= { beta: event.beta, gamma: event.gamma };
        tilt.x = (event.beta - orientationOrigin.beta) * Math.PI / 360;
        tilt.y = -(event.gamma - orientationOrigin.gamma) * Math.PI / 360;
      };
      window.addEventListener('deviceorientation', orientation);
      const isInCover = event => {
        const rect = el.getBoundingClientRect();
        return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      };
      const move = event => {
        if (!isInCover(event)) { pointerInside = false; return; }
        const rect = el.getBoundingClientRect();
        pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2);
        pointerInside = true;
      };
      const leave = () => { pointerInside = false; };
      const down = event => { if (!isInCover(event)) return; downX = event.clientX; downY = event.clientY; move(event); };
      const click = event => {
        if (!isInCover(event) || event.target.closest('a, button') || Math.hypot(event.clientX - downX, event.clientY - downY) > 6) return;
        revealed = !revealed;
        el.dataset.state = revealed ? 'revealed' : 'floating';
      };
      cover.addEventListener('pointermove', move);
      cover.addEventListener('pointerdown', down);
      cover.addEventListener('pointerleave', leave);
      cover.addEventListener('click', click);
      const intro = cover.nextElementSibling;
      const updateScrollOpacity = () => {
        const progress = THREE.MathUtils.clamp(window.scrollY / window.innerHeight, 0, 1);
        el.style.opacity = String(1 - progress * .6);
      };
      window.addEventListener('scroll', updateScrollOpacity, { passive: true });
      updateScrollOpacity();
      intro?.addEventListener('pointermove', move);
      intro?.addEventListener('pointerdown', down);
      intro?.addEventListener('pointerleave', leave);
      intro?.addEventListener('click', click);
      const resize = () => {
        renderer.setSize(el.clientWidth, el.clientHeight);
        camera.aspect = el.clientWidth / el.clientHeight;
        camera.fov = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(baseFov / 2)) * el.clientHeight / window.innerHeight) * 180 / Math.PI;
        camera.updateProjectionMatrix();
      };
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(el);
      const impulse = new THREE.Vector3();
      let last = performance.now(), accumulator = 0, frame;
      const tick = now => {
        const dt = Math.min((now - last) / 1000, .1);
        last = now;
        accumulator += dt;
        controls.update();
        const height = 2 * 15 * Math.tan(THREE.MathUtils.degToRad(17.5 / 2));
        const lerp = 1 - Math.pow(.9, dt * 60);
        const scrollProgress = THREE.MathUtils.clamp(window.scrollY / window.innerHeight, 0, 1);
        const scrollOffset = -2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * .3 * scrollProgress;
        group.scale.setScalar(1 - scrollProgress * .5);
        group.position.y += ((revealed ? -height / 2 : 0) + scrollOffset - group.position.y) * lerp;
        group.position.z += ((revealed ? -5 : 0) - group.position.z) * lerp;
        group.rotation.x = gyro.current ? tilt.x : Math.sin(now * .00025) * .08;
        group.rotation.y = gyro.current ? tilt.y : Math.cos(now * .0002) * .08;
        group.updateMatrixWorld();
        if (pointerInside) {
          raycaster.setFromCamera(pointer, camera);
          if (raycaster.ray.intersectPlane(plane, point)) {
            group.worldToLocal(point);
            pointerBody.setNextKinematicTranslation(point);
          }
        } else pointerBody.setNextKinematicTranslation(pointerBody.translation());
        while (accumulator >= 1 / 60) {
          for (const { body } of bodies) {
            impulse.copy(body.translation()).multiplyScalar(-.2);
            body.applyImpulse(impulse, true);
          }
          world.timestep = 1 / 60;
          world.step();
          accumulator -= 1 / 60;
        }
        for (const { mesh, body } of bodies) {
          mesh.position.copy(body.translation());
          mesh.quaternion.copy(body.rotation());
        }
        renderer.render(scene, camera);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      dispose = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        cover.removeEventListener('pointermove', move);
        cover.removeEventListener('pointerdown', down);
        cover.removeEventListener('pointerleave', leave);
        cover.removeEventListener('click', click);
        intro?.removeEventListener('pointermove', move);
        intro?.removeEventListener('pointerdown', down);
        intro?.removeEventListener('pointerleave', leave);
        intro?.removeEventListener('click', click);
        window.removeEventListener('scroll', updateScrollOpacity);
        window.removeEventListener('deviceorientation', orientation);
        controls.dispose();
        cover.removeEventListener('pointerdown', guardControls, true);
        geometries.forEach(geometry => geometry.dispose());
        materials.forEach(material => material.dispose());
        environment.dispose();
        world.free();
        renderer.dispose();
        renderer.forceContextLoss();
        canvas.remove();
      };
    }
    start();
    return () => { cancelled = true; dispose?.(); };
  }, []);

  return <>
    <div ref={host} className="cover-objects" data-state="floating" data-letters="PORTFOLIO" aria-hidden="true" />
    {showGyro && <button type="button" className="cover-gyro focus-ring" onClick={() => enableGyro().catch(() => {})}>启用陀螺仪</button>}
  </>;
}
