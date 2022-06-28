const router = require('express').Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

// posts comment
router.route('/:pizzaId').post(addComment);
// deletes comment
router.route('/:pizzaId/:commentId').delete(removeComment);
// adds reply
router.route('/:pizzaId/:commentId').put(addReply).delete(removeComment);
// remove reply
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;