import { useState } from "react";

export default function useContrast() {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkContrast(bgColor, textColor) {
    if (!bgColor || !textColor) return null;

    setLoading(true);

    try {
      const cleanBg = bgColor.toLowerCase();
      const cleanText = textColor.toLowerCase();

      const response = await fetch(
        "https://www.aremycolorsaccessible.com/api/are-they",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            colors: [cleanBg, cleanText],
          }),
        }
      );

      const text = await response.text();

      if (!text || text.trim() === "") {
        throw new Error("Empty response from API");
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Invalid JSON from API");
      }

      if (!data) {
        setScore({ overall: "Invalid" });
        return null;
      }

      setScore({
        overall: data.overall,
      });

      return data;
    } catch (error) {
      console.error("Error checking contrast:", error);

      setScore({
        overall: "Error",
      });

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    score,
    loading,
    checkContrast,
  };
}