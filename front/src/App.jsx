import { useState } from "react";

function App() {
  const [inputMessage, setInputMessage] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Cómo se envían los mensajes al servidor
  }
  
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setInputMessage(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default App