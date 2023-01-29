const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://steveen123:elementocarmesi@cluster0.eud8h.mongodb.net/miApk')
    .then(() => console.log('Connected!')).
    catch(() => { console.log("error"); });

module.export ={mongoose}
