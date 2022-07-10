const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
var audio = new Audio('tone.mp3');

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const messageContainer = document.querySelector(".container")
// const url = 'https://cors.io/?https://api.webuntis.dk/api/status';

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position!='right'){
        audio.play();
    }
    
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append('You : ${message}','right');
    socket.emit('send',message);
    messageInput.value= ''
})

// const io = require('socket.io')(8000, {
//     cors: {
//       origin: '*',
//     }
//   });

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append('${name} joined the chat', 'right')
})

socket.on('receive', data => { 
    append('${data.name}: ${data.message}', 'left')
})

socket.on('left', name => { 
    append('${name}left the chat', 'right')
})
