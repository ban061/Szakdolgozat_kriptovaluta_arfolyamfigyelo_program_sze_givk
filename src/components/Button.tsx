import { useState } from "react";

export default function Button() {
  const [label, setLabel] = useState<number>(0);

  function changeLabelText() {
    setLabel(Math.random());
  }

  return (
    <div>
      <span>{label}</span>
      <button onClick={changeLabelText}>Gomb</button>
    </div>
  );
}
