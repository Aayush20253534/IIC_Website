import * as THREE from "three";

// Helper: Create an ultra-detailed 1024x1024 embossed gold pirate coin texture
function createCoinTextures() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Rich Metallic Gold Radial Gradient
  const grad = ctx.createRadialGradient(512, 512, 80, 512, 512, 500);
  grad.addColorStop(0, "#FFF3B0");
  grad.addColorStop(0.25, "#FFD700");
  grad.addColorStop(0.6, "#C59B27");
  grad.addColorStop(0.85, "#8B6508");
  grad.addColorStop(1, "#422802");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Outer Raised Milled Coin Rim
  ctx.strokeStyle = "#422802";
  ctx.lineWidth = 28;
  ctx.beginPath();
  ctx.arc(512, 512, 480, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#FFEFA6";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(512, 512, 460, 0, Math.PI * 2);
  ctx.stroke();

  // Beaded Rim Dots (72 individual rivets around the circumference)
  ctx.fillStyle = "#FFF3B0";
  ctx.shadowColor = "#3D2505";
  ctx.shadowBlur = 8;
  for (let i = 0; i < 72; i++) {
    const angle = (i / 72) * Math.PI * 2;
    const dx = 512 + Math.cos(angle) * 468;
    const dy = 512 + Math.sin(angle) * 468;
    ctx.beginPath();
    ctx.arc(dx, dy, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  // Inner Inscription Ring Text: "RENAISSANCE • MMXXVI • ECELL"
  ctx.save();
  ctx.translate(512, 512);
  ctx.font = "bold 32px 'Cinzel', serif, monospace";
  ctx.fillStyle = "#FFE79A";
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
  ctx.shadowColor = "#2E1803";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetX = 6;
  ctx.shadowOffsetY = 8;

  // Crossed Pirate Cutlass Blades
  ctx.lineWidth = 32;
  ctx.strokeStyle = "#FFEFA6";
  ctx.beginPath();
  ctx.moveTo(260, 300);
  ctx.lineTo(764, 724);
  ctx.moveTo(764, 300);
  ctx.lineTo(260, 724);
  ctx.stroke();

  // Cutlass Handguards
  ctx.fillStyle = "#FFDF73";
  ctx.beginPath();
  ctx.arc(280, 320, 36, 0, Math.PI * 2);
  ctx.arc(744, 320, 36, 0, Math.PI * 2);
  ctx.arc(280, 704, 36, 0, Math.PI * 2);
  ctx.arc(744, 704, 36, 0, Math.PI * 2);
  ctx.fill();

  // Skull Head
  ctx.fillStyle = "#FFF3B0";
  ctx.beginPath();
  ctx.arc(512, 440, 135, 0, Math.PI * 2);
  ctx.fill();

  // Skull Bandana / Brow
  ctx.fillStyle = "#D4AF37";
  ctx.beginPath();
  ctx.arc(512, 400, 137, Math.PI * 0.85, Math.PI * 0.15, true);
  ctx.lineTo(645, 380);
  ctx.lineTo(379, 380);
  ctx.closePath();
  ctx.fill();

  // Skull Jaw Structure
  ctx.fillStyle = "#FFF3B0";
  ctx.fillRect(455, 530, 114, 85);

  // Deep Shadowed Eye Sockets
  ctx.fillStyle = "#2E1803";
  ctx.beginPath();
  ctx.ellipse(465, 435, 30, 42, -0.22, 0, Math.PI * 2);
  ctx.ellipse(559, 435, 30, 42, 0.22, 0, Math.PI * 2);
  ctx.fill();

  // Triangular Nose Cavity
  ctx.beginPath();
  ctx.moveTo(512, 475);
  ctx.lineTo(496, 508);
  ctx.lineTo(528, 508);
  ctx.closePath();
  ctx.fill();

  // Teeth Grid
  ctx.strokeStyle = "#2E1803";
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

    // Materials Pool with Enhanced Metallic & Roughness Properties
    this.materials = {
      goldCoin: new THREE.MeshStandardMaterial({
        color: 0xffd700,
        map: coinTex,
        bumpMap: coinBump,
        bumpScale: 0.12,
        metalness: 0.94,
        roughness: 0.18,
      }),
      coinEdge: new THREE.MeshStandardMaterial({
        color: 0xc59b27,
        metalness: 0.92,
        roughness: 0.25,
      }),
      hookSteel: new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        metalness: 0.96,
        roughness: 0.12,
      }),
      hookBronzeCuff: new THREE.MeshStandardMaterial({
        color: 0x8b5a2b,
        metalness: 0.88,
        roughness: 0.3,
      }),
      hookRivets: new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.95,
        roughness: 0.2,
      }),
      eyepatchLeather: new THREE.MeshStandardMaterial({
        color: 0x140e08,
        roughness: 0.85,
        metalness: 0.05,
      }),
      eyepatchGoldEmblem: new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.9,
        roughness: 0.25,
      }),
    };

    // Shared Geometries Pool
    this.geometries = {
      coinFace: new THREE.CylinderGeometry(0.52, 0.52, 0.06, 48),
      coinRimRing: new THREE.TorusGeometry(0.52, 0.035, 16, 48),
      hookCuff: new THREE.CylinderGeometry(0.2, 0.24, 0.42, 24),
      hookCuffRing: new THREE.TorusGeometry(0.24, 0.025, 12, 24),
      hookRivet: new THREE.SphereGeometry(0.028, 8, 8),
      hookShank: new THREE.CylinderGeometry(0.065, 0.07, 0.28, 16),
      hookCurve: new THREE.TorusGeometry(0.28, 0.06, 16, 36, Math.PI * 1.35),
      hookTip: new THREE.ConeGeometry(0.06, 0.18, 16),
    };

    // Ambient artifact count (~18 items with high coin density)
    this.initItems(options.count || 18);
  }

  createDetailedCoinMesh() {
    const coinGroup = new THREE.Group();

    // Main Coin Body
    const face = new THREE.Mesh(this.geometries.coinFace, this.materials.goldCoin);
    face.rotation.x = Math.PI / 2;
    coinGroup.add(face);

    // Double Raised Beveled Rim Ring
    const rim1 = new THREE.Mesh(this.geometries.coinRimRing, this.materials.coinEdge);
    rim1.position.z = 0.03;
    coinGroup.add(rim1);

    const rim2 = new THREE.Mesh(this.geometries.coinRimRing, this.materials.coinEdge);
    rim2.position.z = -0.03;
    coinGroup.add(rim2);

    return coinGroup;
  }

  createDetailedHookMesh() {
    const hookGroup = new THREE.Group();

    // 1. Bronze Gauntlet Cuff
    const cuff = new THREE.Mesh(this.geometries.hookCuff, this.materials.hookBronzeCuff);
    cuff.position.y = -0.32;
    hookGroup.add(cuff);

    // 2. Brass Accent Rings around cuff
    const cuffRing1 = new THREE.Mesh(this.geometries.hookCuffRing, this.materials.hookRivets);
    cuffRing1.position.y = -0.15;
    cuffRing1.rotation.x = Math.PI / 2;
    hookGroup.add(cuffRing1);

    const cuffRing2 = new THREE.Mesh(this.geometries.hookCuffRing, this.materials.hookRivets);
    cuffRing2.position.y = -0.45;
    cuffRing2.rotation.x = Math.PI / 2;
    hookGroup.add(cuffRing2);

    // 3. Brass Hexagonal Stud Rivets around collar
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const rivet = new THREE.Mesh(this.geometries.hookRivet, this.materials.hookRivets);
      rivet.position.set(Math.cos(angle) * 0.22, -0.15, Math.sin(angle) * 0.22);
      hookGroup.add(rivet);
    }

    // 4. Forged Steel Shank
    const shank = new THREE.Mesh(this.geometries.hookShank, this.materials.hookSteel);
    shank.position.y = -0.05;
    hookGroup.add(shank);

    // 5. Heavy Curved Hook Arch
    const curve = new THREE.Mesh(this.geometries.hookCurve, this.materials.hookSteel);
    curve.position.set(0.26, 0.12, 0);
    curve.rotation.z = Math.PI * 0.45;
    hookGroup.add(curve);

    // 6. Chiseled Barb Tip
    const tip = new THREE.Mesh(this.geometries.hookTip, this.materials.hookSteel);
    tip.position.set(0.52, 0.18, 0);
    tip.rotation.z = -Math.PI * 0.62;
    hookGroup.add(tip);

    hookGroup.scale.set(0.85, 0.85, 0.85);
    return hookGroup;
  }

  createDetailedEyepatchMesh() {
    const patchGroup = new THREE.Group();

    // Curved Leather Patch Shell
    const patchGeo = new THREE.SphereGeometry(0.4, 20, 20, 0, Math.PI * 0.85, 0, Math.PI * 0.7);
    const patch = new THREE.Mesh(patchGeo, this.materials.eyepatchLeather);
    patch.rotation.x = Math.PI * 0.15;
    patchGroup.add(patch);

    // Brass Skull Stud on Patch Center
    const emblem = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 12, 12),
      this.materials.eyepatchGoldEmblem
    );
    emblem.position.set(0, 0.05, 0.38);
    patchGroup.add(emblem);

    // Stitched Diagonal Straps
    const strapGeo = new THREE.BoxGeometry(1.3, 0.04, 0.02);
    const strap1 = new THREE.Mesh(strapGeo, this.materials.eyepatchLeather);
    strap1.rotation.z = 0.38;
    strap1.position.z = -0.04;
    patchGroup.add(strap1);

    const strap2 = new THREE.Mesh(strapGeo, this.materials.eyepatchLeather);
    strap2.rotation.z = -0.38;
    strap2.position.z = -0.04;
    patchGroup.add(strap2);

    return patchGroup;
  }

  initItems(count) {
    for (let i = 0; i < count; i++) {
      let mesh;
      // Spawn distribution: Gold Coins (~80%), Steel Hooks (~12%), Eyepatches (~8%) — zero diamonds
      if (i % 7 === 0) {
        mesh = this.createDetailedHookMesh();
      } else if (i % 11 === 0) {
        mesh = this.createDetailedEyepatchMesh();
      } else {
        mesh = this.createDetailedCoinMesh();
      }

      this.group.add(mesh);

      // Random starting position scattered in depth (Z from -25 to +1)
      const z = -25 + Math.random() * 26;
      const spreadX = 7.5 + (Math.abs(z) / 25) * 8;
      const spreadY = 5 + (Math.abs(z) / 25) * 5;

      const item = {
        mesh,
        baseX: (Math.random() - 0.5) * spreadX * 2,
        baseY: (Math.random() - 0.5) * spreadY * 2,
        z: z,
        speedZ: 0.013 + Math.random() * 0.018, // Balanced forward drift
        rotX: (Math.random() - 0.5) * 0.018,
        rotY: (Math.random() - 0.5) * 0.022,
        rotZ: (Math.random() - 0.5) * 0.015,
        waveFreqX: 0.6 + Math.random() * 0.7,
        waveAmpX: 0.3 + Math.random() * 0.35,
        waveFreqY: 0.4 + Math.random() * 0.6,
        waveAmpY: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        baseScale: 0.7 + Math.random() * 0.4,
        slideVx: 0,
        slideVy: 0,
      };

      mesh.scale.setScalar(item.baseScale);
      this.items.push(item);
    }
  }

  update(time) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      // Forward drift towards camera (+Z)
      item.z += item.speedZ;

      // When approaching close to screen (Z > 1.2), smoothly slide off outwards past the camera
      if (item.z > 1.2) {
        const distFromCenter = Math.sqrt(item.baseX * item.baseX + item.baseY * item.baseY) + 0.01;
        const dirX = item.baseX / distFromCenter;
        const dirY = item.baseY / distFromCenter;

        const proximity = Math.min(1.0, (item.z - 1.2) / 1.5);
        const slideForce = 0.02 * proximity;

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
        item.speedZ = 0.012 + Math.random() * 0.018;
        item.rotX = (Math.random() - 0.5) * 0.018;
        item.rotY = (Math.random() - 0.5) * 0.022;
        item.rotZ = (Math.random() - 0.5) * 0.015;
        item.slideVx = 0;
        item.slideVy = 0;
      }

      // Natural wave & ocean displacement (zero cursor interference)
      const waveX = Math.sin(time * item.waveFreqX + item.phase) * item.waveAmpX;
      const waveY = Math.cos(time * item.waveFreqY + item.phase) * item.waveAmpY;

      const posX = item.baseX + waveX;
      const posY = item.baseY + waveY;

      item.mesh.position.set(posX, posY, item.z);

      // Continuous 3D Tumble Rotation
      item.mesh.rotation.x += item.rotX;
      item.mesh.rotation.y += item.rotY;
      item.mesh.rotation.z += item.rotZ;

      // Gentle aquatic pulse
      const breath = 1.0 + Math.sin(time * 1.6 + item.phase) * 0.02;
      item.mesh.scale.setScalar(item.baseScale * breath);
    }
  }

  dispose() {
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
