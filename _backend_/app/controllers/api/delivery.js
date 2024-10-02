const Delivery = require('../../models/delivery');
let ObjectId = require('mongodb').ObjectId;

exports.read_all_deliveries = async(req, res) =>{

    Delivery.find()
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => res.status(500).json({error: err}))
}

exports.read_delivery_by_id = async(req, res) =>{
    console.log(req.params)
    Delivery.findOne({
        delivery_id: req.params.id
    })
    .then(result => {
        console.log("result<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => res.status(500).json({error: err}))
}
exports.create_delivery_by_id = async(req, res) =>{
    console.log(req.params)

    const _delivery = new Delivery({
        delivery_id: req.params.id,
        package_id: req.body.package_id,
        pickup_time: req.body.description,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        location: req.body.location,       
        status: req.body.status,

    })
    _delivery.save()
        .then((_del) => {
            res.status(200).json({
                message: "delivery created successfully !"
            })
        })
        .catch(err => res.status(500).json({error: err}))
   }

exports.update_delivery_by_id = async(req, res) =>{
    console.log(req.params)  
    console.log(typeof(req.body._id))   

    Delivery.updateOne({
        _id: req.body._id
    },{
        ...req.body,
        status: req.body.status,
    })
    .then((data) =>{
        console.log(data)
        res.status(200).json({
            message: 'the modification have been done successfully !',
            data: data
        })
    })
    .catch(error => res.status(500).json({
        error
    }));


}

exports.delete_delivery_by_id = async(req, res) =>{

    Delivery.deleteOne({
        delivery_id: req.params.delivery_id
    })
    .then(result => {
        
            Delivery.find()
            .then((data) =>{
                res.status(200).json({
                    message: ' delivery successfully deleted !',
                    data: data
                })
            })
            .catch(error => res.status(500).json({
                error
            }));
       

    })
    .catch(err => res.status(500).json({error: err}))
}