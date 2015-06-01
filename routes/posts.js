var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var db = req.db;
    db.collection('posts').find().toArray(function (err, items) {
        res.json(items);
    });
});

router.get('/:id', function (req, res) {
  var db = req.db;
  db.collection('posts').find()
})

module.exports = router;
