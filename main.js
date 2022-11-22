const promise = new Promise ((resolve, reject) => {
	resolve('Heck Yeah!')
});

promise
.then((data) => console.log(data));