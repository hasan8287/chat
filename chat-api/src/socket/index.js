const model = require('./model');
const modelChat = require('./model-chat');

const removeDuplicate = (data) => {
	const newArr = [];
	Object.values(data).map((x) => {
		let equal = false;
		newArr.map((entries) => {
			if (x.uid === entries.uid) {
				equal = true;
			}
		})
		if (equal === false) newArr.push(x)
	})
	return newArr;
}
const processSocets = (io) => {
	const user = [];
	io.sockets.on('connection', (client) => {
	  const { id } = client; // get unik id
	  // send first connect
	  client.emit('news', { id, data: user });

	  // register
	  client.on('register', async (data) => {
	  	try {
	  		console.log('register')
		  	// insert data to data online register
				await model.insert(data, id);
				const dataUser = await model.getData();
				const finalArray = removeDuplicate(dataUser)
				client.emit('register-succes', finalArray);
				client.broadcast.emit('add-user', finalArray);
				const dataMsg = await modelChat.getData();
				client.emit('first-msg', dataMsg);
	  	} catch (err) {
	  		console.log('err : ', err)
	  	}
	  	
	  });

	  // send message
	  client.on('send', async (data) => {
	  	client.emit('message', data);
	  	await modelChat.insert(data, data.id)

	  	client.broadcast.emit('message-bc', data)
	    
	  });

	  // if client disconnect
	  client.on('disconnect', async () => {
	    await model.removeData(id);
	    const dataUser = await model.getData();
			client.broadcast.emit('register-succes', dataUser);
	  });

	});
};

module.exports = processSocets;
