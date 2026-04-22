import { initialColors } from "./lib/colors.js";
import Color from "./Components/Color/Color.jsx";
import "./App.css";
import ColorForm from "./Components/ColorForm.jsx";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);

  const addColor = (newColor) => {
    setColors((prevColors) => [newColor, ...prevColors]);
  };

  return (
    <>
    <ColorForm onAddColor={addColor}/>
      <h1>Theme Creator</h1>
      
     {/* set this as a default value for the state {initialColors.map((color) => ( */}
     {colors.map((color) => (
        <Color key={color.id} color={color}  />  
        ))}

    </>
  );
}

export default App;
