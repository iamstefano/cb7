import { usersList } from "./utils/credentials.js";

export const createEl = (type, content, ...attrs) => {
  const element = document.createElement(type);

  element.textContent = content;
  attrs.forEach((attr) => element.setAttribute(attr?.name, attr?.value));
  return element;
};

const createProdInCart = ({ title, price, quantity }) => {
  const wrapperEl = createEl("div", "", { name: "class", value: "cartItem" });
  const titleEl = createEl("h4", title);
  const priceEl = createEl("p", "Price: " + price);
  const quantityEl = createEl("p", "Quantity: " + quantity);

  wrapperEl.append(titleEl, priceEl, quantityEl);

  return wrapperEl;
};

const GET = async (endpoint) => {
  const res = await fetch(`https://dummyjson.com/${endpoint}`);
  const data = await res.json();
  return data;
};

const wrongLoginValues = () => {
  alert("Credenziali non corrette");
  loginUsernameEl.style.border = "1px solid red";
  loginPasswordEl.style.border = "1px solid red";
  loginUsernameEl.value = "";
  loginPasswordEl.value = "";
};

const onHandleSubmit = (e) => {
  e.preventDefault();

  const loggedUser = usersList.find(
    ({ username, password }) =>
      username === e.target[0].value && password === e.target[1].value
  );

  if (loggedUser) {
    document.body.textContent = "";

    const headingEl = createEl(
      "h1",
      `${loggedUser.username} benvenuto al tuo carrello!`,
      { name: "class", value: "cart__title" }
    );

    const cartListEl = createEl("div", "", {
      name: "class",
      value: "cart__cartList",
    });

    GET(`carts/${loggedUser.id}`)
      .then(({ products }) =>
        products.forEach((product) =>
          cartListEl.append(createProdInCart(product))
        )
      )
      .then(() => document.body.append(headingEl, cartListEl));
  } else wrongLoginValues();
};

const loginModalEl = createEl("form", "", { name: "class", value: "login" });
const loginTitleEl = createEl("h2", "Log In", {
  name: "class",
  value: "login__title",
});
const loginUsernameEl = createEl(
  "input",
  "",
  { name: "type", value: "text" },
  { name: "placeholder", value: "Username ..." }
);
const loginPasswordEl = createEl(
  "input",
  "",
  { name: "type", value: "password" },
  { name: "placeholder", value: "Password ..." }
);
const loginSubmitEl = createEl(
  "input",
  "",
  { name: "type", value: "submit" },
  { name: "value", value: "Accedi" }
);

loginModalEl.append(
  loginTitleEl,
  loginUsernameEl,
  loginPasswordEl,
  loginSubmitEl
);
document.body.append(loginModalEl);

// Events
loginModalEl.addEventListener("submit", onHandleSubmit);
