import { Product } from "./product.js";
import { insertElement } from './helpers/insertElement.js';


fetch("./js/mock/products.json").then(j => j.json()).then(r => {
  const { products } = r;
  
  const div = insertElement();
  
  const buttonForm = document.querySelector('.rd-form');
  const inputField = document.getElementById('rd-search-form-input');
  const checkboxField = document.querySelectorAll('input[type="checkbox"]');
  const divMin = document.querySelector('.rd-range-input-value-1');
  const divMax = document.querySelector('.rd-range-input-value-2');
  
  div.innerHTML = products.map((product) => Product(product));
  
  let productsFiltered = [];
  let lastFiltered = [];
  let categories = []; 
  
  buttonForm.addEventListener('click', (event) => {
    event.preventDefault();
  });
  
  inputField.addEventListener('keyup', function(event) {
    const filterProduct = products.filter(product => {
      const productLowerCase = product.name.toLowerCase();
      const value = event.target.value.toLowerCase();
  
      return productLowerCase.includes(value);
    });
  
    if (event.target.value.length > 0) {
      div.innerHTML = filterProduct.map((product) => Product(product));
      productsFiltered.push(filterProduct);
    } else {
      const [min] = divMin.innerHTML.split('%');
      const [max] = divMax.innerHTML.split('%');
  
      const thcFilter = products.filter(between => {
        return between.thc >= min && between.thc <= max;
      });
      
      div.innerHTML = thcFilter.map((product) => Product(product));
      productsFiltered.push(thcFilter);
    }
  });
  
  checkboxField.forEach((element) => {
    element.addEventListener('click', (checkboxEvent) => {
      const lastFilteredItem = productsFiltered[productsFiltered.length - 1] ? productsFiltered[productsFiltered.length - 1] : [];
  
      const lastFilteredProductArray = lastFilteredItem.length <= 0 ? products : lastFilteredItem;
      const value = checkboxEvent.target.value;
  
      if (checkboxEvent.target.checked) {
        categories.push(value);
        
        const filterByCategories = lastFilteredProductArray.filter(product => {
          return product.category.some(typeCategory => categories.includes(typeCategory))
        });
  
        lastFiltered.push(filterByCategories);
        
        div.innerHTML = filterByCategories.map((product) => Product(product)).join('');
      } else {
        const findCheckBoxIndex = categories.findIndex(category => category === value);
        
        categories.splice(findCheckBoxIndex, 1);
  
        const filterByCategories = lastFilteredProductArray.filter(product => {
          return product.category.some(typeCategory => categories.includes(typeCategory))
        });
  
        lastFiltered.push(filterByCategories);
  
        div.innerHTML = filterByCategories.map((product) => Product(product)).join('');
      }
  
      if (categories.length === 0) {
        div.innerHTML = lastFilteredProductArray.map((product) => Product(product)).join('');
      }
    })
  });
  
  $('.range-slider').jRange({
    from: 20,
    to: 40,
    step: 2,
    step: 1,
    format: '%s',
    width: '100%',
    showLabels: true,
    isRange : true,
    onstatechange: (value) => {
      const [min, max] = value.split(',');
  
      const sumMax = max === min ? Number(max) + 1 : max;
  
      divMin.innerHTML = `${min}%`;
      divMax.innerHTML = `${sumMax}%`;
  
      const thcFilter = products.filter(between => {
        return between.thc >= min && between.thc <= sumMax;
      });
  
      productsFiltered.push(thcFilter);
  
      div.innerHTML = thcFilter.map((product) => Product(product)).join('');
    }
  });
});

