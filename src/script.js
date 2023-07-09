
const navbar = document.querySelector(".navbar");

document.querySelector("#hamburger-menu").onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  cardItem.classList.remove("active");
};

const searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  navbar.classList.remove("active");
  cardItem.classList.remove("active");
};

const cardItem = document.querySelector(".card-container");

document.querySelector("#card-btn").onclick = () => {
  cardItem.classList.toggle("active");
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
  cardItem.classList.remove("active");
};

//card working JS

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  //Remove card items
  const removeItemButtons = document.getElementsByClassName("close");
  for (i = 0; i < removeItemButtons.length; i++) {
    let removeButton = removeItemButtons[i];
    removeButton.addEventListener("click", removeCardItem);
  }

  //add to card, menu

  const addToCard = document.getElementsByClassName("add-to-card");
  for (let i = 0; i < addToCard.length; i++) {
    let addButton = addToCard[i];
    addButton.addEventListener("click", addToCardClicked);
  }

  //add to card, products

  const addToCardProduct = document.getElementsByClassName(
    "add-product-to-card"
  );
  for (let i = 0; i < addToCardProduct.length; i++) {
    let addButton = addToCardProduct[i];
    addButton.addEventListener("click", addProductToCardClicked);
  }
}

//add to card, product

function addProductToCardClicked(event) {
  let button = event.target;
  let productIcons = button.parentElement;
  let cardItem = productIcons.parentElement;
  let priceElement = cardItem.getElementsByClassName("price")[0].innerText;
  let price = parseFloat(priceElement.replace("$", ""));
  let name = cardItem.getElementsByClassName("product-name")[0].innerText;
  let image = cardItem.getElementsByClassName("product-image")[0].src;
  alert("DONE!");
  addItemToCard(name, image, price);
  updateTotalPrice();
}

//add to card, menu

function addToCardClicked(event) {
  let button = event.target;
  let cardItem = button.parentElement;
  let priceElement = cardItem.getElementsByClassName("price")[0].innerText;
  let price = parseFloat(priceElement.replace("$", ""));
  let name = cardItem.getElementsByClassName("item-name")[0].innerText;
  let image = cardItem.getElementsByClassName("item-image")[0].src;
  alert("DONE!");
  addItemToCard(name, image, price);
  updateTotalPrice();
}

function addItemToCard(name, image, price) {
  const cardItemBox = document.createElement("div");
  cardItemBox.classList.add("card-item");
  let cardItemsContainer = document.getElementsByClassName(
    "card-items-container"
  )[0];
  let cardItemsNames =
    cardItemsContainer.getElementsByClassName("card-item-name");
  for (i = 0; i < cardItemsNames.length; i++) {
    if (cardItemsNames[i].innerText == name) {
      alert("You have already added this item to your card!");
      return;
    }
  }
  let cardItemBoxContent = `
            <span class="fas fa-times close"></span>
            <img src="${image}" alt="item-1" class="card-item-image"/>
            <div class="content">
              <h3 class="card-item-name">${name}</h3>
              <div class="detail-container">
                <div class="prices">${price}</div>
                <input type="number" class="quantity" value="1" min="1" />
              </div>
            </div>
          `;
  cardItemBox.innerHTML = cardItemBoxContent;
  cardItemsContainer.append(cardItemBox);
  cardItemBox
    .getElementsByClassName("close")[0]
    .addEventListener("click", removeCardItem);
  cardItemBox
    .getElementsByClassName("quantity")[0]
    .addEventListener("change", quantityChanged);
}

//Remove card items

function removeCardItem(event) {
  let button = event.target;
  button.parentElement.remove();
  updateTotalPrice();
}

//Update total

function updateTotalPrice() {
  const cardItemsContainer = document.getElementsByClassName(
    "card-items-container"
  )[0];
  let cardItems = cardItemsContainer.getElementsByClassName("card-item");
  let total = 0;
  if (cardItems.length == 0) {
    total = 0;
  } else {
    for (i = 0; i < cardItems.length; i++) {
      let cardItem = cardItems[i];
      let priceElement = cardItem.getElementsByClassName("prices")[0];
      let quantityElement = cardItem.getElementsByClassName("quantity")[0];
      let price = parseFloat(priceElement.innerText);
      let quantity = quantityElement.value;
      total = total + quantity * price;
      total = Math.round(total * 100) / 100;
    }
  }
  document.getElementsByClassName("total-price")[0].innerText = total;
}

//Change quantity

const quantityInputs = document.getElementsByClassName("quantity");
for (i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
  let input = event.target;
  updateTotalPrice();
}

//Checkout

const checkoutButton = document.getElementsByClassName("checkout-btn")[0];
checkoutButton.addEventListener("click", doCheckout);

function doCheckout(event) {
  let button = event.target;
  let cardContainer = button.parentElement;
  let cardItemsContainer = cardContainer.getElementsByClassName(
    "card-items-container"
  )[0];

  savePurchaseHistory(cardItemsContainer);

  //empty the card
  cardItemsContainer.innerHTML = null;
  alert("Your purchase is completed!");
  document.getElementsByClassName("total-price")[0].innerText = 0;

  creatHistoryButton();
}

//History button

function creatHistoryButton() {
  let historyButton = document.createElement("button");
  historyButton.classList.add("history-btn");
  let cardContainer = document.getElementsByClassName("card-container")[0];
  let historyButtonContent = `
            show purchase</button>
          `;
  historyButton.innerHTML = historyButtonContent;
  cardContainer.append(historyButton);
  checkoutButton.classList.remove("checkout-btn");
  checkoutButton.classList.add("checkout-btn-hidden");
  historyButton.addEventListener("click", function openPurchaseHistory() {
    window.open("purchase-History.html");
  });
}

//save purchase in sessionStorage

function savePurchaseHistory(allItems) {
  const cardData = [];

  let cardItems = allItems.getElementsByClassName("card-item");
  const cardItemsArray = [...cardItems];
  cardItemsArray.forEach((item) => {
    const name = item.querySelector(".card-item-name").textContent;
    const price = parseFloat(item.querySelector(".prices").textContent);
    const img = parseInt(item.querySelector(".card-item-image").src);
    const quantity = parseInt(item.querySelector(".quantity").value);

    const itemData = {
      name: name,
      price: price,
      img: img,
      quantity: quantity,
    };
    cardData.push(itemData);
  });

  sessionStorage.setItem("cardItems", JSON.stringify(cardData));
}
