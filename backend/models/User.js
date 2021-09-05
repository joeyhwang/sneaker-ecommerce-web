const mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)
const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    googleId: String,
    
    email: {
        type: String,
        required:true,
        unique: true,
    },
    facebookId: String,
    image: String,
    orders: [mongoose.Schema.Types.ObjectId]
    



})

userSchema.plugin(findOrCreate)

const User = mongoose.model('User', userSchema)


module.exports = User;
