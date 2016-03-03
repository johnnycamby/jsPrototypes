/**
 * Created by johnny on 3/10/2015.
 */


module.exports = function(req, res , next){

    // using generic models
    var model = req.options.model;

    if(!model)
        throw 'model is required for ResourceOwn policy';

    var Model = req._sails.models[model];

    Model.findOne(req.params.id).exec(function(err, record){

        if(!record.owner)
            throw 'Model requires owner property for ResourceOwn policy';

        if(record.owner !== req.userId)
            res.status(401).send({
                error: 'You do not have access to that resource'
            });
        req.record = record;
        next();
    })
}