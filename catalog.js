const registerForm = document.querySelector(".register_form");
const loginForm = document.querySelector(".login_form");
const buyNow = document.querySelector(".checkout_yes");
const totalCartPrice = document.getElementById("total");
const logOutButton = document.querySelector(".logout_button");

// Contains all home cover files
const homeCovers = [
  "ff7_rebirth_cover.jpg",
  "alan_wake_2_cover.jpg",
  "elden_ring_cover.jpg",
  "dragons_dogma_2_cover.jpg",
  "horizon_forbidden_west_cover.jpeg",
  "like_a_dragon_cover.jpg",
  "the_last_of_us_2_cover.jpg",
];

// Contains all solopage cover files
const solopageCovers = [
  "solopage1_img.jpg",
  "solopage2_img.jpeg",
  "solopage3_img.jpg",
  "solopage4_img.jpg",
  "solopage5_img.jpeg",
  "solopage6_img.webp",
  "solopage7_img.avif",
];

// Renders cart when its page opens
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".cart_games_section")) {
    renderCart();
  }
});

// Renders games list when the home page is open
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".game_collection_container")) {
    renderGamesList();
  }
});

// Contains all game catalog data
const catalog = [
  {
    id: 1,
    title: "Final Fantasy 7: Rebirth",
    publisher: "Square Enix",
    price: 69.99,
    quantity: 0,
    rating: 92,
    status: "Universal Acclaim",
  },
  {
    id: 2,
    title: "Alan Wake II",
    publisher: "Remedy Entertainment",
    price: 59.99,
    quantity: 0,
    rating: 89,
    status: "Generally Favorable",
  },
  {
    id: 3,
    title: "Elden Ring Shadow of the Erdtree",
    publisher: "Bandai Namco Entertainment",
    price: 39.99,
    quantity: 0,
    rating: 95,
    status: "Universal Acclaim",
  },
  {
    id: 4,
    title: "Dragon's Dogma II",
    publisher: "Capcom",
    price: 69.99,
    quantity: 0,
    rating: 86,
    status: "Generally Favorable",
  },
  {
    id: 5,
    title: "Horizon Forbidden West Complete Edition",
    publisher: "Sony Interactive Entertainment",
    price: 49.99,
    quantity: 0,
    rating: 89,
    status: "Generally Favorable",
  },
  {
    id: 6,
    title: "Like a Dragon: Infinite Wealth",
    publisher: "SEGA",
    price: 69.99,
    quantity: 0,
    rating: 89,
    status: "Generally Favorable",
  },
  {
    id: 7,
    title: "The Last of Us Part II Remastered",
    publisher: "Sony Interactive Entertainment",
    price: 49.99,
    quantity: 0,
    rating: 90,
    status: "Universal Acclaim",
  },
];

// Event listener to handle adding games to the cart on the homepage or solopage
const handleAddToCartButtons = (button, game) => {
  button.addEventListener("click", () => {
    addToCart(game);
  });
};

// Allows user to register their account
if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    // Makes sure the form doesn't refresh
    event.preventDefault();

    // Gets the user's username and password
    const registerUsername = document.querySelector("#register_username").value;
    const registerPassword = document.querySelector("#register_password").value;

    // Sets an expiration date for cookies
    const expirationDate = new Date();
    // Stays valid for 1 year
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    const expires = `expires=${expirationDate.toUTCString()}`;

    // Stores the user's data in a cookie
    document.cookie = `username=${registerUsername}; ${expires}; path=/`;
    document.cookie = `password=${registerPassword}; ${expires}; path=/`;

    // Lets the user know that their registration was successful
    alert("You have successfully registered your account!");

    // Redirects the user to the login page
    window.location.href = "index.html";
  });
}

// Allows user to log in to their account
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    // Makes sure the form doesn't refresh
    event.preventDefault();

    // Gets the user's username and password
    const loginUsername = document.querySelector("#login_username").value;
    const loginPassword = document.querySelector("#login_password").value;

    // Gets the user's data that was stored in a cookie
    const storedUsername = getCookie("username");
    const storedPassword = getCookie("password");

    // Check if the user's login data matches their cookie data
    if (loginUsername === storedUsername && loginPassword === storedPassword) {
      const expirationDate = new Date();
      // Stays valid for 1 year
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      const expires = `expires=${expirationDate.toUTCString()}`;

      // Stores the successful login into the cookie
      document.cookie = `loggedIn=true; ${expires}; path=/`;

      // Lets the user know that their login was successful
      alert("You have successfully logged in to your account!");

      // Redirects the user to the home page
      window.location.href = "home.html";
    } else {
      // Lets the user know that their login was not successful
      alert(
        "The username and password you entered was incorrect. Please try again."
      );
    }
  });
}

