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
	let getDom = document.getElementById('chat').innerHTML;

	getDom += `<div id='${Math.random()}' class="media text-muted pt-3">
      <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
      <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong class="d-block text-gray-dark">@${finalData.user}</strong>
       ${finalData.message}
      </p>
    </div>`;

	document.getElementById('chat').innerHTML = getDom;
});

client.on('close', function() {
	console.log('Connection closed');
});
