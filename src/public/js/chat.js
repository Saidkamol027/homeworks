const socket = io()

const loginForm = document.getElementById('login-form')
const chatBox = document.getElementById('chat-box')
const msgForm = document.getElementById('msg-form')
const msgInput = document.getElementById('msg')
const messagesDiv = document.getElementById('messages')

let currentRoom = null
let username = null

loginForm.addEventListener('submit', e => {
	e.preventDefault()
	const room = document.getElementById('room').value.trim()
	const user = document.getElementById('username').value.trim()

	if (room && user) {
		currentRoom = room
		username = user

		socket.emit('joinRoom', { room, username })

		loginForm.style.display = 'none'
		chatBox.style.display = 'block'
	}
})

msgForm.addEventListener('submit', e => {
	e.preventDefault()
	const msg = msgInput.value.trim()
	if (msg && currentRoom) {
		socket.emit('chatMessage', { room: currentRoom, msg, username })
		msgInput.value = ''
	}
})

msgInput.addEventListener('input', () => {
	if (currentRoom) {
		socket.emit('typing', { room: currentRoom, username })
	}
})

socket.on('typing', username => {
	const typingDiv = document.getElementById('typing')
	typingDiv.innerText = `${username} yozmoqda...`
	setTimeout(() => {
		typingDiv.innerText = ''
	}, 3000)
})

socket.on('message', ({ msg, sender, time }) => {
	const msgElem = document.createElement('div')
	msgElem.classList.add('message', sender === username ? 'me' : 'other')
	msgElem.innerHTML = `
		<div class="meta">${sender} • ${time}</div>
		<div class="text">${msg}</div>
	`
	messagesDiv.appendChild(msgElem)
	messagesDiv.scrollTop = messagesDiv.scrollHeight
})
