const net = require('net');
const fs = require('fs');
const client = new net.Socket();
client.connect(8080, '192.168.0.18', function() {
	client.on('data', function(data) {
		// fs.writeFileSync('hi.png', JSON.parse(JSON.stringify(data)).data);
		console.log('entr');
		if (isJson(data.toString())) {
			let finalData = JSON.parse(data.toString()) || {};
			let getDom = document.getElementById('chat').innerHTML;

			getDom += `<div style="background:${finalData.user === localStorage.getItem('userName')
				? 'white;'
				: 'whitesmoke;'}" id='${Math.random()}' class="media text-muted pt-3">
		  <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
		  <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
		    <strong class="d-block text-gray-dark">@${finalData.user}</strong>
		   ${finalData.message}
		  </p>
		</div>`;

			document.getElementById('chat').innerHTML = getDom;
		} else {
			var bytes = new Uint8Array(JSON.parse(JSON.stringify(data)).data);

			let getDom = document.getElementById('chat').innerHTML;

			getDom += `<div id='${Math.random()}' class="media text-muted pt-3">
		  <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
		  <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
		    <strong class="d-block text-gray-dark">@Image</strong>
				<img height="150" width="150" src="data:image/png;base64,${encode(bytes)}"/> 
		  </p>
		</div>`;

			document.getElementById('chat').innerHTML = getDom;
		}
	});
});

document.querySelector('#message').addEventListener('click', () => {
	let user = localStorage.getItem('userName');
	let message = document.getElementById('message-text').value;
	let finalMessage = {
		user,
		message
	};
	client.write(JSON.stringify(finalMessage));
	document.getElementById('message-text').value = '';
});

document.querySelector('#file-transfer').addEventListener('change', () => {
	try {
		let file = document.getElementById('file-transfer').files[0];
		let buffer = fs.readFileSync(file.path);
		client.write(buffer);
	} catch (error) {
		alert('Please, Try again!');
	}
});

function encode(input) {
	var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var output = '';
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;

	while (i < input.length) {
		chr1 = input[i++];
		chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
		chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
	}
	return output;
}

function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
