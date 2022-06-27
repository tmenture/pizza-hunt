const router = require('express').Router();
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// Get all & Post at /api/pizzas
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

//Get one, put, and delete at /api/pizzas/:id
router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);
// exports the routes
module.exports = router;