const express 	= require('express')
const app 		= express()
const server 	= app.listen(3001);
const io 		= require('socket.io')(server);

const userModel = require('./models/user.model')

var onlineUsers = [];
var testMessages = {};

io.on('connection', function(socket) {
    
	// console.log(socket.id)
	
	socket.on('login/'+socket.id, function(data) {

    	userModel.login(data).then(data => { 
    		io.emit('login/'+socket.id, data);
		}).catch(err => { 
			console.log(err) 
		});

	});

    // ---
    socket.on('onlineUsers', function(user) {

    	if (typeof onlineUsers.find(userOn => userOn.id == user.id) === 'undefined') 
    	{
		    onlineUsers.push(user);
			console.log('someone login..');
		}
		else
		{
			console.log('someone double login..');
		}
		
		io.emit('onlineUsers', onlineUsers);
	});

    socket.on('disconnect', function() {

    	if(onlineUsers.find(user => user.socket_id == socket.id))
    	{
    		onlineUsers = onlineUsers.filter(user => user.socket_id != socket.id);
    		io.emit('onlineUsers', onlineUsers);
    		console.log('someone logout..');
    	}
	});
    
    // --
    socket.on('chat-message', function(data) {

    	if(!testMessages[data.room]) 
    		testMessages[data.room] = [];

    	if(data.message)
	    	testMessages[data.room].push(data);

        io.emit('chat-message-'+data.room, testMessages[data.room]);
    });

});