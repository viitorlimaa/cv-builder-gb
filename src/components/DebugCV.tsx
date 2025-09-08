// src/components/DebugCV.tsx
import React from "react";
import { useExperience } from "../context/ExperienceContext";

export default function DebugCV() {
  const { experiences } = useExperience();
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Estado (debug)</h3>
      <pre>{JSON.stringify(experiences, null, 2)}</pre>
    </div>
  );
}
