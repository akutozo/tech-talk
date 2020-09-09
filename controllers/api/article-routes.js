const router = require('express').Router();
const { Article, User, Comment } = require("../../models");
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all articles
router.get('/', (req, res) => {
  Article.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'article_title',
        'article_text',
        'user_id',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'article_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
  })
  .then(dbArticleData => res.json(dbArticleData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
    Article.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'article_title',
            'article_text',
            'created_at',
          ],
          include: [
            // include the Comment model here:
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'article_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
              model: User,
              attributes: ['username']
            }
          ]
    })
    .then(dbArticleData => {
        if (!dbArticleData) {
          res.status(404).json({ message: 'No article found with this id' });
          return;
        }
        res.json(dbArticleData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/', (req, res) => {
  console.log("post", req.body);
    Article.create({
      article_title: req.body.title,
      article_text: req.body.text,
      user_id: req.body.user_id
    })
      .then(dbArticleData => res.json(dbArticleData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.delete('/:id', withAuth, (req, res) => {
  Article.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbArticleData => {
      if (!dbArticleData) {
        res.status(404).json({ message: 'No article found with this id' });
        return;
      }
      res.json(dbArticleData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;