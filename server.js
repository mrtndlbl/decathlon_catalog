const express = require("express");
const nunjucks = require("nunjucks");
const server = require("./server.js");

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
  server.getCategories()
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
      server.getProductsByCategory(request.params.idCategory),
      server.getCategories(),
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
  server.getProducts(request.params.idProduct)
  .then(function(product) {
    result.render("product", {
      product : product
      }
    )
  })
});
