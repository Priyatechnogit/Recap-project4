import { useState } from "react";
import { nanoid } from "nanoid";
//import Color from "./Color/Color";
import ColorInput from "./ColorInput";


export default function ColorForm({ onAddColor }){
const [formData ,setFormData] = useState({role:"Role",hex:"#rrggbb",contrastText:"#ffffff"});

function handleSubmit(event){
    event.preventDefault();
    const newColor = {
        id: nanoid(),
        role: formData.role,
        hex: formData.hex,
        contrastText: formData.contrastText
    };
    onAddColor(newColor);
    setFormData({ role: "Role", hex: "#123456", contrastText: "#ffffff" }); // to reset after form submission
    console.log("New Color:" , newColor);
    
}

function handleChange(event){
    const { name, value } = event.target;

    setFormData((prevData) => ({
        ...prevData,
        [event.target.name]:event.target.value
    }));
    
}

return (
    <>

 <form onSubmit = {handleSubmit}>
    <label htmlFor="role">Role</label>
    <br/>
    <input type="text"
    name="role"
    value={formData.role}
    onChange={handleChange}
    placeholder="Some Role"
    id="role"/> <br/>

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