// show and hide cart section
const hideCartBtn = document.querySelector("#hideCart");
const showCartBtn = document.querySelector("#checkout-cart");
const checkoutCartEl = document.querySelector("#my-cart");

showCartBtn.addEventListener("click", (e) => {
  document.body.classList.add("active");
});

hideCartBtn.addEventListener("click", (e) => {
  document.body.classList.remove("active");
});

const products = [
  {
    id: 1,
    title: "呪術廻戦",
    image: "1.jpg",
    maxAmount: 40,
    price: 120.0,
    currency: "yen",
  },
  {
    id: 2,
    title: "トモちゃんは女",
    image: "2.jpg",
    maxAmount: 30,
    price: 100.0,
    currency: "yen",
  },
  {
    id: 3,
    title: "神様はじめまして",
    image: "3.jpg",
    maxAmount: 80,
    price: 150.0,
    currency: "yen",
  },
  {
    id: 4,
    title: "ナナ",
    image: "4.jpg",
    maxAmount: 42,
    price: 130.0,
    currency: "yen",
  },
  {
    id: 5,
    title: "大和撫子",
    image: "5.jpg",
    maxAmount: 38,
    price: 90.0,
    currency: "yen",
  },
  {
    id: 6,
    title: "お嬢と番犬",
    image: "6.jpg",
    maxAmount: 36,
    price: 150.0,
    currency: "yen",
  },
  {
    id: 7,
    title: "ヤオイが欲しい",
    image: "7.jpg",
    maxAmount: 38,
    price: 160.0,
    currency: "yen",
  },
  {
    id: 8,
    title: "Cautious hero",
    image: "8.jpg",
    maxAmount: 39,
    price: 120.0,
    currency: "yen",
  },
];

let checkoutList = [];

const productsContainerEl = document.querySelector(".products__container");

function generateContent() {
  let content = ``;
  products.forEach((el, i) => {
    content += `
        <div class="product">
                <img src="images/${el.image}" alt="${el.title}">
                <h2 class="product__title">${el.title}</h2>
                <p class="product__price">Price: ${el.price} ${el.currency}</p>
                <button class="product__button" onclick="addToCart(${el.id})">Add to cart</button>
            </div>
        `;
  });

  productsContainerEl.innerHTML = content;
}

generateContent();

function addToCart(id) {
  // specify place for showing

  const elemsInCartIndicator = document.querySelector("#chosenAmount");
  let listContent = "";

  // check if we have any elems in our cart
  if (checkoutList.length === 0) {
    checkoutList.push(...products.filter((el) => el.id === id));
  } else {
    // if we have some elems in cart, check if currently adding value isn't in cart
    let tempArr = checkoutList.filter((el) => el.id == id);
    if (tempArr.length === 0) {
      // add unique value
      checkoutList.push(...products.filter((el) => el.id === id));
    }
  }

  //   cartListEl.innerHTML = listContent;
  renderCheckoutList(checkoutList);

  elemsInCartIndicator.textContent = checkoutList.length;
  
  // update and render total price
  updateTotalPrice();

}

// render checkoutList
function renderCheckoutList(list) {
  const cartListEl = document.querySelector(".cart__list");
  let listContent = "";
  // render added elems
  list.forEach((el) => {
    listContent += `
    <li class="cart__item item">
        <img src="images/${el.image}" alt="${el.title}">
            <div class="item__description">
                <h3 class="item__title">${el.title}</h3>
                    <div class="set-amount">
                        <button class="decrease" onclick="decreaseAmount(${el.id})">-</button>
                        <input type="text" name="amount" class="amount-setting" id="prodAmount-${el.id}" min="0" value="1">
                        <button class="increase" onclick = "increaseAmount(${el.id})">+</button>         
                    </div>
                    <p class="amount__price" id="price-${el.id}">Price: ${el.price}</p>   
                <button class="delete" onclick = "removeFromCart(${el.id})"><i class="fa-solid fa-trash"></i></button>
            </div>             
    </li>
    `;
  });

  cartListEl.innerHTML = listContent;
}

// delete elems from list
function removeFromCart(id) {
  // remove from checklist
  console.log("Initial array len = " + checkoutList.length);
  let removingElId = checkoutList.findIndex((el) => el.id === id);
  console.log(removingElId);
  checkoutList.splice(removingElId, 1);
  console.log("After del array len = " + checkoutList.length);
  renderCheckoutList(checkoutList);
}

// increase amount
function increaseAmount(id) {
    const currentEl = document.querySelector(`#prodAmount-${id}`);
    // decrease it
    let currentAmount = currentEl.value;
    currentAmount++;
    // render new value
    currentEl.value = currentAmount;
    // call price changer function
    updatePrice(id, currentAmount)

}
// decrease amount
function decreaseAmount(id) {
    const currentEl = document.querySelector(`#prodAmount-${id}`);
      // decrease it
      let currentAmount = currentEl.value;
      currentAmount = currentAmount > 1 ? currentAmount - 1 : 0;
      // render new value
      currentEl.value = currentAmount;
      // call price changer function
      updatePrice(id, currentAmount)

}

// update product price
function updatePrice(id, amount) {
  let priceEl = document.querySelector(`#price-${id}`);

  // count new price
  let product = products.findIndex(el => el.id === id);
  product = products[product];
  let newPrice = product.price * amount

  priceEl.textContent = `Price: ${newPrice}`

  // update total price
  updateTotalPrice()

}

// update total price
function updateTotalPrice(){
    console.log("Updated total price");
    // get all prices
    const allPricesEl = document.querySelectorAll(".amount__price");
    console.log(allPricesEl);
    let currentTotalPrice = 0;
    allPricesEl.forEach(el =>{
        console.log(el.textContent);
        let currentPrice = el.textContent.split(":")
        currentPrice = currentPrice[1];
        // currentPrice = currentPrice[0];
        console.log(currentPrice);
        currentTotalPrice += Number(currentPrice);
    })
    // get place for 
    const totalPriceEl = document.querySelector(".totalPrice");
    totalPriceEl.textContent = `Total price: ${currentTotalPrice} yen`
}
