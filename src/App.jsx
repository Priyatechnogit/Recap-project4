import { initialColors } from "./lib/colors.js";
import Color from "./Components/Color/Color.jsx";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);
  const [editedColor, setEditedColor] = useState(null);

  const addColor = (newColor) => {
    setColors((prevColors) => [newColor, ...prevColors]);
  };

  // Delete function

  const deleteColor = (idToDelete) => {
    setColors(prevColors => 
      prevColors.filter(color => color.id !== idToDelete)
    );
  };

  // Edit function 

  const editColor = (color) => setEditedColor(color);
  // update

  const updateColor = (updatedColor) => {
     setColors(prevColors => 
      prevColors.map((color) => color.id === updatedColor.id?  updatedColor : color));
      setEditedColor(null);   // edit mode exit
     };

   return (
    <>
      <ColorForm 
      onAddColor={addColor} 
      onUpdateColor={updateColor}
      editingColor={editedColor}
      />

      <h1>Theme Creator</h1>

      {colors.length === 0 ? (
        <p className="color-card-highlight">
          No colors in your theme yet... Start by adding one!!
        </p>
      ) : (
        <ul className="color-list">
          {colors.map((color) => (
            <li key={color.id} className="color-item">
              <Color
                color={color}
                onDelete={deleteColor}
                onEdit={() => setEditedColor(color)}
                onCancel={() => setEditedColor(null)}
                isEditing={editedColor?.id === color.id}
                onUpdateColor={updateColor}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
