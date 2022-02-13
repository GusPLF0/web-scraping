const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const express = require("express");
const app = express();


const url = 'https://www.fundamentus.com.br/resultado.php'
const arr = [];
let newArr = [];
let Data;
async function getData(){
    const {data} = await axios.get(url);
    const $ = cheerio.load(data);
    $('.center .conteudo .resultado tbody tr').each((i, elem)=>{
        Data = $(elem).text().replace(/\n/g," ");
        Data = Data.split(" ")
        arr.push(Data);
    })
    for (let i = 0; i < arr.length; i++) {
        if(arr[i][11] != 0){
            newArr.push([arr[i][1], parseFloat(arr[i][11]), parseFloat(arr[i][16])]); 
        }
    }
}

getData();

app.get('/',(req,res)=>{
    res.json(newArr)
});

app.listen('8080',()=>{
    console.log("certo");
})