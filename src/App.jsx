import { initialColors } from "./lib/colors.js";
import Color from "./Components/Color/Color.jsx";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);

  const addColor = (newColor) => {
    setColors((prevColors) => [newColor, ...prevColors]);
  };

  // Delete function

  const deleteColor = (idToDelete) => {
    setColors(prevColors => 
      prevColors.filter(color => color.id !== idToDelete)
    );
  };

  return (
    <>
    <ColorForm onAddColor={addColor}/>
      <h1>Theme Creator</h1>
      
     {/* set this as a default value for the state {initialColors.map((color) => ( */}
     {colors.length === 0 ? (
        <p className="color-card-highlight">
          No colors in your theme yet...Start by adding one!!
        </p>
      ) : (
     colors.map((color) => (
        <Color key={color.id} color={color} onDelete={deleteColor}  />  
        ))
        )}

    </>
  );
}

export default App;
