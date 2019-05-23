var fs = require('fs');

const _path = (filename) => './storage/' + filename + '.json'; 

function createFileStorage(filename)
{
	return new Promise((resolve, reject) => {
		try 
		{	
			const path = _path(filename);

		  	if (fs.existsSync(path)) 
		  	{
		    	// console.log('file exists')
		    	resolve(true)
		  	}
		  	else
		  	{
		  		// console.log('file not exists')
		  		fs.writeFile(path, '[]', function (err) {
			        if (err) reject(err);
			        // console.log('Saved!');
			        resolve(true)
			    });
		  	}
		} 
		catch(err) 
		{
		  	reject(err)
		}
	});
}

const newDate = () => new Date().toString();

const getNewId = (array) => {
    if (array.length > 0) 
    {
        return array[array.length - 1].id + 1
    } 
    else 
    {
        return 1
    }
}

function writeJSONFile(filename, content) {
    fs.writeFileSync(_path(filename), JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
   createFileStorage,
   newDate,
   getNewId,
   writeJSONFile
}