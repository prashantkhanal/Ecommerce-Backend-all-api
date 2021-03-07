const User = require('../../Modals/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    //veryfing if user already exits we won't allow to create
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (user)
            return res.status(400).json({
                message: 'user already register',
            });

        // If user is not register then we'll say to create user

        const { firstName, lastName, email, password } = req.body;

        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            role: 'admin',
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
                    message: data,
                });
            }
        });
    });
};

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (error) return res.status(404).json({ message: error });
        if (user) {
            if (user.authenticate(req.body.password) && user.role === 'admin') {
                const token = jwt.sign(
                    { _id: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                );
                const {
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName,
                } = user;
                res.status(200).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName },
                });
            } else {
                res.status(400).json({
                    message: 'invalid password',
                });
            }
        } else {
            return res.status(400).json({
                message: 'something went wrong',
            });
        }
    });
};
