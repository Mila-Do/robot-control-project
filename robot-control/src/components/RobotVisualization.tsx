'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RobotState } from '@/types/robot';

interface Props {
  state: RobotState;
}

export function RobotVisualization({ state }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const linksRefs = useRef<THREE.Group[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.5;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Post-processing setup
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(containerRef.current.clientWidth, containerRef.current.clientHeight),
      1.5,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;
    controlsRef.current = controls;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add neon grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x00ffff, 0x00ffff);
    gridHelper.material.opacity = 0.5;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      composer.render();
    }
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !composerRef.current || !containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
      composerRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Update robot links
  useEffect(() => {
    if (!sceneRef.current) return;

    // Remove old links
    linksRefs.current.forEach(link => sceneRef.current?.remove(link));
    linksRefs.current = [];

    // Create new links
    let currentPosition = new THREE.Vector3(0, 0, 0);
    let currentRotation = new THREE.Euler(0, 0, 0);
    let cumulativeAngle = 0;

    state.axes.forEach((angle, index) => {
      const params = state.parameters[index];
      
      // Create link group
      const linkGroup = new THREE.Group();
      
      // Create main link geometry
      const geometry = new THREE.BoxGeometry(params.length, params.width, params.width);
      
      // Main link material with holographic effect
      const mainMaterial = new THREE.MeshPhongMaterial({ 
        color: index === 0 ? 0x00ff00 : 0xff00ff,
        shininess: 100,
        emissive: index === 0 ? 0x00ff00 : 0xff00ff,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.8,
      });
      const link = new THREE.Mesh(geometry, mainMaterial);
      link.position.x = params.length / 2;
      link.castShadow = true;
      linkGroup.add(link);

      // Wireframe effect
      const wireframeGeometry = new THREE.BoxGeometry(
        params.length + 0.02,
        params.width + 0.02,
        params.width + 0.02
      );
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
      wireframe.position.x = params.length / 2;
      linkGroup.add(wireframe);

      // Glowing edges
      const edges = new THREE.EdgesGeometry(geometry);
      const edgesMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
        linewidth: 2,
      });
      const edgesMesh = new THREE.LineSegments(edges, edgesMaterial);
      edgesMesh.position.x = params.length / 2;
      linkGroup.add(edgesMesh);

      // Joint glow effect
      const jointGeometry = new THREE.SphereGeometry(params.width * 0.8, 16, 16);
      const jointMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.6,
      });
      const joint = new THREE.Mesh(jointGeometry, jointMaterial);
      joint.position.x = 0;
      linkGroup.add(joint);

      // Add coordinate system helper with neon colors
      const axesHelper = new THREE.AxesHelper(0.5);
      axesHelper.material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
      });
      linkGroup.add(axesHelper);

      // Position and rotate link
      linkGroup.position.copy(currentPosition);
      linkGroup.rotation.copy(currentRotation);
      
      // Add current angle to cumulative angle
      cumulativeAngle += angle;
      linkGroup.rotation.z = (cumulativeAngle * Math.PI) / 180;

      // Update position for next link
      currentPosition.x += Math.cos(cumulativeAngle * Math.PI / 180) * params.length;
      currentPosition.y += Math.sin(cumulativeAngle * Math.PI / 180) * params.length;
      currentRotation.z = cumulativeAngle * Math.PI / 180;

      sceneRef.current?.add(linkGroup);
      linksRefs.current.push(linkGroup);
    });
  }, [state.axes, state.parameters]);

  return <div ref={containerRef} className="w-full h-full min-h-[400px]" />;
} 