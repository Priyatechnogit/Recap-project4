import { useState, useEffect } from "react";
import ColorInput from "../ColorInput/ColorInput";
import "./Color.css";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import useContrast from "../hooks/useContrast";

export default function Color({
  color,
  onDelete,
  isEditing,
  onUpdateColor,
  onEdit,
  onCancel,
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  // ✅ safe fallback prevents crashes when mapping fails
  const safeColor = color || {
    id: "",
    role: "",
    hex: "#000000",
    contrastText: "#000000",
  };

  const [preview, setPreview] = useState(safeColor);

  const { loading, checkContrast } = useContrast();

  
   /* Sync preview when editing starts */
 
  useEffect(() => {
    if (isEditing && color) {
      setPreview(color);
    }
  }, [isEditing, color]);

  /*  Handle input change */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPreview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  /* Update Color */
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await checkContrast(
      preview.hex,
      preview.contrastText
    );

    const updatedColor = {
      ...preview,
      contrastScore: result?.overall,
    };

    onUpdateColor(updatedColor);
    onCancel();
  };

  return (
    <div
      className="color-card"
      style={{
        backgroundColor: isEditing ? preview.hex : safeColor.hex,
        color: isEditing ? preview.contrastText : safeColor.contrastText,
      }}
    >

      {/* View mode  */}
      {!isEditing ? (
        <>
          {/* HEX + COPY */}
          <div className="hex-row">
            <p className="hex">{safeColor.hex}</p>
            <CopyToClipboard hexValue={safeColor.hex} />
          </div>

          <p className="role">{safeColor.role}</p>

          {loading && <p>Checking contrast...</p>}

          {safeColor.contrastScore && (
            <div>
              Contrast score: {safeColor.contrastScore}
            </div>
          )}

          <p className="contrast">{safeColor.contrastText}</p>

          {/* Delete */}
          {!showConfirm ? (
            <button onClick={() => setShowConfirm(true)}>
              Delete
            </button>
          ) : (
            <div className="confirm-actions">
              <button onClick={() => setShowConfirm(false)}>
                Cancel
              </button>

              <button onClick={() => onDelete(safeColor.id)}>
                Confirm
              </button>
            </div>
          )}

          {/* Edit */}
          <button onClick={() => onEdit(safeColor)}>
            Edit
          </button>
        </>
      ) : (
        /* Edit Mode */
        <form onSubmit={handleSubmit} className="edit-form">
          
          <div className="edit-row">
            <label>Role</label>
            <input
              name="role"
              value={preview.role || ""}
              onChange={handleChange}
            />
          </div>

          <ColorInput
            label="Hex"
            name="hex"
            value={preview.hex || "#000000"}
            onChange={handleChange}
          />

          <ColorInput
            label="Contrast Text"
            name="contrastText"
            value={preview.contrastText || "#000000"}
            onChange={handleChange}
          />

          <div className="confirm-actions">
            <button type="submit">UPDATE</button>
            <button type="button" onClick={onCancel}>
              CANCEL
            </button>
          </div>
        </form>
      )}
    </div>
  );
}