const fetch = require("node-fetch");

function getCategories() {
  return fetch("https://decath-product-api.herokuapp.com/categories")
    .then((res) => res.json())
    .catch((error) => {
      console.warn(error);
    });
}

function getProductsByCategory(idCategory) {
  return fetch(`https://decath-product-api.herokuapp.com/categories/${idCategory}/products`)
    .then((res) => res.json())
    .catch((error) => {
      console.warn(error);
    });
}

function getProducts(idProduct) {
  return fetch(`https://decath-product-api.herokuapp.com/products/${idProduct}`)
    .then((res) => res.json())
    .catch((error) => {
      console.warn(error);
    });
}

module.exports = {
  getCategories: getCategories,
  getProductsByCategory: getProductsByCategory,
  getProducts: getProducts
}
