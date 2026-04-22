import "./Color.css";

export default function Color({ color }) {
  console.log("COLOR OBJECT:", color);
  return (
    
   <div
   className="color-card"
  style={{ backgroundColor: color.hex }}
    
   >

    <p className="hex">{color.hex}</p>
    <p className="role">{color.role}</p>
    <p className="contrast">{color.contrastText}</p>
      
   </div>

  );
   
}

 