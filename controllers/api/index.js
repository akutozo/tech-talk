const router = require('express').Router();

const userRoutes = require('./user-routes');
const articleRoutes = require('./article-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/articles', articleRoutes);
router.use('/comments', commentRoutes);

module.exports = router;