// Gets the cookie values
const getCookie = (cookieKey) => {
  // Splits cookie data into an array with "; " as the seperator
  let cookies = document.cookie.split("; ");

  // Loops through cookie data to return the value for cookieKey
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === cookieKey) {
      return value;
    }
  }

  return null;
};

// Calculates total price
const updateTotal = () => {
  let totalPrice = 0;

  catalog.forEach((game) => {
    totalPrice += game.quantity * game.price;
  });

  if (totalCartPrice) {
    totalCartPrice.textContent = totalPrice.toFixed(2);
  }

  // Store total price in a cookie
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  document.cookie = `total_price=${totalPrice.toFixed(
    2
  )}; expires=${expirationDate.toUTCString()}; path=/`;
};

// Gets the total price from cookie
const getTotalFromCookie = () => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === "total_price") {
      return parseFloat(value);
    }
  }
  return 0;
};

// Keeps the cart cookie updated
const updateCartCookie = () => {
  // Checks if the user is still logged in
  const username = getCookie("username");
  if (!username) {
    alert("Please log in to update your cart.");
    window.location.href = "index.html";
    return;
  }

  const expirationDate = new Date();
  // Stays valid for 1 year
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  const expires = `expires=${expirationDate.toUTCString()}`;

  // Retreiving cart data from catalog object
  const cartData = catalog
    .filter((game) => game.quantity > 0)
    .map((game) => `game${game.id}:quantity${game.quantity}`)
    .join("@");

  // Saves cart data into cookie
  document.cookie = `${username}_cart=${cartData}; ${expires}; path=/`;

  // Rerenders cart when modified
  renderCart();
  updateTotal();
};

// Adds new game to the cart cookie
const addToCart = (game) => {
  // Checks if the user is still logged in
  const username = getCookie("username");
  if (!username) {
    alert("Please log in to add items to your cart.");
    window.location.href = "index.html";
    return;
  }

  // Updates game quantity when added to cart
  game.quantity += 1;
  updateCartCookie();
};

// Reads cart data from cookies and updates the catalog
const loadCartFromCookies = () => {
  // Checks if the user is still logged in
  const username = getCookie("username");
/*   if (!username) {
    alert("You must be logged in to proceed.");
    window.location.href = "register.html";
    return;
  } */

  // Cart cookie authentication
  const cartCookie = getCookie(`${username}_cart`);
  if (!cartCookie) return;

  const cartItems = cartCookie.split("@");
  cartItems.forEach((item) => {
    const [gameId, quantity] = item.replace("game", "").split(":quantity");
    const game = catalog.find((g) => g.id === parseInt(gameId));
    if (game) {
      game.quantity = parseInt(quantity);
    }
  });
};

// Dynamically displays all games on the home page
const renderGamesList = () => {
  const gameCollectionContainer = document.querySelector(
    ".game_collection_container"
  );
  catalog.forEach((game, index) => {
    const gameContainer = document.createElement("div");
    gameContainer.classList.add("game_container");

    const gameRatingSite = document.createElement("a");
    gameRatingSite.setAttribute("href", `solopage${index + 1}.html`);
    gameRatingSite.classList.add("game_rating_site");
    gameContainer.appendChild(gameRatingSite);

    const gameCover = document.createElement("img");
    gameCover.setAttribute("src", `Images/${homeCovers[index]}`);
    gameCover.setAttribute("alt", `${game.title} Cover`);
    gameCover.setAttribute("width", "163");
    gameCover.setAttribute("height", "244");
    gameCover.classList.add("game_cover");
    gameRatingSite.appendChild(gameCover);

    const gameDetailsContainer = document.createElement("div");
    gameDetailsContainer.classList.add("game_details_container");
    gameRatingSite.appendChild(gameDetailsContainer);

    const gameTitle = document.createElement("div");
    gameTitle.textContent = game.title;
    gameTitle.classList.add("game_title");
    gameDetailsContainer.appendChild(gameTitle);

    const gameRatingInfo = document.createElement("div");
    gameRatingInfo.classList.add("game_rating_info");
    gameDetailsContainer.appendChild(gameRatingInfo);

    const gameRating = document.createElement("div");
    gameRating.textContent = game.rating;
    gameRating.classList.add("game_rating");
    gameRatingInfo.appendChild(gameRating);

    const gameRatingStatus = document.createElement("div");
    gameRatingStatus.textContent = game.status;
    gameRatingStatus.classList.add("game_rating_status");
    gameRatingInfo.appendChild(gameRatingStatus);

    const gameCartButton = document.createElement("button");
    gameCartButton.textContent = "Add to Cart";
    gameCartButton.classList.add("game_cart_button");
    handleAddToCartButtons(gameCartButton, game);
    gameContainer.appendChild(gameCartButton);

    gameCollectionContainer.appendChild(gameContainer);
  });
};

