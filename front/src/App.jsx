import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App(){
  const [inputMessage, setInputMessage] = useState("");
  const [mensajeRecibido, setMensajeRecibido] = useState([]);
  const [socket, setSocket] = useState();
  const [user, setUser] = useState("");


  useEffect(() => {
    const newSocket = io("localhost:3000");
    setSocket(newSocket);

    newSocket.on("mensaje", (msg) => {
      setMensajeRecibido(msg);
    })

    setUser(prompt("Ingrese su nombre: "));

    return () => { newSocket.disconnect() }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Como se envían los mensajes...
    socket.emit("mensaje", {user, inputMessage, fecha: new Date().toLocaleTimeString()});
    setInputMessage("");
    e.target.reset();
  }




  return (
    <div className="chat-app">
      <div className="chat-container">
        <header className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">C</div>
            <div>
              <h1 className="chat-title">Chatsito</h1>
              <p className="chat-subtitle">Conversación en vivo</p>
            </div>
          </div>
        </header>

        <main className="chat-messages">
          {mensajeRecibido.length === 0 && (
            <div className="empty-state">
              <p>Aún no hay mensajes</p>
              <span>Sé el primero en escribir algo ✨</span>
            </div>
          )}
          {mensajeRecibido.map((mensaje, i) => (
            <div key={i} className="message">
              <div className="message-bubble">
                <div className="message-meta">
                  <span className="message-user">{mensaje.user}</span>
                  <span className="message-time">{mensaje.fecha}</span>
                </div>
                <p className="message-text">{mensaje.inputMessage}</p>
              </div>
            </div>
          ))}
        </main>

        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            className="chat-input"
            type="text"
            placeholder="Escribe un mensaje..."
            onChange={(e) => setInputMessage(e.target.value)}
            autoComplete="off"
          />
          <button className="chat-send" type="submit" aria-label="Enviar">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );


}

export default App;