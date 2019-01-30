var mongoose =require('mongoose');

var ItemsSchema=mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },

    image:{
        type: String,
        required:true,
        trim:true
    },

    attribute2:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },

    attribute3:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },

    attribute4:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },

    attribute5:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },

    attribute1:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },
});
var Items= mongoose.model('Items',ItemsSchema);

module.exports={
    Items
}