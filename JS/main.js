const root = document.documentElement;
//  SORT DATA FUNCTION
const exampleSort = (data) => {
  return data.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

const reverseSort = (data) => {
  return data.sort((a, b) => {
    if (a.name < b.name) {
      return 1;
    }
    if (a.name > b.name) {
      return -1;
    }
    return 0;
  });
};

// FETCH DATA:
const myData = async (names) => {
  const promises = names.map(
    (name) =>
      fetch(
        `https://freerandomapi.cyclic.app/api/v1/desserts?category=${name}`
      ).then((r) => r.json())
  );

  const desserts = await Promise.all(promises); 

  const addFav = desserts
    .map((dessert) => dessert.data)
    .flat()
    .map((dessert) => {
      return { ...dessert, favorite: false };
    });
  return addFav;
};

// ROOT-LEVEL AWAIT & GLOBAL VARIABLE
const desserts = await myData([
  "Cookie&limit=10",
  "Donut&limit=10",
  "Ice_Cream&limit=10",
]);

// CREATING DESSERT CARDS:
const createDessertCards = ({ _id, name, category, photoUrl }, favorite) => {
  const dessertCard = document.createElement("div");

  dessertCard.setAttribute("id", _id);
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
  if (favorite === true) {
    document.querySelector(".fav-container").append(dessertCard);
  } else {
    document.querySelector(".desserts-grid").append(dessertCard);
  }
};

// CREATE DESSERT CARD MODALS:
const createModalDesserts = ({
  _id,
  name,
  photoUrl,
  description,
  favorite,
}) => {
  const modalDessert = document.createElement("div");
  modalDessert.setAttribute("id", name);
  modalDessert.classList.add("modal");
  modalDessert.setAttribute("data-animation", "slideInOutTop");

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
        <button data-id="${_id}" class="btn btn-primary square-btn">${
    !favorite ? "Add To My Favorites" : "Remove from Favorites"
  }</button>
       
      </div>
      
    </div>    
  `;

  if (favorite) {
    document.querySelector(".favorites-full-modal").append(modalDessert);
  } else {
    document.querySelector(".site-wrapper").append(modalDessert);
  }
};

const createAllCards = (allDesserts, favorite) => {
  allDesserts.forEach((card) => {
    createDessertCards(card, favorite); 
    createModalDesserts(card);
  });
};

createAllCards(desserts, false);

// DESSERT TOTALS COUNT BOX
const cookieFilter = desserts.filter(
  (dessert) => dessert.category === "Cookie"
).length;

const donutFilter = desserts.filter(
  (dessert) => dessert.category === "Donut"
).length;

const iceCreamFilter = desserts.filter(
  (dessert) => dessert.category === "Ice_Cream"
).length;

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
  document.querySelector(".dessert-count").append(dataCounts);
};
dessertDataCounts(cookieFilter, donutFilter, iceCreamFilter);

// Setting Light-Dark Theme
const theme = "theme";
const dataTheme = "data-theme";
const themeTab = ".theme-tab";
const switcherBtn = ".switcher-btn";
const dark = "dark";
const light = "light";
const open = "open";
const active = "active";

// THEME - LIGHT/DARK JS:
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
};

const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

if (currentTheme === dark) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });

  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

toggleTheme.addEventListener("click", function () {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open); 
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener("click", function () {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

//Attributes Applied To The Elements that will Trigger the Modal Open/Close
const modalOpen = "[data-open]"; 
const modalClose = "[data-close]";
const isVisible = "is-visible"; 

// MODALS

const activateModals = () => {
  const openModal = document.querySelectorAll(modalOpen); 
  const closeModal = document.querySelectorAll(modalClose); 

  for (const elm of openModal) {
    elm.addEventListener("click", function () {
      const modalId = this.dataset.open;
      document.getElementById(modalId).classList.add(isVisible);
    });
  }

  for (const elm of closeModal) {
    elm.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.classList.remove(
        isVisible
      );
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target === document.querySelector(".modal.is-visible"))
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape")
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
  });
};

activateModals();

//Dessert Cards Filter
const dataFilter = "[data-filter]"; 
const dessertData = "[data-item]";

const filterCards = () => {
  // Data Filters
  const filterLink = document.querySelectorAll(dataFilter); 
  const dessertItems = document.querySelectorAll(dessertData); 
  for (const link of filterLink) {
    link.addEventListener("click", function () {
      setActive(link, ".filter-link");
      const filter = this.dataset.filter;
      dessertItems.forEach((card) => {
        if (filter === "all") {
          card.style.display = "flex";
        } else if (card.dataset.item === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
};
filterCards();

//  SORT ALPHA AND REVERSE ALPHA

// SORTING MAIN PAGE
const dessertGrid = document.querySelector(".desserts-grid");
const sortAlphaLink = document.querySelector(".alpha");
const sortReverseLink = document.querySelector(".reverse-alpha");

sortAlphaLink.addEventListener("click", () => {
  dessertGrid.innerHTML = "";
  const sorted = exampleSort(desserts, false); 
  createAllCards(sorted, false);
  filterCards();
});

sortReverseLink.addEventListener("click", () => {
  dessertGrid.innerHTML = "";
  const reverseSorted = reverseSort(desserts, false); 
  createAllCards(reverseSorted, false);
  filterCards();
});

// SORTING FAVORITES PAGE
const favoritesGrid = document.querySelector(".fav-container");
const sortAlphaFave = document.getElementById("alpha-faves");
const sortReverseFave = document.getElementById("reverseAlpha-faves");

sortAlphaFave.addEventListener("click", () => {
  const trueResults = desserts.filter((el) => el.favorite === true);
  const sorted = exampleSort(trueResults);
  favoritesGrid.innerHTML = "";
  createAllCards(sorted, true);
  filterCards();
});

sortReverseFave.addEventListener("click", () => {
  const resultsTrue = desserts.filter((el) => el.favorite === true);
  const reverseSorted = reverseSort(resultsTrue); 
  favoritesGrid.innerHTML = "";
  createAllCards(reverseSorted, true);
  filterCards();
});

/// FAVORITES FULL-PAGE MODAL
const openFavoritesModal = document.querySelector(".favorites-link-open"); 
const $modal = document.getElementById("favorites"); 
const closeFavoritesModal = document.querySelector(".favorites-link-closed"); 

openFavoritesModal.addEventListener("click", () => {
  $modal.classList.remove("hidden");
});

closeFavoritesModal.addEventListener("click", () => {
  $modal.classList.add("hidden");
});

// MOVE FAVORITES FROM MAIN PAGE TO FAVORITES MODAL
const addFavoriteDessert = (chosenDessert) => {
  desserts.forEach((dessert) => {
    if (chosenDessert === dessert._id) {
      const item = document.getElementById(dessert._id);
      item.remove();
      const modalItem = document.getElementById(dessert.name);
      modalItem.remove();
      dessert.favorite = true;
      createDessertCards(dessert, true);
      createModalDesserts(dessert);
      activateModals();
      removeClickEvent(chosenDessert);
      return dessert;
    }
  });

  return chosenDessert;
};

const removeFavoriteDessert = (notChosenDessert) => {
  desserts.forEach((dessert) => {
    if (notChosenDessert === dessert._id) {
      const item = document.getElementById(dessert._id); 
      item.remove();
      const modalItem = document.getElementById(dessert.name);
      modalItem.remove();
      dessert.favorite = false;
      createDessertCards(dessert, false);
      createModalDesserts(dessert);
      activateModals();
    }
  });

  return notChosenDessert;
};

const cardsList = document.querySelectorAll(".square-btn"); 
cardsList.forEach((card) => {
  card.addEventListener("click", () => {
    addFavoriteDessert(card.dataset.id); 
  });
});

const removeClickEvent = (dessert_id) => {
  const modalButton = document.querySelector(`[data-id="${dessert_id}"]`);
  modalButton.addEventListener("click", () => {
    removeFavoriteDessert(dessert_id); 
  });
};