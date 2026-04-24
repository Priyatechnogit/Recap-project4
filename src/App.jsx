import { initialColors } from "./lib/colors.js";
import Color from "./Components/Color/Color.jsx";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import useColors from "./Components/hooks/useColor.js";

function App() {
   const { colors, addColor, deleteColor, updateColor } =
    useColors(initialColors);

  const [editedColor, setEditedColor] = useState(null);

  const handleEdit = (color) => setEditedColor(color);

  const handleCancel = () => setEditedColor(null);
    

   return (
    <>
      <ColorForm 
      onAddColor={addColor} 
      onUpdateColor={updateColor}
      editingColor={editedColor}
      onCancel={handleCancel}
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
                onEdit={() => handleEdit(color)}
                onCancel={handleCancel}
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
