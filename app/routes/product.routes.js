module.exports = app => {
    const Products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", Products.create);
  
    // Retrieve all Products
    router.get("/", Products.findAll);
  
    // Retrieve a single Product with id
    router.get("/:id", Products.findOne);
  
    // Update a Product with id
    router.put("/:id", Products.update);
  
    // Delete a Product with id
    router.delete("/:id", Products.delete);
  
    // Delete all Products
    router.delete("/", Products.deleteAll);
  
    app.use('/products', router);
  };