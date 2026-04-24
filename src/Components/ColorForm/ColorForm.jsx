import { useState, useEffect } from "react"; // 1. Added useEffect here
import { nanoid } from "nanoid";
import ColorInput from "../ColorInput/ColorInput.jsx";
import "./ColorForm.css";
import useContrast from "../hooks/useContrast";

export default function ColorForm({ onAddColor, onUpdateColor, editingColor, onCancel }){
  const [formData ,setFormData] = useState({role:"Role", hex:"#123456", contrastText:"#123456"});
  const { checkContrast, loading } = useContrast();

  useEffect(() => {
    if (editingColor) {
      setFormData(editingColor);
    } else {
      setFormData({ role: "Role", hex: "#123456", contrastText: "#123456" });
    }
  }, [editingColor]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event){
    event.preventDefault();
    const result = await checkContrast(formData.hex, formData.contrastText);

    
    const colorData = {
      ...formData,
      contrastScore: result?.overall || "Unknown",
    };

    
        if (editingColor) {
      onUpdateColor(colorData); 
      onCancel(); 
    } else {
      onAddColor({ ...colorData, id: nanoid() });
    }
    
    setFormData({ role: "Role", hex: "#123456", contrastText: "#123456" });
  }

  return (
    <form onSubmit={handleSubmit} className="color-form">
      <div className="form-field">
        <label htmlFor="role">Role</label>
        <input 
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          id="role"
        /> 
      </div>
      <ColorInput label="Hex" name="hex" value={formData.hex} onChange={handleChange} />
      <ColorInput label="Contrast Text" name="contrastText" value={formData.contrastText} onChange={handleChange} />
      
      <button type="submit" disabled={loading}>
        {loading ? "Checking..." : editingColor ? "UPDATE COLOR" : "ADD COLOR"}
      </button>
      
      {editingColor && <button type="button" onClick={onCancel}>CANCEL</button>}
    </form>
  );
}
