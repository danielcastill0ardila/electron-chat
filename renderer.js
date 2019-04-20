const remote = require('electron').remote;
const main = remote.require('./main.js');

document.querySelector('#login-button').addEventListener('click', () => {
	let userName = document.getElementById('username').value;

	if (userName) {
		saveUser(userName);
		main.openWindow();
	}
});

function saveUser(user) {
	localStorage.setItem('userName', user);
}
