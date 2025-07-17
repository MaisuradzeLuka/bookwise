"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";

type Props = {
  onColorChange: (color: string) => void;
};

const ColorPicker = ({ onColorChange }: Props) => {
  const [color, setColor] = useState("");

  const onChange = (newColor: string) => {
    onColorChange(newColor);
    setColor(newColor);
  };

  return (
    <>
      <HexColorPicker color={color} onChange={(e) => onChange(e)} />

      <div className="pl-2" style={{ borderLeft: `25px solid ${color}` }}>
        Book color {color}
      </div>
    </>
  );
};

export default ColorPicker;
