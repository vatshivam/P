var validator = require('validator');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var mongoose=require('mongoose');

var UserSchema=mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        validate:{
            validator: (value)=>{
                return validator.isEmail(value); }}
        },
    password:{
        type:String,
        required: true,
        minlength: 6
    }
    // tokens: [{
    //     access:{ type:String, required: true},
    //     token:{type:String, required:true}
    // }],
    
//     cart: {
//         ItemName:{
//         type: String,
//         minlength: 1,
//         trim: true,
//         unique: true
//     },
//         quantity:{
//         type: Number,
//         minvalue: 1,
//         trim: true
//     }
// }
});

// UserSchema.methods.generateAuthToken= function(){
//     var user= this;
//     var access='auth';
//     var token=jwt.sign({_id:user._id.toHexString(),access}, '123abc' ).toString();
//     user.tokens=user.tokens.concat([{access,token}]);
//     user.save().then(token=>{
//         console.log("token added");
//         return token;
//     });
// }

// UserSchema.statics.findByToken= function(token){
//     var User =this;
//     var decoded;
//     try{
//         decoded=jwt.verify(token, '123abc');
//     }
//     catch(e){
//         return Promise.reject();
//     }
//     return User.findOne({_id: decoded._id,
//     "tokens.token" : token,
//     "tokens.access" : 'auth'});
// }

// UserSchema.pre('save', function(next){
//     var user =this;
//     if(user.isModified('password')){
//         bcrypt.genSalt(10,(salt,err)=>{
//             bcrypt.hash(user.password,salt,(err,hash)=>{
//                 user.password=hash;
//                 next();
//             });
//         });
//     }
// });

// UserSchema.statics.findByCredentials=function(email,password){
//     var User =this;
//     return User.findOne({email:email}).then(user=>{
//         if(!user){return Promise.reject();}
//         return new Promise((resolve,reject)=>{
//             bcrypt.compare(password, result.password,(res,err)=>{
//                 if(res){
//                     resolve(user);
//                 }
//                 else reject();
//             });
//         });
        
//     });
// };
var User = mongoose.model('User',UserSchema);
module.exports={
    User
}