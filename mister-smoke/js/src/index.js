import productsJson from "../mock/products.json" assert { type: "json" };
import { Product } from "./product.js";
import { insertElement } from './helpers/insertElement.js';

const div = insertElement();

const inputField = document.getElementById('rd-search-form-input');
const checkboxField = document.querySelectorAll('input[type="checkbox"]');

inputField.addEventListener('input', event => {
  const filterProduct = productsJson.products.filter(product => {
    const productLowerCase = product.name.toLowerCase();
    const value = event.target.value.toLowerCase();

    return productLowerCase.includes(value);
  });

  div.innerHTML = filterProduct.map((product) => Product(product));
});

checkboxField.forEach((element) => {
  element.addEventListener('click', (event) => {
    const filterByCategories = productsJson.products.filter(product => {
      return product.category === event.target.value;
    });

    if (!event.target.checked) {
      div.innerHTML = productsJson.products.map(product => Product(product));
      return;
    }

    div.innerHTML = filterByCategories.map((product) => Product(product));
  })
})

div.innerHTML = productsJson.products.map(product => Product(product));
