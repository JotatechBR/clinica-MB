import * as THREE from "three";

/**
 * Forma orgânica central: icosfera deformada por ondas suaves.
 * Alongada verticalmente e achatada em profundidade, lembra a curvatura
 * de um contorno facial sem representar um rosto.
 */
export function createOrganicGeometry(detail: number) {
  const geo = new THREE.IcosahedronGeometry(1, detail);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    const n =
      0.16 * Math.sin(v.x * 2.1 + 1.2) * Math.cos(v.y * 1.6 - 0.4) +
      0.09 * Math.sin(v.y * 3.4 + v.z * 1.8) +
      0.05 * Math.cos(v.z * 4.1 - v.x * 2.3) +
      // leve depressão lateral, como a transição entre maçã do rosto e têmpora
      -0.12 * Math.exp(-((v.x - 0.55) ** 2 + (v.y - 0.15) ** 2) * 6);
    const r = 1 + n;
    pos.setXYZ(i, v.x * r * 0.92, v.y * r * 1.22, v.z * r * 0.78);
  }

  geo.computeVertexNormals();
  return geo;
}

/** Lâmina curva — uma "camada de pele" translúcida em torno da forma. */
export function createLamina(radius: number, phiLength: number, thetaStart: number, thetaLength: number, segments = 64) {
  return new THREE.SphereGeometry(radius, segments, Math.round(segments / 2), 0, phiLength, thetaStart, thetaLength);
}
