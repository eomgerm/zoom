const socket = io();

const welcome = document.getElementById("welcome");
const roomForm = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;
let roomName = "";

const handleSubmitMessage = (event) => {
  event.preventDefault();
  const input = room.querySelector("#message input");
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${input.value}`);
    input.value = "";
  });
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;

  const messageForm = room.querySelector("#message");
  messageForm.addEventListener("submit", handleSubmitMessage);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const roomInput = roomForm.querySelector("#roomName");
  const nicknameInput = roomForm.querySelector("#nickname");
  socket.emit("enter_room", roomInput.value, nicknameInput.value, showRoom);
  roomName = roomInput.value;
  roomInput.value = "";
  nicknameInput.value = "";
};

roomForm.addEventListener("submit", handleRoomSubmit);

const addMessage = (message) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
};

socket.on("welcome", (nickname) => {
  addMessage(`${nickname} joined!`);
});

socket.on("bye", (nickname) => {
  addMessage(`${nickname} left!`);
});

socket.on("new_message", addMessage);
