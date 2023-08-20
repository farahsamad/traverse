import { Server } from "socket.io";

// const io = require("socket.io")(5000);
const io = new Server(5001, {
  cors: {
    origin: "http://localhost:3000",
  },
});
//     ({
//   cors: { origin: "http://localhost:3000" },
// });

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ id, userid, message }) => {
    // console.log("message =========== ", message);
    socket.broadcast.to(userid).emit("receive-message", {
      userid: userid,
      sender: id,
      message,
    });
  });
});

// userid.forEach((recepient) => {
//   const newRecipients = userid.filter((r) => r !== recepient);
//   newRecipients.push(id);
//   socket.broadcast.to(recepient).emit("receive-message", {
//     userid: newRecipients,
//     // sender: id,
//     message,
//   });
// });
