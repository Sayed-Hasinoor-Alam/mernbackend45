const mongoose = require('mongoose');

const DB = process.env.DATABASE;
// const PORT = process.env.PORT || 5000

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
  // useCreateIndex:true
}).then(() => {
    console.log(`connected to Database`)})
.catch((err) => console.log(err))

