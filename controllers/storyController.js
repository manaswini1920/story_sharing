const model = require('../models/story');
// GET request // sends all stories to users
exports.index =(req,res,next)=>{
    //res.send('send stories');
    model.find().then(
        stories=>res.render('./story/index',{stories})
    ).catch(err=>next(err));
    
};

//GET new story html page
exports.new=(req,res)=>{
res.render('./story/new',{});
};

//Post : create stories
exports.create =(req,res,next)=>{
    let story=new model(req.body);
    story.save()
    .then(
        story=> res.redirect('/stories'))
        .catch(
            err=>{
                if(err.name==="ValidationError"){
                    err.status=400;
                };
                next(err);
            })
    
};


//GET : get stories by id
exports.show=(req,res,next)=>{
//res.send('here is the story '+req.params.id);
        let id =req.params.id;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            let err = new Error('Invalid story id');
            err.status = 400;
            return next(err);
        }
    model.findById(id).then(
        story=>{
            if(story){
                res.render('./story/show',{story});
        }
        else{
            let err =new Error('The server cannot locate '+req.url);
            res.status=404;
            next(err);
        }} )
        .catch(err=>next(err));
};


//update : 2 steps - edit and update
exports.edit=(req,res,next)=>{
    let id =req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    model.findById(id).then(story=>{
        if(story){
            res.render('./story/edit',{story});
        }else{
            let err =new Error('The server cannot locate '+req.url);
            res.status=404;
            next(err);}
        }
    ).catch(err=>next(err));
       
};

exports.update=(req,res,next)=>{
    let body = req.body;
    let id =req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndUpdate(id,body,{useFindAndModify:false}).then(
        result=>{
            if(result){
                res.redirect('/stories/'+id);
            }
            else{
                let err =new Error('The server cannot locate '+req.url);
                res.status=404;
                next(err);
            }
    }).catch(err=>next(err));   };


    exports.delete = (req, res, next)=>{
        let id = req.params.id;

        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            let err = new Error('Invalid story id');
            err.status = 400;
            return next(err);
        }
        model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(story =>{
        if(story) {
            res.redirect('/stories');
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
    };