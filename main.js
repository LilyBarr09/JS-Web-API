const cookies = fetch('https://freerandomapi.cyclic.app/api/v1/desserts?category=Cookie&limit=10');
const donuts = fetch('https://freerandomapi.cyclic.app/api/v1/desserts?category=Donut&limit=10');
const iceCream = fetch('https://freerandomapi.cyclic.app/api/v1/desserts?category=Ice_Cream&limit=10');

Promise
.all([cookies, donuts, iceCream])
.then((response) => 
Promise.all(response.map((res) => res.json()))
.then((data) => console.log(data))); //place data in a desserts variable



