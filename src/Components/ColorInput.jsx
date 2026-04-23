
import "./ColorInput/ColorInput.css"

export default function ColorInput( { name, value, onChange, label }){
    return (
        <div className="color-input">
            <label htmlFor={name}>{label}</label>

        <div className="input-row">    
            <input
             type="text"
             name= {name}
             value={value}
             onChange={onChange}/>

             <input type="color"
             name={name}
             value={value}
             onChange={onChange} />

            </div> 
        </div>
    );

}