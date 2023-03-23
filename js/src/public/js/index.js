const socket = io();
socket.emit("message", "Me conecto desde un websocket") // cuando un cliente se conecte entonces se emite este evento de tipo mensaje con el mensaje









console.log("Estoy ejecutando js"); //esto es por el handlebars