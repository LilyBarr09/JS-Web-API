// Getting Data:
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

// console.log(desserts);
// console.log(desserts[0].name);
// console.log(desserts[0].category);
// console.log(desserts[0].photoUrl);
// console.log(desserts[0].description);

// add favorite key:value pair to data set to false
// then sort function


// Creating Dessert Cards:
const createDessertCards = ({ name, category, photoUrl}) => {
  const dessertCard = document.createElement("div");

  dessertCard.classList.add("dessert-card");
  dessertCard.setAttribute(`data-item`, category);
  dessertCard.setAttribute(`data-open`, name);
  dessertCard.innerHTML += `
	<div class="card-img">
		<img src="${photoUrl}" alt="dessert icon">
	</div>

	<h4>${name}</h4>
	<p>${category}</p>

	<div class="card-popup-bx">Click to find out more!</div>
		
	</div>
`;
  // console.log(dessertCard);
  document.querySelector(".desserts-grid").appendChild(dessertCard);
};

// desserts.forEach((card) => {
//   createDessertCards(card);
// });

// Creating Dessert Cards Modals:
const createModalDesserts = ({name, photoUrl, description}) => {
  
  const modalDessert = document.createElement("div");
  modalDessert.setAttribute('id', name);
  modalDessert.classList.add("modal");
  modalDessert.setAttribute('data-animation', 'slideInOutTop');
  
  modalDessert.innerHTML += `
    <div class="modal-dialogue">
      
      <div class="modal-title-bx">
        <h3>${name}</h3>
        <i class="fas fa-times" data-close></i>
      </div>

      <div class="modal-img">
        <img src="${photoUrl}" alt="dessert picture">
      </div>

      <div class="modal-description">
        <p>${description}</p>
      </div>

      <div class="modal-container-btn">
        <button class="btn btn-primary square-btn">Add To My Favorites</button>
      </div>
      
    </div>    
  `;
  console.log(modalDessert);
  document.querySelector(".site-wrapper").appendChild(modalDessert);
};

const createAllCards = (allDesserts) => {
  allDesserts.forEach((card) => {
  createDessertCards(card);
  createModalDesserts(card);
});
};

createAllCards(desserts);

// DESSERT TOTALS COUNT BOX 
const cookieFilter = desserts.filter(dessert => dessert.category === "Cookie").length;
console.log(cookieFilter);

const donutFilter = desserts.filter(dessert => dessert.category === "Donut").length;
console.log(donutFilter);

const iceCreamFilter = desserts.filter(dessert => dessert.category === "Ice_Cream").length;
console.log(iceCreamFilter);

const dessertDataCounts = (cookie, donut, iceCream) => {
  const dataCounts = document.createElement("div");

  dataCounts.classList.add("data-box");
  
  dataCounts.innerHTML = `
    <div>
      <h3 class="header-md">Dessert Totals</h3>
      <div class="count-flex-box">
        <div class="header-sm">Cookies: ${cookie}</div>
        <div class="header-sm">Donuts: ${donut}</div>
        <div class="header-sm">Ice Cream: ${iceCream}</div>
      </div>
    </div>
   
  `;
  console.log(dataCounts);
  document.querySelector(".dessert-count").appendChild(dataCounts);

};
dessertDataCounts(cookieFilter, donutFilter, iceCreamFilter);


// Setting Light-Dark Theme 
const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

//Attributes Applied To The Elements that will Trigger the Modal Open/Close
const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

//Dessert Cards Filter
const dataFilter = '[data-filter]';
const dessertData = '[data-item]';

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

// MODALS
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

for(const elm of openModal) {
  elm.addEventListener('click', function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  })
};

for(const elm of closeModal) {
  elm.addEventListener('click', function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  })
};

document.addEventListener('click', (e) => {
 if(e.target === document.querySelector('.modal.is-visible'))
 document.querySelector('.modal.is-visible').classList.remove(isVisible);
});

document.addEventListener('keyup', (e) => {
  if(e.key === 'Escape')
  document.querySelector('.modal.is-visible').classList.remove(isVisible);
});

// Data Filters
const filterLink = document.querySelectorAll(dataFilter);
const dessertItems = document.querySelectorAll(dessertData);


for (const link of filterLink) {
  link.addEventListener('click', function () {
    setActive(link, '.filter-link');
    const filter = this.dataset.filter;
    dessertItems.forEach((card) => {
      if(filter === 'all') {
        card.style.display = 'flex';
      }
      else if (card.dataset.item === filter) {
        card.style.display = 'flex';
      }
      else {
        card.style.display = 'none';
      }
    })
  })
};

// ADD - REMOVE FROM FAVORITES
// get favorites from empty array
const favorites = [];

//add class 'fav' to each favorite
favorites.forEach(function(favorite) {
  document.getElementById(favorite).className = 'fave';
});


