const mongoose = require('mongoose');


const mongoURI ="https://keepmynotes-47a07-default-rtdb.firebaseio.com"
//const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true"

// const connectToMongo = () =>{
// mongoose.connect(mongoURI, ()=>{
//     console.log("connected to mongoose");
// })
// }

const connectToMongo = () =>{
     mongoose.connect(mongoURI)
    .then(() =>{
        console.log("Mongo connected succesfully!");
    })

    .catch(error =>{
        console.log("error");
    })
     }

module.exports = connectToMongo;