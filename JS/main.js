// Promise // the data we will eventually get back from the URL when the request is complete
// .all([cookies, donuts, iceCream])
// .then((response) =>
// Promise.all(response.map((res) => res.json()))
// .then((data) => console.log(data))) // we can access and manipulate this data once it loads by subsequently calling then() - to perform multiple operations we can keep chaining to then() making sure we always pass in our data as an argument, and return a value.  place data in a desserts variable
// .catch(err => {
// 	console.error(err);
// });

// const getData = async () => {
// 	const cookies = fetch('https://freerandomapi.cyclic.app/api/v1/desserts?category=Cookie&limit=10');
// 	const donuts = fetch('https://freerandomapi.cyclic.app/api/v1/desserts?category=Donut&limit=10');
// 	const iceCream = fetch('https://freerandomapi.cyclic.app/api/v1/desserts?category=Ice_Cream&limit=10');
// 	const res = await Promise.all([cookies, donuts, iceCream]);
// 	const getPromises = res.map(r => r.json());
// 	const [cookies1, donuts1, iceCream1] = await Promise.all(getPromises);
// 	console.log(cookies1, donuts1, iceCream1);
// };

// getData();

const myData = async (names) => {
  const promises = names.map((name) =>
    fetch(
      `https://freerandomapi.cyclic.app/api/v1/desserts?category=${name}`
    ).then((r) => r.json())
  );

  const desserts = await Promise.all(promises);
  return desserts.map((dessert) => dessert.data).flat();
};

const desserts = await myData([
  "Cookie&limit=10",
  "Donut&limit=10",
  "Ice_Cream&limit=10",
]);

console.log(desserts);
console.log(desserts[0].name);
console.log(desserts[0].category);
console.log(desserts[0].photoUrl);
console.log(desserts[0].description);


const createDessertCards = ({ name, category, photoUrl }) => {
  const dessertCard = document.createElement("div");

  dessertCard.classList.add("dessert-card");
  dessertCard.innerHTML += `
	<div class="card-img">
		<img src="${photoUrl}" alt="dessert icon">
	</div>

	<h4>${name}</h4>
	<p>${category}</p>

	<div class="card-popup-bx">Click to find out more!</div>
		
	</div>
`;

  console.log(dessertCard);

  document.querySelector(".desserts-grid").appendChild(dessertCard);
};

desserts.forEach((card) => {
  createDessertCards(card);
});

const createPopupDesserts = ({name, photoUrl, description}) => {
  const popupDessert = document.createElement("div");

  popupDessert.classList.add("popup-dessert");
  popupDessert.innerHTML += `
    <div class="popup-title-bx">
      <h3>${name}</h3>
      <i class="fas fa-times"></i>
    </div>

    <div class="popup-img">
      <img src="${photoUrl}" alt="dessert picture">
    </div>

    <div class="popup-description">
      <p>${description}</p>
    </div>

    <div class="popup-container-btn">
      <button class="btn btn-primary square-btn">Add To My Favorites</button>
    </div>
  </div>  
    
  `;

  console.log(popupDessert);

  document.querySelector(".site-wrapper").appendChild(popupDessert);
};

desserts.forEach((card) => {
  createPopupDesserts(card);
});