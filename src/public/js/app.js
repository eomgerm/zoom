const socket = io();

const welcome = document.getElementById("welcome");
const roomForm = welcome.querySelector("form");

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = roomForm.querySelector("input");
  socket.emit("enter_room", { payload: input.value });
  input.value = "";
};

roomForm.addEventListener("submit", handleRoomSubmit);
