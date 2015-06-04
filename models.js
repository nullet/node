var models = ['posts.js'];

var allModels = function() {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i])();
    }
};

module.exports = allModels;