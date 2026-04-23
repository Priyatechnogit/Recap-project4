import { useState } from "react";
import "./Color.css";

export default function Color({ color, onDelete }) {
  const [ showConfirm, setShowConfirm] = useState(false);

  const handleCancel = () => setShowConfirm(false);

  const handleConfirmDelete = () => {
    onDelete(color.id);
    setShowConfirm(false);
  };
  return (
    
   <div
   className="color-card"
  style={{ backgroundColor: color.hex }}
    
   >

    <p className="hex">{color.hex}</p>
    <p className="role">{color.role}</p>
    <p className="contrast">{color.contrastText}</p>
      
      {/* Delete Button */}
     {!showConfirm ? (
        <button className="delete-btn" onClick={() => setShowConfirm(true)}>
          Delete
        </button>
      ) : (
        <div className="confirm-actions">
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button className="confirm-delete-btn" onClick={handleConfirmDelete}>
            Delete
          </button>
        </div>
      )}

         {showConfirm && (
      <p className="color-card-highlight">
        Really Delete {color.role} color?
      </p>
    )}
   </div>

  );
   
}

 