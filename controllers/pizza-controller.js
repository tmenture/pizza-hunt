const { Pizza } = require('../models');
const { db } = require('../models/Pizza');

const pizzaController = {
    // gets all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // gets a single pizza
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .then(dbPizzaData => {
            // if no pizzza is found send 404
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with that id!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // creates pizzas
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },
    // updates pizzas by id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true} )
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(400).json({ message: 'No pizza found with that id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.sttus(404).json(err));
    },
    // deletes pizzas by id
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with that id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = pizzaController;