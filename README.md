# Chatsito

Práctica de **chat en tiempo real** para la materia de Ingeniería de Software. Varios usuarios se conectan desde el navegador, escriben mensajes y todos los ven al instante gracias a WebSockets.

## Stack

| Parte    | Tecnología                                             |
|----------|--------------------------------------------------------|
| Servidor | Node.js, **Express 5**, **Socket.io 4**                |
| Frontend | **React 19** + **Vite**, `socket.io-client` 4          |

## Estructura

```
CHATSITO/
├── server/   # Servidor Express + Socket.io (index.js)
└── front/    # Aplicación React creada con Vite (src/App.jsx)
```

## Cómo funciona

1. Al abrir la página, el navegador pide el nombre de usuario y se conecta al servidor en `localhost:3000`.
2. Al conectarse, el servidor le envía al cliente todo el historial de mensajes.
3. Cada mensaje que se manda (`{ user, inputMessage, fecha }`) se guarda en el servidor, y el servidor reenvía la **lista completa** de mensajes a todos los clientes conectados.

El servidor y el cliente se comunican con un único evento de Socket.io: `mensaje`.

## Requisitos

- Node.js y npm

## Cómo ejecutarlo

Se necesitan **dos terminales**.

**Terminal 1: servidor (puerto 3000)**

```bash
cd server
npm install
npm start
```

Cuando arranque, verás `Corriendo en el puerto 3000`.

**Terminal 2: frontend (Vite)**

```bash
cd front
npm install
npm run dev
```

Vite muestra en consola la URL de la aplicación (por defecto `http://localhost:5173`). Ábrela en el navegador, o en varias pestañas para probar el chat.

### Otros scripts del frontend

| Script            | Qué hace                                   |
|-------------------|--------------------------------------------|
| `npm run build`   | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la build generada         |
| `npm run lint`    | Revisa el código con ESLint                |

## Limitaciones

Es un proyecto de práctica, así que tiene limitaciones conocidas:

- **Mensajes en memoria:** el historial se guarda en un arreglo dentro del proceso del servidor. Si se reinicia el servidor, se pierden todos los mensajes. No hay base de datos.
- **CORS abierto:** el servidor de Socket.io acepta conexiones de cualquier origen (`origin: '*'`).
- **URL del servidor fija:** el cliente se conecta siempre a `localhost:3000`. Aunque `npm run dev` usa `vite --host` y la página puede abrirse desde otro dispositivo de la red, ese dispositivo intentará conectarse a su propio `localhost` y no recibirá mensajes.
- **Nombre con `prompt()`:** el nombre de usuario se pide con un `prompt()` del navegador cada vez que se carga la página. No hay registro, autenticación ni validación del nombre.
- **Sin validación de mensajes:** se pueden enviar mensajes vacíos.
- **Si se cancela el `prompt()`**, el usuario queda sin nombre.
