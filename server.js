const express = require("express");
const nunjucks = require("nunjucks");
const api = require("./api.js");

const app = express();
const port = process.env.PORT || 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.use(express.static("images"));

app.set("views", __dirname + "/views");
app.set("view engine", "njk");

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

app.get("/", function(request, result) {
  api.getCategories()
  .then(function(categories) {
    result.render("categories_list", {
      categories : categories
      }
    )
  })
});

app.get("/category/:idCategory/products", function(request, result) {
  Promise.all(
    [
      api.getProductsByCategory(request.params.idCategory),
      api.getCategories(),
    ]
  )
  .then(function(promiseAllResult) {
      const id = request.params.idCategory;
      const cat = promiseAllResult[1].filter(category => category.id === id)
      result.render("category", {
        products : promiseAllResult[0],
        categories : promiseAllResult[1],
        category : cat
      })
  })
});

app.get("/products/:idProduct", function(request, result) {
  api.getProducts(request.params.idProduct)
  .then(function(product) {
    result.render("product", {
      product : product
      }
    )
  })
});
