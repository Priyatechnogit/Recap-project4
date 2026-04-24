import { useState, useEffect } from "react";

export default function ThemeBar({
  themes,
  activeThemeId,
  setActiveThemeId,
  setThemes,
  activeTheme,
}) {
  const [mode, setMode] = useState("normal");
  const [nameInput, setNameInput] = useState("");

  const currentTheme =
    activeTheme || themes.find((t) => t.id === activeThemeId);

  const isDefault = currentTheme?.isDefault;

  // sync edit input
  useEffect(() => {
    if (mode === "edit" && currentTheme) {
      setNameInput(currentTheme.name);
    }
  }, [mode, currentTheme]);

 /* Update */
  const handleUpdate = () => {
    setThemes((prev) =>
      prev.map((t) =>
        t.id === activeThemeId
          ? { ...t, name: nameInput }
          : t
      )
    );
    setMode("normal");
  };

  /* Delete */
  const handleDelete = () => {
    setThemes((prev) =>
      prev.filter((t) => t.id !== activeThemeId)
    );

    setActiveThemeId("t1");
    setMode("normal");
  };

  return (
    <div className="theme-bar">

     
      {mode === "edit" ? (
        // Edit mode editable
        <input
          value={nameInput || ""}
          onChange={(e) => setNameInput(e.target.value)}
          autoFocus
        />
      ) : (
        // Dropdown for normal and delete mode
        <select
          value={activeThemeId}
          onChange={(e) => setActiveThemeId(e.target.value)}
        >
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      )}

      {/* Button */}

      {mode === "normal" && (
        <>
          <button>Add</button>

          <button
            onClick={() => setMode("edit")}
            disabled={isDefault}
          >
            Edit
          </button>

          <button
            onClick={() => setMode("delete")}
            disabled={isDefault}
          >
            Delete
          </button>
        </>
      )}

      {mode === "edit" && (
        <>
          <button onClick={handleUpdate}>
            Update
          </button>

          <button onClick={() => setMode("normal")}>
            Cancel
          </button>
        </>
      )}

      {mode === "delete" && (
        <>
          <button onClick={handleDelete}>
            Sure Delete
          </button>

          <button onClick={() => setMode("normal")}>
            Cancel
          </button>
        </>
      )}

    </div>
  );
}