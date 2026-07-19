// require("dotenv").config();
const mongoose = require("mongoose");

const MongooURL = process.env.MONGOURL;

main().then(()=>{
    console.log("DataBase Was connected");
}).catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(MongooURL);
}
