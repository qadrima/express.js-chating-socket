const storage 	= require('../helpers/storage.helper');
const MODEL_NAME = 'users';

let users;

storage.createFileStorage(MODEL_NAME).then(result => { 
	users = require('../storage/'+ MODEL_NAME +'.json') 
}).catch(err => { 
    console.log(err) 
}) 

function login(user)
{
	return new Promise((resolve, reject) => {
		
		var auth = users.find(usr => usr.email == user.email);
		
		if(!auth)
		{ 
	        const obj = {
	        	id 			: storage.getNewId(users),
	            createdAt 	: storage.newDate(),
	            updatedAt 	: storage.newDate()
	        } 
	        user = { ...obj, ...user }
			users.push(user);
			storage.writeJSONFile(MODEL_NAME, users);
			resolve(user);
		}
		else 
		{
			resolve(auth);
		}
	});
}

module.exports = {
   login
}