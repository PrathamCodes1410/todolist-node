const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const { renderFile } = require('ejs');
const _ = require('lodash');

const app = express();

mongoose.connect("mongodb+srv://admin-pratham:pratham@cluster0.u9xhu9o.mongodb.net/test",{
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))


const dataSchema = new mongoose.Schema({
    name : String,
})

const Data = mongoose.model('Data', dataSchema)





let totalItems = 0;
let arr = [];
fillArray();
    async function fillArray(){
        const AllItem = await Data.find({})
        let total = AllItem.length;
        console.log(total)
        for(let i = 0; i < total; i++){
            let thisName = AllItem[i].name;
            arr.push(thisName);
            console.log(arr)
        }
    }


app.get(__dirname + "/", (req, res) => {
    let today = "Yes its working"  
    totalItems = arr.length
    let h1 = "Your List"
    res.render("index", {
        h1 : h1,
        aItem: arr,
        wtoday: today,
        ifyes: 1,
        tItem: totalItems
    });
})


app.post(__dirname + "/delete", (req, res) => {
    let shit = req.body.checker
    //console.log(shit)

    biggerShit()

    async function biggerShit(){
        let del = await Data.find({name : shit}).deleteOne().exec();
        //console.log(del)
    }
    let na = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == shit){
            //console.log("ok")
        }
        else{
            na.push(arr[i]);
        }
    }
    //console.log(na)
    //console.log(arr)
    arr = na

 

    res.redirect("/")
})



app.post(__dirname + "/", (req, res) => {
    let newItem = req.body.input;

    run()

    async function run()
    {
        const list =  new Data({
            name : newItem,
        })

        await list.save()
    }

    arr.push(newItem);
    totalItems = arr.length;

    res.redirect("/")
})

app.listen(process.env.PORT || 3000, (res, req) => {
    console.log("Server is up and running.");
})