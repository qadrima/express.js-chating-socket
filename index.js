const express 	= require('express')
const app 		= express()
const server 	= app.listen(3001);
const io 		= require('socket.io')(server);

const userModel = require('./models/user.model')

var onlineUsers = []

io.on('connection', function(socket) {
    
	// console.log(socket.id)
	
	socket.on('login/'+socket.id, function(data) {

    	userModel.login(data).then(data => { 
    		io.emit('login/'+socket.id, data);
		}).catch(err => { 
			console.log(err) 
		});

	});

 //    // ---
 //    socket.on('onlineUsers', function(data) {
 //    	onlineUsers.push(data);
 //    	io.emit('onlineUsers', onlineUsers);
	// });

 //    socket.on('disconnect', function(){
 //    	onlineUsers = onlineUsers.filter(user => user.id != socket.id);
 //    	io.emit('onlineUsers', onlineUsers);
	// });
    
 //    // --
 //    socket.on('message', function(data) {
 //        io.emit('message-'+data.sender.id, data);
 //    });

});