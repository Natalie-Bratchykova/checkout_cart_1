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
  const cartListEl = document.querySelector(".cart__list");

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

  console.log(checkoutList);
}
