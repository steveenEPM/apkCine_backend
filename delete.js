/*var bcrypt = require('bcryptjs');
var hash = bcrypt.hashSync("elementoCarmesi", 12);
console.log(hash);
console.log(bcrypt.compareSync("elementoCarmesi",hash))*/

const jwt = require('jsonwebtoken')

const token = jwt.sign({id:"steveen"},"secret",{expiresIn:"7d"})

console.log(token);

console.log("======================")
jwt.verify(token,"secret",(err,decode)=>{
    if(err){
        console.log(err);
    }
    console.log(decode.id);
})

console.log("====================")
try {
    var decoded = jwt.verify(token, 'secrdet');
    console.log(decoded);
  } catch(err) {
    console.log(err);
  }