const User = require('../models/user')
const braintree = require("braintree")
require("dotenv").config()

const gateWay = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "v2r2kyh9jhz2v739",
    publicKey: "jqxsh8wwvwkp8w7c",
    privateKey: "29a8a322e754319daac01b5de6f0a571"
    
})

exports.generateToken = (req, res) => {

    gateWay.clientToken.generate({}, function(err, response){
        if(err){
            res.status(500).send(err)
        } else {
            res.send(response)
        }
    })
}