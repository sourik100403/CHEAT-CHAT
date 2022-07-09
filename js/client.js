const socket = io('http://localhost:8000');

//get dom element in respective js varible

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");

//audio that will be play when receving message

var audio = new Audio('ting.mp3');

//function append which will appended in the container

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
        audio.play();
    }
}
//ask new user for his/her name for server know that
const name =  prompt("enter your name to join");
socket.emit('new-user-joined', name);

//if new user join, receive his/her name from the server 
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');     
}) 

//if server send a message receive it
socket.on('receive',data=>{
    append(` ${data.name}: ${data.message}`,'left');    
}) 

//if anyone left know others
socket.on('left', name =>{
    append(`${name} left the chat`,'left')
}) 

//if the form get submitted ,send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you:${message}`,'right');
    socket.emit('send', message);
    messageInput.value = '';
})
