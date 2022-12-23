const favoriteDesserts = [];

//  SORT DATA FUNCTION
const exampleSort = (data) => {
  return data.sort(function(a, b){
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
});
};

const reverseSort = (data) => {
  return data.sort((a, b) => {
    if(a.name < b.name) {return 1};
    if(a.name > b.name) {return -1};
    return 0;
  });
};


// FETCH DATA:
const myData = async (names) => {
  // desserts is an array and I have to map to extract each name for the fetch:
  const promises = names.map((name) =>
    fetch(
      `https://freerandomapi.cyclic.app/api/v1/desserts?category=${name}`
    ).then((r) => r.json()) // convert to json
  );

  const desserts = await Promise.all(promises); // storing returned data from all the fetches - 3 categories - in a variable
  
  console.log(exampleSort(desserts.map((dessert) => dessert.data).flat()));

  console.log(reverseSort(desserts.map((dessert) => dessert.data).flat()));
 
  return desserts.map((dessert) => dessert.data).flat();
};

  
// ROOT-LEVEL AWAIT & GLOBAL VARIABLE - it must be an await in order to work with the async function:
const desserts = await myData([
  "Cookie&limit=10",
  "Donut&limit=10",
  "Ice_Cream&limit=10",
]);



// CREATING DESSERT CARDS:
const createDessertCards = ({_id, name, category, photoUrl}) => {
  const dessertCard = document.createElement("div");

  dessertCard.setAttribute('id', _id);
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

  document.querySelector(".desserts-grid").appendChild(dessertCard);
};



// CREATE DESSERT CARD MODALS:
const createModalDesserts = ({_id, name, photoUrl, description}) => {
  
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
        <button id="${_id}" class="btn btn-primary square-btn">Add To My Favorites</button>
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

const donutFilter = desserts.filter(dessert => dessert.category === "Donut").length;

const iceCreamFilter = desserts.filter(dessert => dessert.category === "Ice_Cream").length;

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



const root = document.documentElement;



// Setting Light-Dark Theme 
const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';


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



//Attributes Applied To The Elements that will Trigger the Modal Open/Close
const modalOpen = '[data-open]'; // on dessert card - name of dessert
const modalClose = '[data-close]'; //on modal itself - icon
const isVisible = 'is-visible'; // on modal itself


// MODALS
const openModal = document.querySelectorAll(modalOpen); // node list of all the data-opens
const closeModal = document.querySelectorAll(modalClose); // node list of all the data-closes

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





//Dessert Cards Filter
const dataFilter = '[data-filter]'; // On Nav li item
const dessertData = '[data-item]'; // On dessert card itself = category




const filterCards = () => {
  // Data Filters
  const filterLink = document.querySelectorAll(dataFilter); //on li item data-filter cookie, donut, ice cream
  const dessertItems = document.querySelectorAll(dessertData);// on dessert card data item category
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
}
filterCards();

//  SORT ALPHA AND REVERSE ALPHA
const dessertGrid = document.querySelector(".desserts-grid");
const sortAlphaLink = document.querySelector(".alpha");
const sortReverseLink = document.querySelector(".reverse-alpha");

sortAlphaLink.addEventListener('click', () => {
  dessertGrid.innerHTML = "";
  const sorted = exampleSort(desserts);
  createAllCards(sorted);
  filterCards();
});

sortReverseLink.addEventListener('click', () => {
  dessertGrid.innerHTML = "";
  const reverseSorted = reverseSort(desserts);
  createAllCards(reverseSorted);
  filterCards();
});



/// FAVORITES FULL-PAGE MODAL
const openFavoritesModal = document.querySelector('.favorites-link-open');

const $modal = document.getElementById('favorites');

const closeFavoritesModal = document.querySelector('.favorites-link-closed');

openFavoritesModal.addEventListener('click', () => {
  $modal.classList.remove('hidden');
});

closeFavoritesModal.addEventListener('click', () => {
  $modal.classList.add('hidden');
});
 


// MOVE FAVORITES FROM MAIN PAGE TO FAVORITES MODAL
// write two functions: 1. Remove/Add HTML from the DOM, use append 2. Splice from Desserts array and add to Favorites Array from the fetch data array 3. invoke both of these functions inside de add Event Listener function. 4. Ask Mike: how to access info outside async function

// get a reference to the list of dessert cards:
const cardsList = document.getElementsByClassName('square-btn'); // array of elements of all my buttons on modals

const moveToFavorites = () => {
  favoriteDesserts = desserts.splice(0);
  return favoriteDesserts;
};

const moveBackToMain = () => {
  desserts = favoriteDesserts.splice(0);
  return desserts;
};

cardsList.addEventListener('click', () => {
  desserts.forEach((card) => {
      moveToFavorites();
    })
    document.querySelector(".fav-container").appendChild(".dessert-card");
  });















