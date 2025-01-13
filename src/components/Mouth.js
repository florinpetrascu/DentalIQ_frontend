import React from 'react';
import { Canvas } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';

// Componentă pentru un dinte mai realist
function Tooth({ position, scale, color = "white" }) {
  return (
    <mesh position={position} scale={scale}>
      <cylinderGeometry args={[0.3, 0.5, 2, 32]} /> {/* Lungimea ajustată */}
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Componentă pentru gingii
function Gums({ position }) {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[5, 5, 0.5, 64]} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
}

// Componenta Mouth
function Mouth() {
  // Configurarea pozițiilor și scalărilor pentru fiecare tip de dinte
  const upperTeeth = [
    { position: [-4, 0, 0.5], scale: [0.8, 1.8, 0.8] }, // Molari stânga
    { position: [-3, 0, 0.5], scale: [0.7, 1.5, 0.7] }, // Premolari stânga
    { position: [-2, 0, 0.5], scale: [0.6, 1.3, 0.6] }, // Canin stânga
    { position: [-1, 0, 0.5], scale: [0.5, 1.2, 0.5] }, // Incisivi stânga
    { position: [0, 0, 0.5], scale: [0.5, 1.2, 0.5] },  // Incisivi dreapta
    { position: [1, 0, 0.5], scale: [0.6, 1.3, 0.6] },  // Canin dreapta
    { position: [2, 0, 0.5], scale: [0.7, 1.5, 0.7] },  // Premolari dreapta
    { position: [3, 0, 0.5], scale: [0.8, 1.8, 0.8] },  // Molari dreapta
  ];

  const lowerTeeth = upperTeeth.map((tooth) => ({
    ...tooth,
    position: [tooth.position[0], -2, tooth.position[2]], // Poziționare mai joasă
  }));

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}> {/* Spațiu adăugat */}
      <Canvas>
        {/* Lumini */}
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 15, 10]} angle={0.3} />

        {/* Gingii */}
        <Gums position={[0, 0.5, 0]} />
        <Gums position={[0, -1.5, 0]} />

        {/* Arcada superioară */}
        <group position={[0, 1, 0]}>
          {upperTeeth.map((tooth, index) => (
            <Tooth
              key={`upper-${index}`}
              position={tooth.position}
              scale={tooth.scale}
            />
          ))}
        </group>

        {/* Arcada inferioară */}
        <group position={[0, -1, 0]}>
          {lowerTeeth.map((tooth, index) => (
            <Tooth
              key={`lower-${index}`}
              position={tooth.position}
              scale={tooth.scale}
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
}

export default Mouth;
