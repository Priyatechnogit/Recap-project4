import "./App.css";
import { useState } from "react";

import useThemes from "./Components/hooks/useThemes.js"
import Color from "./Components/Color/Color.jsx";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import ThemeBar from "./Components/ThemeBar/ThemeBar.jsx";

function App() {
  const {
    themes,
    activeTheme,
    activeThemeId,
    setActiveThemeId,
    addColor,
    deleteColor,
    updateColor,
    updateThemeName,
    deleteTheme,
  } = useThemes();

  const [editedColor, setEditedColor] = useState(null);

  const [isEditingTheme, setIsEditingTheme] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [themeNameInput, setThemeNameInput] = useState("");

  const isDefault = activeTheme?.isDefault;

  if (!activeTheme) return <p>Loading...</p>;

  return (
    <>
      <h1>Theme Creator</h1>

      {/* Themebar */}
      <ThemeBar
        themes={themes}
        activeThemeId={activeThemeId}
        setActiveThemeId={setActiveThemeId}

        isEditingTheme={isEditingTheme}
        setIsEditingTheme={setIsEditingTheme}
        themeNameInput={themeNameInput}
        setThemeNameInput={setThemeNameInput}
        updateThemeName={updateThemeName}

        isConfirmingDelete={isConfirmingDelete}
        setIsConfirmingDelete={setIsConfirmingDelete}
        deleteTheme={deleteTheme}

        isDefault={isDefault}
      />

      {/* Colorform */}
      <ColorForm
        onAddColor={addColor}
        onUpdateColor={updateColor}
        editingColor={editedColor}
        onCancel={() => setEditedColor(null)}
      />

      {/* Colors */}
      {activeTheme.colors.length === 0 ? (
        <p>No colors yet...</p>
      ) : (
        <ul className="color-list">
          {activeTheme.colors.map((color) => (
            <Color
              key={color.id}
              color={color}
              onDelete={deleteColor}
              onEdit={() => setEditedColor(color)}
              isEditing={editedColor?.id === color.id}
              onUpdateColor={updateColor}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default App;