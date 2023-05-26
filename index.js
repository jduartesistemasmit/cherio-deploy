import axios from "axios";
import * as cheerio from "cheerio";
import express from 'express';

const json = {
    'fruits': null,
    'animals': null,
}

const getData = async (url) => {
    const pag = await axios.get(url);
    const $ = cheerio.load(pag.data);
    const tags = $('.col-xs-6');
    let array = [];
    tags.each((i, elem) => {
        const obj = {
            id: null,
            hora: "",
            numero: null,
            animal: "",
            imagen: ""
        }

        const texto = $(elem).find('span').text();

        obj.id = i+1;
        obj.hora = texto.slice(-5);
        obj.numero = texto.slice(0, 2).trim();
        obj.animal = texto.length < 10 ? "-" : texto.slice(4, texto.length - 5).trim();
        obj.imagen = "https:"+$(elem).find('img').attr('src');

        array.push(obj);

    })
    return array;
};



const app = express();
const port = process.env.PORT || 3000;

let iso;

getData('https://www.tuazar.com/loteria/animalitos/resultados/').then(res => json.animals = res);




app.get('/', (req, res) => res.json(json));

app.listen(port);
console.log('Server on port', port);

