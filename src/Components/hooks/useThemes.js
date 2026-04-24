import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { initialColors } from "../../lib/colors.js";


const initialThemes = [
  {
    id: "t1",
    name: "Default Theme",
    colors: initialColors,
    isDefault: true,
  },
  {
    id: "t2",
    name: "2nd Theme",
    colors: [],
    isDefault: false,
  },
];

export default function useThemes() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });

  const [activeThemeId, setActiveThemeId] = useLocalStorageState(
    "activeThemeId",
    { defaultValue: "t1" }
  );

  const activeTheme = themes.find((t) => t.id === activeThemeId);

  // safety fix
  useEffect(() => {
    const exists = themes.some((t) => t.id === activeThemeId);

    if (!exists) {
      setActiveThemeId("t1");
    }
  }, [themes, activeThemeId, setActiveThemeId]);

  
  const addColor = (color) => {
    setThemes((prev) =>
      prev.map((t) =>
        t.id === activeThemeId
          ? { ...t, colors: [...t.colors, color] }
          : t
      )
    );
  };

  const deleteColor = (id) => {
    setThemes((prev) =>
      prev.map((t) =>
        t.id === activeThemeId
          ? {
              ...t,
              colors: t.colors.filter((c) => c.id !== id),
            }
          : t
      )
    );
  };

  const updateColor = (updated) => {
    setThemes((prev) =>
      prev.map((t) =>
        t.id === activeThemeId
          ? {
              ...t,
              colors: t.colors.map((c) =>
                c.id === updated.id ? updated : c
              ),
            }
          : t
      )
    );
  };

 
  const updateThemeName = (name) => {
    setThemes((prev) =>
      prev.map((t) =>
        t.id === activeThemeId ? { ...t, name } : t
      )
    );
  };

  const deleteTheme = () => {
    setThemes((prev) => prev.filter((t) => t.id !== activeThemeId));
    setActiveThemeId("t1");
  };

  return {
    themes,
    activeTheme,
    activeThemeId,
    setActiveThemeId,
    addColor,
    deleteColor,
    updateColor,
    updateThemeName,
    deleteTheme,
  };
}