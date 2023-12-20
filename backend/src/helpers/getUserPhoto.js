const fs = require('fs')

const getUserPhoto = async (req, res, user) => {
    fs.readFile(user.photo, function(error, data) {
        if(error) { 
            return console.log(error)
        }
        res.send(data)
    })
}

module.exports = getUserPhoto