
import "./ColorInput.css";

export default function ColorInput( { name, value, onChange, label }){
  
    return (
        <div className="color-input">
            <label htmlFor={name}>{label}</label>

        <div className="input-row">    
            <input
             type="text"
             id={name}
             name= {name}
             value={value}
             onChange={onChange}/>

             <input type="color"
             id={name}
             name={name}
             value={value}
             onInput={onChange} 
            onChange={onChange}
            
            />

            </div> 
        </div>
    );

}