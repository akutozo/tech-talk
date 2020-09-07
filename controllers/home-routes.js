const router = require('express').Router();
const sequelize = require('../config/connection');
const { article, User, Comment, Article } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Article.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'article_title',
        'article_text',
        'created_at'
      ]
      ,
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
    .then(dbArticleData => {
      // pass a single article object into the homepage template
      const articles = dbArticleData.map(article => article.get({ plain: true })); 
      res.render('homepage', {
          articles,
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

router.get('/article/:id', (req, res) => {
    article.findOne({
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
      .then(dbarticleData => {
        if (!dbarticleData) {
          res.status(404).json({ message: 'No article found with this id' });
          return;
        }
  
        // serialize the data
        const article = dbarticleData.get({ plain: true });
  
        // pass data to template
        res.render('single-article', {
            article,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;