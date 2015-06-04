var router = require('express').Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var Post = require('../models/post')

/* GET users listing. */
router.get('/', function(req, res) {
    Post.find({}, function(err, posts) {
    var postArr = [];

        posts.forEach(function(post) {
            postArr.push(post);
        });

    res.render('posts', { title: 'Blog posts!', posts: postArr });
    });
});

router.get('/:id', function (req, res) {
    Post.findById(req.params.id, function(err, post) {
        res.render('post', { title: post.title, post: post });
    });
});

module.exports = router;
