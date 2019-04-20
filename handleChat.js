const net = require('net');

const client = new net.Socket();
client.connect('port', 'ip', function() {
	console.log('Connected');
});

document.querySelector('#message').addEventListener('click', () => {
	let user = localStorage.getItem('userName');
	let message = document.getElementById('message-text').value;

	let finalMessage = {
		user,
		message
	};

	client.write(JSON.stringify(finalMessage));
});

client.on('data', function(data) {
	let serializedData = data.toString();
	let finalData = JSON.parse(serializedData) || {};

	var node = document.createElement('li');
	var textnode = document.createTextNode(finalData.message);
	node.className = 'list-group-item';
	node.appendChild(textnode);
	document.getElementById('myList').appendChild(node);
});

client.on('close', function() {
	console.log('Connection closed');
});
