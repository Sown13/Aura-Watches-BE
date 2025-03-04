const Product = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Product
    const Product = new Product({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    // Save Product in the database
    Product.create(Product, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        else res.send(data);
    });
};

// Retrieve all Products from the database (with condition).
// Retrieve all Products from the database (with condition).
exports.findAll = (req, res) => {
    // const title = req.query.title;

    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Products."
            });
        else res.send(data);
    });
};

// exports.findAllPublished = (req, res) => {
//     Product.getAllPublished((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving Products."
//             });
//         else res.send(data);
//     });
// };

// Find a single Product with a id
exports.findOne = (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


// Update a Product identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Product.updateById(
        req.params.id,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Product with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Product with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Product.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Product with id " + req.params.id
                });
            }
        } else res.send({ message: `Product was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Product.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Products."
            });
        else res.send({ message: `All Products were deleted successfully!` });
    });
};