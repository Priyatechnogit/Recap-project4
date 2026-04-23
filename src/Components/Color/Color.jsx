import { useState, useEffect } from "react";
import ColorInput from "../ColorInput/ColorInput";
import "./Color.css";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";

export default function Color({ color, onDelete, isEditing, onUpdateColor, onEdit, onCancel }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [preview, setPreview] = useState(color|| { 
  role: "", 
  hex: "#000000", 
  contrastText: "#000000" 
});

  // Updates the internal preview whenever edit mode is triggered
  useEffect(() => {
     if (isEditing) {
    setPreview(color);}
  }, [color, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateColor(preview);
  };

  return (
    <div 
      className="color-card" 
      style={{ backgroundColor: isEditing ? preview.hex : color.hex,
        color: isEditing ? preview.contrastText : color.contrastText 
      }}
    >
      {!isEditing ? (
        <>
         <div className="hex-row">
            <p className="hex">{color.hex}</p>
            <CopyToClipboard hexValue={color.hex} />
        </div>
          <p className="role">{color.role}</p>
          <p className="contrast">{color.contrastText}</p>
          

          {!showConfirm ? (
            <button className="delete-btn" onClick={() => setShowConfirm(true)}>Delete</button>
          ) : (
            <div className="confirm-actions">
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="confirm-delete-btn" onClick={() => onDelete(color.id)}>Confirm</button>
            </div>
          )}
          <button className="edit-btn" onClick={onEdit}>Edit</button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="edit-row">
            <label>Role</label>
            <input name="role" value={preview.role} onChange={handleChange} />
          </div>
          
          <ColorInput label="Hex" name="hex" value={preview.hex} onChange={handleChange} />
          <ColorInput label="Contrast Text" name="contrastText" value={preview.contrastText} onChange={handleChange} />

          <div className="confirm-actions">
            <button type="submit">UPDATE</button>
            <button type="button" onClick={onCancel}>CANCEL</button>
          </div>
        </form>
      )}
    </div>
  );
}
