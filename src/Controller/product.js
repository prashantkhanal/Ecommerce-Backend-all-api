const Product = require('../Modals/product');
const shortid = require('shortid');
const slugify = require('slugify');

exports.addProduct = (req, res) => {
    // res.status(200).json({ file: req.files, body: req.body });
    const {
        name,
        price,
        discription,
        category,
        quantity,
        createdBy,
    } = req.body;

    let productPictures = [];
    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
            return { img: file.filename };
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        discription,
        productPictures,
        quantity,
        category,
        createdBy: req.user,
    });

    product.save((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            return res.status(200).json({ product });
        }
    });
};
