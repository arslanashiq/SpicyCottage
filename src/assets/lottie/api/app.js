const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const morgan = require("morgan");
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(morgan("tiny"));

const productsSchema = mongoose.Schema({
    id: Number,
    category: { type: mongoose.Schema.Types.ObjectId,
ref: "category"
},
    title: {
        type: String
    },
    nutrition: {
        vitamen: {
            type: String
        },
        carbohydrates: {
            type: String
        },
        proteins: {
            type: String
        },
        fats: {
            type: String
        },
        minerals: {
            type: String
        },
        fiber: {
            type: String
        }
    },
    preparation: {
        step1: {
            type: String
        },
        step2: {
            type: String
        },
        step3: {
            type: String
        },
        time_stamp: { type: Date, default: Date.now }

    },
    incredient: String,
    totaltime: String,
    serving: String,
    rating: String,
    image: String

})

const Product = mongoose.model("Prodcuts", productsSchema);

require("dotenv/config");

const api = process.env.API_URL;

app.get(`${api}/products`, async (req, res) => {

    const productList = await await Product.find().populate("category");
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
});

app.patch(`${api}/products/:id`, async (req, res) => {
    try {
        const _id = req.params.id;
        const updateProducts = await Product.findByIdAndUpdate(_id, req.body);
        res.send(updateProducts);
    } catch (e) {
        res.status(400).send(updateProducts);
    }
})

app.post(`${api}/products`, (req, res) => {
  	  const products = new Product({
        id: req.body.id,
        category: req.body.category,
        title: req.body.title,
        nutrition: req.body.nutrition,
        preparation: req.body.preparation,
        incredient: req.body.incredient,
        totaltime: req.body.totaltime,
        serving: req.body.serving,
        rating: req.body.rating,
        image: req.body.image
    })

    products.save().then((createdProduct) => {
        res.status(201).json(createdProduct);
    })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });

});

const categorySchema = mongoose.Schema({
    description: String,
    name: String,
    imagename: String,
    time_stamp: { type: Date, default: Date.now }
})

const Cat = mongoose.model("category", categorySchema);


app.get(`${api}/category`, async (req, res) => {

    const catList = await Cat.find();
    if (!catList) {
        res.status(500).json({ success: false })
    }
    res.send(catList);
});



app.patch(`${api}/category/:id`, async (req, res) => {
    try {
        const _id = req.params.id;
        const updateCats = await Cat.findByIdAndUpdate(_id, req.body);
        res.send(updateCats);
    } catch (e) {
        res.status(400).send(updateCats);
    }
})

app.post(`${api}/category`, (req, res) => {
    const cat = new Cat({
        description: req.body.description,
        name: req.body.name,
        imagename: req.body.imagename,
        time_stamp: req.body.time_stamp
    })

    cat.save().then((createdCat) => {
        res.status(201).json(createdCat);
    })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });

});



mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("Database Connected");

    })
    .catch((err) => {
        console.log(err);
    });

app.listen(4000, () => {
    console.log("Listen On Port 4000")
});
