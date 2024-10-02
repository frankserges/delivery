const Packages = require('../../models/package');
// const { v4: uuidv4} = require('uuid');


exports.read_all_packages = async(req, res) =>{
    
    Packages.find()
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => res.status(500).json({error: err}))
}

exports.read_package_by_id = async(req, res) =>{
    console.log(req.params)
    Packages.findOne({
        package_id: req.params.id
    })
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => res.status(500).json({error: err}))
}
exports.create_package_by_id = async(req, res) =>{
    console.log(req.params);


    const _package = new Packages({
        package_id: req.params.id,
        active_delivery_id: "",
        description: req.body.description,
        weight: req.body.weight,
        width: req.body.width,
        height: req.body.height,
        depth: req.body.depth,
        from_name: req.body.from_name,
        from_address: req.body.from_address,
        from_location: req.body.from_location,
        to_name: req.body.to_name,
        to_address: req.body.to_address,
        to_location: req.body.to_location,

    })
    _package.save()
        .then((_pack) => {
            res.status(200).json({
                message: "package created successfully !"
            })
        })
        .catch(err => res.status(500).json({error: err}))
   
}
exports.update_package_by_id = async(req, res) =>{

    Packages.findOne({
        package_id: req.params.package_id
    })
    .then(result => {
        if(result){
            Packages.updateOne({
                package_id: req.params.package_id
            },{
                ...req.body
            })
            .then((data) =>{
                res.status(200).json({
                    message: 'the modification have been done successfully !',
                    data: data
                })
            })
            .catch(error => res.status(500).json({
                error
            }));
        }
        else {
                res.status(500).json({
                    message: 'the modification was not successfully updated!'
                })
            }
    })
    .catch(err => res.status(500).json({error: err}))
}

exports.delete_package_by_id = async(req, res) =>{

    Packages.deleteOne({
        package_id: req.params.package_id
    })
    .then(result => {
        
            Packages.find()
            .then((data) =>{
                res.status(200).json({
                    message: ' package successfully deleted !',
                    data: data
                })
            })
            .catch(error => res.status(500).json({
                error
            }));
       

    })
    .catch(err => res.status(500).json({error: err}))
}