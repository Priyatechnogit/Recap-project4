import "./Color.css";

export default function Color({ color }) {
  return (
   <div
   className="color-card"
   style={{
    "--bg-color": color.hex,
    "--text-color": color.contrastText,
    }}
   >

    <p className="color-card-headline">{color.hex}</p>
    <p>{color.role}</p>
    <p>contrast: {color.contrastText}</p>
      
   </div>

  )
   
}
