const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 8181;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Shopping', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Create a Schema for the Data
const ItemSchema = new mongoose.Schema({
    name: String,
    description: String
});

// Create a Model
const Item = mongoose.model('Item', ItemSchema);

// Route to handle GET request
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to handle POST request
app.post('/items', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description
    });

    newItem.save()
        .then(item => res.send(`${item.name} saved to database!`))
        .catch(err => res.status(400).send("Unable to save data"));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});