import { useState } from "react";
import { nanoid } from "nanoid";
//import Color from "./Color/Color";
import ColorInput from "../ColorInput/ColorInput.jsx";
import "./ColorForm.css";



export default function ColorForm({ onAddColor, onUpdateColor, editingColor}){
const [formData ,setFormData] = useState({role:"Role",hex:"#123456",contrastText:"#123456"});

function handleSubmit(event){
    event.preventDefault();
    const newColor = {
        id: nanoid(),
        role: formData.role,
        hex: formData.hex,
        contrastText: formData.contrastText
    };
    onAddColor(newColor);
    setFormData({ role: "Role", hex: "#123456", contrastText: "#123456" }); // to reset after form submission
    console.log("New Color:" , newColor);
    
}

function handleChange(event){
    const { name, value } = event.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: value // event.target.name and value
    }));
    
}

return (
    <>

 <form onSubmit = {handleSubmit} className="color-form">
    <div className="form-field">
    <label htmlFor="role">Role</label>
    <input type="text"
    name="role"
    value={formData.role}
    onChange={handleChange}
    placeholder="Some Role"
    id="role"/> 
</div>
    <ColorInput
        label="Hex"
        name="hex"
        value={formData.hex}
        onChange={handleChange}
      />


    <ColorInput
        label="Contrast Text"
        name="contrastText"
        value={formData.contrastText}
        onChange={handleChange}
      />
     <button type="submit">ADD COLOR</button>

 </form>

</>
);
}