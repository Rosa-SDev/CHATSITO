import { use, useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [mensajeRecibido, setMensajeRecibido] = useState([]);
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("localhost:3000");
    setSocket(newSocket);

    newSocket.on("mensaje", (msg) => {
      setMensajeRecibido(msg);
    });

    return () => { newSocket.close() };
  } , [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Cómo se envían los mensajes al servidor
    socket.emit("mensaje", inputMessage);
  }
  
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setInputMessage(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
      { mensajeRecibido.map( mensaje => <div>{mensaje}</div> ) }
    </div>
  )
}

export default App