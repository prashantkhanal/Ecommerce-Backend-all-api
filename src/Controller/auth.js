const User = require('../Modals/user');
const jwt = require('jsonwebtoken');
exports.signup = (req, res) => {
    //veryfing if user already exits we won't allow to create
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (user)
            return res.status(400).json({
                message: 'email address already exits',
            });

        // If user is not register then we'll say to create user

        const { firstName, lastName, email, password } = req.body;

        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString(),
        });
        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: 'something went wrong',
                });
            }
            if (data) {
                return res.status(201).json({
                    message: 'user created succesfully',
                });
            }
        });
    });
};

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            if (user.authenticate(req.body.password)) {
                //at first paylod and secretkey and expries in
                const token = jwt.sign(
                    { _id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                );
                //Destructing the array
                const {
                    _id,
                    firstName,
                    lastName,
                    role,

                    fullName,
                } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,

                        role,
                        fullName,
                    },
                });
            } else {
                res.status(400).json({
                    message: 'invaid password',
                });
            }
        } else {
            return res.status(400).json({
                message: 'something went wrong',
            });
        }
    });
};
