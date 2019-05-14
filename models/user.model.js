const storage 	= require('../helpers/storage.helper');
const MODEL_NAME = 'users';

let users = require('../storage/'+ MODEL_NAME +'.json');

function createStorageIfNotExist()
{
	storage.createFileStorage(MODEL_NAME)
		.then(result => { console.log(result) })
    	.catch(err => { console.log(err) }) 
}

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

createStorageIfNotExist();

module.exports = {
   login
}