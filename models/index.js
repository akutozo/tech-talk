const User = require("./User");
const Article = require("./Article");
const Comment = require('./Comment');

// create associations
User.hasMany(Article, {
    foreignKey: 'user_id'
  });

Article.belongsTo(User, {
foreignKey: 'user_id',
});

//Commment, Questions, Concerns?
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Comment.belongsTo(Article, {
    foreignKey: 'Article_id'
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id'
 });
  
Article.hasMany(Comment, {
    foreignKey: 'Article_id'
});

module.exports = { User, Article, Comment };