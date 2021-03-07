const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(
//     bodyParser.urlencoded({
//         limit: '50mb',
//         extended: true,
//         parameterLimit: 50000,
//     })
// );

//Routes

const authRoutes = require('./Routes/auth');
const adminRoutes = require('./Routes/admin/auth');
const categoryRoutes = require('./Routes/category');
const productRoutes = require('./Routes/product');
const cartRoutes = require('./Routes/cart');
// Enviromnat variable
env.config();

// Mongodb Connection
mongoose
    .connect(
        `mongodb+srv://${process.env.MANGO_DB_USER}:${process.env.MANGO_DB_PASSWORD}@cluster0.7drzf.mongodb.net/${process.env.MANGO_DB_DATABASE}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
        }
    )
    .then(() => {
        console.log('db is connected sucessfully');
    });

app.use(express.json());

app.use(cors());

app.use('/api/v1', authRoutes);
app.use('/api/v1', adminRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', cartRoutes);
app.listen(process.env.PORT, () => {
    console.log(`the server is running in ${process.env.PORT}`);
});
