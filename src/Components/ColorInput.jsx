
export default function ColorInput( { name, value, onChange, label }){
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <br />
            <input
             type="text"
             name= {name}
             value={value}
             onChange={onChange}/>

             <input type="color"
             name={name}
             value={value}
             onChange={onChange} />

             <br />
        </div>
    );

}