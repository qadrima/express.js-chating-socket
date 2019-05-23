const storage 	 = require('../helpers/storage.helper');

function createChatRoom(room_id)
{
	return new Promise((resolve, reject) => {

		storage.createFileStorage(room_id)
			.then(result => { resolve(true) })
	    	.catch(err => { reject(err) }) 
    });
}

function writeChat(data)
{
	return new Promise((resolve, reject) => {

		let chats = require('../storage/'+ data.room +'.json');

		const obj = {
	       	id 			: storage.getNewId(chats),
	        createdAt 	: storage.newDate(),
	        updatedAt 	: storage.newDate()
	    }

	    chat = { ...obj, ...data }

	    chats.push(chat);
	    storage.writeJSONFile(data.room, chats);

		resolve(chats);
    });
}

const fetchDataChats = (room) => {
    return require('../storage/'+ room +'.json');
}

module.exports = {
   createChatRoom,
   writeChat,
   fetchDataChats
}