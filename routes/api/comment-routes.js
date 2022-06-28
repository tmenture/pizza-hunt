const router = require('express').Router();
const {
    addComment,
    removeComment
} = require('../../controllers/comment-controller');

// posts comment
router.route('/:pizzaId').post(addComment);
// deletes comment
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;