import { useEffect, useState } from "react";

export default function useColors(initialColors = []) {
  const [colors, setColors] = useState(() => {
    const saved = localStorage.getItem("colors");
    return saved ? JSON.parse(saved) : initialColors;
  });

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

  function addColor(newColor) {
    setColors((prev) => [newColor, ...prev]);
  }

  function deleteColor(id) {
    setColors((prev) => prev.filter((c) => c.id !== id));
  }

  function updateColor(updatedColor) {
    setColors((prev) =>
      prev.map((c) => (c.id === updatedColor.id ? updatedColor : c))
    );
    
  }

  return { colors, addColor, deleteColor, updateColor };
}