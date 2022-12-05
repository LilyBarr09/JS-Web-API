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

const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';


const root = document.documentElement;

// THEME - LIGHT/DARK JS:
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

const setActive = (elm, selector) => {
  if(document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
};

const setTheme = (val) => {
  if(val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  }
  else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

if(currentTheme === dark) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });

  if(currentTheme === dark) {
    switcher[1].classList.add(active);
  }
  else {
    switcher[0].classList.add(active);
  }
};

toggleTheme.addEventListener('click', function () {
	const tab = this.parentElement.parentElement;
	if (!tab.className.includes(open)) {
		tab.classList.add(open); // open is our css class we're including
	}
	else {
		tab.classList.remove(open);
	}
});

for (const elm of switcher) {
	elm.addEventListener('click', function () {
		const toggle = this.dataset.toggle;
		setActive(elm, switcherBtn);
		setTheme(toggle);
	})
};