import * as THREE from "three";

// Helper: Create an ultra-detailed 1024x1024 embossed gold pirate coin texture
function createCoinTextures() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Rich Metallic Radiant Gold Radial Gradient
  const grad = ctx.createRadialGradient(512, 512, 60, 512, 512, 500);
  grad.addColorStop(0, "#FFFFD0");
  grad.addColorStop(0.18, "#FFE24A");
  grad.addColorStop(0.45, "#D8B237");
  grad.addColorStop(0.75, "#9E6D14");
  grad.addColorStop(1, "#3E2604");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Outer Raised Milled Coin Rim
  ctx.strokeStyle = "#382002";
  ctx.lineWidth = 28;
  ctx.beginPath();
  ctx.arc(512, 512, 480, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#FFFFE0";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(512, 512, 460, 0, Math.PI * 2);
  ctx.stroke();

  // Beaded Rim Dots (72 individual rivets around the circumference)
  ctx.fillStyle = "#FFFFE8";
  ctx.shadowColor = "#3D2505";
  ctx.shadowBlur = 8;
  for (let i = 0; i < 72; i++) {
    const angle = (i / 72) * Math.PI * 2;
    const dx = 512 + Math.cos(angle) * 468;
    const dy = 512 + Math.sin(angle) * 468;
    ctx.beginPath();
    ctx.arc(dx, dy, 7.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Inner Inscription Ring Text: "RENAISSANCE • MMXXVI • ECELL"
  ctx.save();
  ctx.translate(512, 512);
  ctx.font = "bold 32px 'Cinzel', serif, monospace";
  ctx.fillStyle = "#FFFFE0";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const inscription = "• RENAISSANCE • MMXXVI • ECELL MNNIT • ALLAHABAD •";
  const radius = 395;
  for (let i = 0; i < inscription.length; i++) {
    const charAngle = (i / inscription.length) * Math.PI * 2 - Math.PI / 2;
    ctx.save();
    ctx.rotate(charAngle);
    ctx.translate(0, -radius);
    ctx.fillText(inscription[i], 0, 0);
    ctx.restore();
  }
  ctx.restore();

  // Inner Beaded Line
  ctx.strokeStyle = "#6B4A10";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(512, 512, 350, 0, Math.PI * 2);
  ctx.stroke();

  // Embossed Central Skull & Crossed Cutlasses
  ctx.shadowColor = "#261302";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetX = 6;
  ctx.shadowOffsetY = 8;

  // Crossed Pirate Cutlass Blades
  ctx.lineWidth = 32;
  ctx.strokeStyle = "#FFFFE0";
  ctx.beginPath();
  ctx.moveTo(260, 300);
  ctx.lineTo(764, 724);
  ctx.moveTo(764, 300);
  ctx.lineTo(260, 724);
  ctx.stroke();

  // Cutlass Handguards
  ctx.fillStyle = "#FFE880";
  ctx.beginPath();
  ctx.arc(280, 320, 36, 0, Math.PI * 2);
  ctx.arc(744, 320, 36, 0, Math.PI * 2);
  ctx.arc(280, 704, 36, 0, Math.PI * 2);
  ctx.arc(744, 704, 36, 0, Math.PI * 2);
  ctx.fill();

  // Skull Head
  ctx.fillStyle = "#FFFFE0";
  ctx.beginPath();
  ctx.arc(512, 440, 135, 0, Math.PI * 2);
  ctx.fill();

  // Skull Bandana / Brow
  ctx.fillStyle = "#E5B834";
  ctx.beginPath();
  ctx.arc(512, 400, 137, Math.PI * 0.85, Math.PI * 0.15, true);
  ctx.lineTo(645, 380);
  ctx.lineTo(379, 380);
  ctx.closePath();
  ctx.fill();

  // Skull Jaw Structure
  ctx.fillStyle = "#FFFFE0";
  ctx.fillRect(455, 530, 114, 85);

  // Deep Shadowed Eye Sockets
  ctx.fillStyle = "#261302";
  ctx.beginPath();
  ctx.ellipse(465, 435, 30, 42, -0.22, 0, Math.PI * 2);
  ctx.ellipse(559, 435, 30, 42, 0.22, 0, Math.PI * 2);
  ctx.fill();

  // Triangular Nose Cavity
  ctx.beginPath();
  ctx.moveTo(512, 475);
  ctx.lineTo(495, 508);
  ctx.lineTo(529, 508);
  ctx.closePath();
  ctx.fill();

  // Teeth Grid
  ctx.strokeStyle = "#261302";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(480, 560); ctx.lineTo(480, 605);
  ctx.moveTo(512, 560); ctx.lineTo(512, 605);
  ctx.moveTo(544, 560); ctx.lineTo(544, 605);
  ctx.stroke();

  // Generate High-Contrast Grayscale Bump Map
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = 1024;
  bumpCanvas.height = 1024;
  const bCtx = bumpCanvas.getContext("2d");
  bCtx.fillStyle = "#808080";
  bCtx.fillRect(0, 0, 1024, 1024);
  bCtx.drawImage(canvas, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.needsUpdate = true;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.generateMipmaps = true;
  bumpMap.minFilter = THREE.LinearMipmapLinearFilter;
  bumpMap.needsUpdate = true;

  return { texture, bumpMap };
}

export class PirateFloatingArtifacts {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.items = [];
    this.group = new THREE.Group();
    this.scene.add(this.group);

    const { texture: coinTex, bumpMap: coinBump } = createCoinTextures();
    this.coinTex = coinTex;
    this.coinBump = coinBump;

    // Materials Pool with Ultra-Glossy Metallic & Specular Reflection Properties
    this.materials = {
      goldCoin: new THREE.MeshStandardMaterial({
        color: 0xffd700,
        map: this.coinTex,
        bumpMap: this.coinBump,
        bumpScale: 0.15,
        metalness: 0.96,
        roughness: 0.10,
        envMapIntensity: 2.0,
      }),
      hookSteel: new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.98,
        roughness: 0.05,
      }),
      hookBronzeCuff: new THREE.MeshStandardMaterial({
        color: 0x9b612d,
        metalness: 0.92,
        roughness: 0.18,
      }),
      eyepatchLeather: new THREE.MeshStandardMaterial({
        color: 0x140e08,
        roughness: 0.85,
        metalness: 0.05,
      }),
      eyepatchGoldEmblem: new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.92,
        roughness: 0.18,
      }),
    };

    // Shared Geometries Pool with Optimized Segment Counts (High visual fidelity, minimal draw calls)
    this.geometries = {
      coin: new THREE.CylinderGeometry(0.52, 0.52, 0.06, 32),
      hookCuff: new THREE.CylinderGeometry(0.2, 0.24, 0.42, 16),
      hookShank: new THREE.CylinderGeometry(0.065, 0.07, 0.28, 12),
      hookCurve: new THREE.TorusGeometry(0.28, 0.06, 12, 24, Math.PI * 1.35),
      hookTip: new THREE.ConeGeometry(0.06, 0.18, 12),
      eyepatchLeather: new THREE.SphereGeometry(0.4, 12, 12, 0, Math.PI * 0.85, 0, Math.PI * 0.7),
      eyepatchEmblem: new THREE.SphereGeometry(0.06, 8, 8),
    };

    this.wasHome = true;

    this.handleReset = () => {
      this.resetItems();
    };
    window.addEventListener("reset-artifacts", this.handleReset);

    // Ambient artifact count (14 items)
    this.initItems(options.count || 14);
  }

  resetItems() {
    this.group.visible = true;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      item.z = -25 + Math.random() * 26;
      const spreadX = 7.5 + (Math.abs(item.z) / 25) * 8;
      const spreadY = 5 + (Math.abs(item.z) / 25) * 5;
      item.baseX = (Math.random() - 0.5) * spreadX * 2;
      item.baseY = (Math.random() - 0.5) * spreadY * 2;
      item.speedZ = 0.034 + Math.random() * 0.038;
      item.rotX = (Math.random() - 0.5) * 0.046;
      item.rotY = (Math.random() - 0.5) * 0.056;
      item.rotZ = (Math.random() - 0.5) * 0.036;
      item.slideVx = 0;
      item.slideVy = 0;
      item.mesh.visible = true;
    }
  }

  createDetailedCoinMesh() {
    const mesh = new THREE.Mesh(this.geometries.coin, this.materials.goldCoin);
    mesh.rotation.x = Math.PI / 2;
    return mesh;
  }

  createDetailedHookMesh() {
    const hookGroup = new THREE.Group();

    const cuff = new THREE.Mesh(this.geometries.hookCuff, this.materials.hookBronzeCuff);
    cuff.position.y = -0.32;
    hookGroup.add(cuff);

    const shank = new THREE.Mesh(this.geometries.hookShank, this.materials.hookSteel);
    shank.position.y = -0.05;
    hookGroup.add(shank);

    const curve = new THREE.Mesh(this.geometries.hookCurve, this.materials.hookSteel);
    curve.position.set(0.26, 0.12, 0);
    curve.rotation.z = Math.PI * 0.45;
    hookGroup.add(curve);

    const tip = new THREE.Mesh(this.geometries.hookTip, this.materials.hookSteel);
    tip.position.set(0.52, 0.18, 0);
    tip.rotation.z = -Math.PI * 0.62;
    hookGroup.add(tip);

    hookGroup.scale.set(0.85, 0.85, 0.85);
    return hookGroup;
  }

  createDetailedEyepatchMesh() {
    const patchGroup = new THREE.Group();

    const patch = new THREE.Mesh(this.geometries.eyepatchLeather, this.materials.eyepatchLeather);
    patch.rotation.x = Math.PI * 0.15;
    patchGroup.add(patch);

    const emblem = new THREE.Mesh(
      this.geometries.eyepatchEmblem,
      this.materials.eyepatchGoldEmblem
    );
    emblem.position.set(0, 0.05, 0.38);
    patchGroup.add(emblem);

    return patchGroup;
  }

  initItems(count) {
    for (let i = 0; i < count; i++) {
      let mesh;
      // Distribution: Gold Coins (~65%), Hooks (~20%), Eyepatches (~15%)
      if (i % 3 === 0) {
        mesh = this.createDetailedHookMesh();
      } else if (i % 5 === 0) {
        mesh = this.createDetailedEyepatchMesh();
      } else {
        mesh = this.createDetailedCoinMesh();
      }

      this.group.add(mesh);

      // Random starting position scattered in depth (Z from -25 to +1) following the water bubble flow
      const z = -25 + Math.random() * 26;
      const spreadX = 7.5 + (Math.abs(z) / 25) * 8;
      const spreadY = 5 + (Math.abs(z) / 25) * 5;

      const item = {
        mesh,
        baseX: (Math.random() - 0.5) * spreadX * 2,
        baseY: (Math.random() - 0.5) * spreadY * 2,
        z: z,
        speedZ: 0.034 + Math.random() * 0.038, // Fast, lively forward drift
        rotX: (Math.random() - 0.5) * 0.046,
        rotY: (Math.random() - 0.5) * 0.056,
        rotZ: (Math.random() - 0.5) * 0.036,
        waveFreqX: 0.7 + Math.random() * 0.8,
        waveAmpX: 0.35 + Math.random() * 0.35,
        waveFreqY: 0.5 + Math.random() * 0.6,
        waveAmpY: 0.25 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        baseScale: 0.75 + Math.random() * 0.35,
        slideVx: 0,
        slideVy: 0,
      };

      mesh.scale.setScalar(item.baseScale);
      this.items.push(item);
    }
  }

  update(time, delta = 0.033) {
    // 1. Detect Active Route
    const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
    const isHome = pathname === "/" || pathname === "/udbhav" || pathname === "/udbhav/";

    // 2. Hide 3D Objects on Non-Home Pages (Leave only water bubbles in background)
    if (!isHome) {
      if (this.group.visible) {
        this.group.visible = false;
      }
      this.wasHome = false;
      return; // Skip 3D object rendering on content pages
    }

    // 3. On Home Page: Ensure group is visible and resume forward flowing objects
    if (!this.group.visible) {
      this.group.visible = true;
    }

    if (!this.wasHome) {
      this.resetItems();
      this.wasHome = true;
    }

    // Time-delta scale multiplier (normalized to 60 FPS)
    const dt = Math.max(0.7, Math.min(2.5, delta * 60));

    // 4. Update Forward Flowing Physics (Following Water Bubbles Stream)
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (!item.mesh.visible) {
        item.mesh.visible = true;
      }

      // Forward drift towards camera (+Z) following the water bubbles with dt scaling
      item.z += item.speedZ * dt;

      // When approaching close to screen (Z > 1.2), smoothly accelerate outwards past the camera
      if (item.z > 1.2) {
        const distFromCenter = Math.sqrt(item.baseX * item.baseX + item.baseY * item.baseY) + 0.01;
        const dirX = item.baseX / distFromCenter;
        const dirY = item.baseY / distFromCenter;

        const proximity = Math.min(1.0, (item.z - 1.2) / 1.5);
        const slideForce = 0.024 * proximity * dt;

        item.slideVx += dirX * slideForce;
        item.slideVy += dirY * slideForce;

        item.baseX += item.slideVx;
        item.baseY += item.slideVy;
      }

      // Recycle smoothly once it has slid past the camera viewport (Z > 3.6)
      if (item.z > 3.6) {
        item.z = -28 - Math.random() * 6;
        const spreadX = 14;
        const spreadY = 10;
        item.baseX = (Math.random() - 0.5) * spreadX;
        item.baseY = (Math.random() - 0.5) * spreadY;
        item.speedZ = 0.032 + Math.random() * 0.038;
        item.rotX = (Math.random() - 0.5) * 0.046;
        item.rotY = (Math.random() - 0.5) * 0.056;
        item.rotZ = (Math.random() - 0.5) * 0.036;
        item.slideVx = 0;
        item.slideVy = 0;
      }

      // Natural wave & ocean displacement
      const waveX = Math.sin(time * item.waveFreqX + item.phase) * item.waveAmpX;
      const waveY = Math.cos(time * item.waveFreqY + item.phase) * item.waveAmpY;

      const posX = item.baseX + waveX;
      const posY = item.baseY + waveY;

      item.mesh.position.set(posX, posY, item.z);

      // Continuous 3D Tumble Rotation with dt scaling
      item.mesh.rotation.x += item.rotX * dt;
      item.mesh.rotation.y += item.rotY * dt;
      item.mesh.rotation.z += item.rotZ * dt;

      // Gentle aquatic pulse
      const breath = 1.0 + Math.sin(time * 1.8 + item.phase) * 0.025;
      item.mesh.scale.setScalar(item.baseScale * breath);
    }
  }

  dispose() {
    window.removeEventListener("reset-artifacts", this.handleReset);
    this.coinTex?.dispose();
    this.coinBump?.dispose();

    Object.values(this.geometries).forEach((geo) => geo.dispose());
    Object.values(this.materials).forEach((mat) => mat.dispose());

    while (this.group.children.length > 0) {
      const child = this.group.children[0];
      this.group.remove(child);
    }
    this.scene.remove(this.group);
  }
}
