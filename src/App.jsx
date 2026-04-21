import { initialColors } from "./lib/colors.js";
import Color from "./Components/Color/Color.jsx";
import "./App.css";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
      
      {initialColors.map((color) => (
        <Color key={color.id} color={color}  />  
        ))}
    </>
  );
}

export default App;
