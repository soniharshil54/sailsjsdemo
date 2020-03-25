/**
 * ArticlesController
 *
 */

module.exports = {
	list:function(req, res){
        Articles.find({}).exec(function(err, articles){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.view('pages/list', {articles:articles});
        });
    },
    add: function(req, res){
        console.log("add api called")
        res.view('pages/add');
    },
    create:function(req, res){
        var title = req.body.title;
        var body = req.body.body;

        Articles.create({title:title, body:body})
            .then(result => {
                res.redirect('/articles/list');
            })
            .catch(err => {
                res.send(500, {error: 'Database Error'});
            })
    },
    delete: function(req, res){
        Articles.destroy({id:req.params.id})
            .then(result => {
                res.redirect('/articles/list');
            })
            .catch(err => {
                res.send(500, {error: 'Database Error'});
            })

        return false;
    },
    edit: function(req, res){
        Articles.findOne({id:req.params.id})
            .then(result => {
                res.redirect('/articles/list');
            })
            .catch(err => {
                res.view('pages/edit', {article:article});
            })
    },
    update: function(req, res){
        var title = req.body.title;
        var body = req.body.body;

        Articles.update({id: req.params.id},{title:title, body:body})
            .then(result => {
                res.redirect('/articles/list');
            })
            .catch(err => {
                res.send(500, {error: 'Database Error'});
            })

        return false;
    }
};