// Renders cart UI
const renderCart = () => {
  const cartGamesSection = document.querySelector(".cart_games_section");
  if (!cartGamesSection) {
    return;
  }

  // Clear the cart before re-rendering
  cartGamesSection.innerHTML = "";

  // Renders each game with a quantity greater than 0
  catalog.forEach((game, index) => {
    if (game.quantity > 0) {
      const cartGame = document.createElement("div");
      cartGame.classList.add("cart_game");

      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fa-solid", "fa-trash-can");
      trashIcon.addEventListener("click", () => {
        game.quantity = 0;
        updateCartCookie();
      });
      cartGame.appendChild(trashIcon);

      const cartGameContainer = document.createElement("div");
      cartGameContainer.classList.add("cart_game_container");
      cartGame.appendChild(cartGameContainer);

      const cartGameImg = document.createElement("img");
      cartGameImg.setAttribute("src", `covers/${solopageCovers[index]}`);
      cartGameImg.setAttribute("alt", `${game.title} Cover`);
      cartGameImg.setAttribute("width", "320");
      cartGameImg.setAttribute("height", "180");
      cartGameImg.classList.add("cart_game_img");
      cartGameContainer.appendChild(cartGameImg);

      const cartGameDetails = document.createElement("div");
      cartGameDetails.classList.add("cart_game_details");
      cartGameContainer.appendChild(cartGameDetails);

      const seperator = document.createElement("div");
      seperator.classList.add("seperator");
      cartGameDetails.appendChild(seperator);

      const cartGameTitle = document.createElement("h3");
      cartGameTitle.textContent = game.title;
      cartGameTitle.classList.add("cart_game_title");
      seperator.appendChild(cartGameTitle);

      const cartGamePublisher = document.createElement("p");
      cartGamePublisher.textContent = game.publisher;
      cartGamePublisher.classList.add("cart_game_publisher");
      seperator.appendChild(cartGamePublisher);

      const cartGamePrice = document.createElement("h3");
      cartGamePrice.textContent = `$${game.price}`;
      cartGamePrice.classList.add("cart_game_price");
      cartGameDetails.appendChild(cartGamePrice);

      const cartGameActions = document.createElement("div");
      cartGameActions.classList.add("cart_game_actions");
      cartGame.appendChild(cartGameActions);

      const changeQuantity = document.createElement("div");
      changeQuantity.classList.add("change_quantity");

      const upArrowIcon = document.createElement("i");
      upArrowIcon.classList.add("fa-solid", "fa-caret-up");
      upArrowIcon.addEventListener("click", () => {
        game.quantity += 1;
        updateCartCookie();
      });
      changeQuantity.appendChild(upArrowIcon);

      const quantityText = document.createElement("p");
      quantityText.textContent = game.quantity;
      quantityText.classList.add("quantity");
      changeQuantity.appendChild(quantityText);

      const downArrowIcon = document.createElement("i");
      downArrowIcon.classList.add("fa-solid", "fa-caret-down");
      downArrowIcon.addEventListener("click", () => {
        if (game.quantity > 1) {
          game.quantity -= 1;
        } else {
          game.quantity = 0;
        }
        updateCartCookie();
      });
      changeQuantity.appendChild(downArrowIcon);

      cartGameActions.appendChild(changeQuantity);
      cartGamesSection.appendChild(cartGame);
    }
  });

  updateTotal();
};

// Resets all cookies after purchase
const resetCartCookies = () => {
  const username = getCookie("username");
  if (!username) {
    alert("Please log in to add items to your cart.");
    return;
  }

  // Clears the cart cookie
  document.cookie = `${username}_cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

  // Clears the total price cookie
  document.cookie = `total_price=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

  // Resets all game quantities in the catalog
  catalog.forEach((game) => (game.quantity = 0));

  // Updates the UI
  renderCart();
  updateTotal();

  alert("Your cart has been cleared.");
};

// Initialize cart data when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const excludedPages = ["/index.html", "/register.html"];
  const currentPath = window.location.pathname;

  if (!excludedPages.includes(currentPath)) {
    // Loads cart from cookies
    loadCartFromCookies();

    // Renders cart UI
    renderCart();

    // Updates total
    updateTotal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const checkoutTotal = document.getElementById("final");
  if (checkoutTotal) {
    checkoutTotal.textContent = getTotalFromCookie().toFixed(2);
  }
});

if (buyNow) {
  buyNow.addEventListener("click", () => {
    resetCartCookies();
  });
}

const logout = () => {
  // Remove the username cookie
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

  // Remove any other cookies related to the user
  document.cookie =
    "total_price=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

  // Redirect to the login page
  window.location.href = "index.html";
};

if (logOutButton) {
  logOutButton.addEventListener("click", logout);
}
