const Cart = require('../Modals/cart');

exports.addCart = (req, res) => {
    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
            //if cart already exits then update the cartItems
            const product = req.body.cartItems.product;
            const isItemAdded = cart.cartItems.find(
                (c) => c.product == product
            );
            if (isItemAdded) {
                Cart.findOneAndUpdate(
                    { user: req.user._id, 'cartItems.product': product },
                    {
                        $push: {
                            cartItems: req.body.cartItems,
                        },
                    }
                ).exec((error, _cart) => {
                    if (error) return res.status(400).json({ error });
                    if (_cart) {
                        return res.status(201).json({
                            cart,
                        });
                    }
                });
            }
        } else {
            // if cart doesnot exits then create the new cart

            const cart = new Cart({
                user: req.body._id,
                cartItems: req.body.cartItems,
            });

            cart.save((error, data) => {
                if (error) return res.status(400).json({ error });
                if (data) {
                    return res.status(201).json({
                        messgae: data,
                    });
                }
            });
        }
    });
};
