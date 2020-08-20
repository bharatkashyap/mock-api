const express = require('express');
const axios = require('axios');
const index = require('./frontend');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());

const hello = (req, res, next) => {
    res.send('hello');
}

const jsonBin = {
    "trainee": "https://api.jsonbin.io/b/5f3ec0ca514ec5112d09fcb6/",
    "employer": "https://api.jsonbin.io/b/5f3ec430514ec5112d09ff47/",
    "trainingInstitute": "https://api.jsonbin.io/b/5f3ec8b9514ec5112d0a027d/",
    "awardingBody": "https://api.jsonbin.io/b/5f3ec9e9993a2e110d322ba9/",
    "assessmentAgency": "https://api.jsonbin.io/b/5f3eca274d8ce411137c8ae2/",
    "course": "https://api.jsonbin.io/b/5f3ee674514ec5112d0a18a2/",
    "batch": "https://api.jsonbin.io/b/5f3eca624d8ce411137c8b09/",
    "qp": "https://api.jsonbin.io/b/5f3ecc9d4d8ce411137c8c83/",
    "vacancy": "https://api.jsonbin.io/b/5f3eccbd993a2e110d322d9e/"
}

const idFields = {
    "trainee": "trainee_id",
    "employer": "employer_id",
    "trainingInstitute": "training_centre_id",
    "awardingBody": "awarding_body_id",
    "assessmentAgency": "assessment_agency_id",
    "course": "classroom_id",
    "batch": "batch_id",
    "qp": "qp_code",
    "vacancy": "job_vacancy_id"
}

const paths = ['/trainee', '/employer', '/trainingInstitute', '/awardingBody', '/assessmentAgency', '/course', '/batch', '/qp', '/vacancy'];


const create = async (req, res, next) => {
    const path = req.path.replace('/', '');
    const list = await axios.get(`${jsonBin[path]}latest`);
    list.data.push(req.body);
    const updatedList = list.data;
    const updateList = await axios.put(jsonBin[path], updatedList, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(updateList.data.success) res.send(req.body);    
}

const getMany = async (req, res, next) => {
    const path = req.path.replace('/', '');
    const list = await axios.get(`${jsonBin[path]}latest`);
    res.send(list.data);
}

const getOne = async (req, res, next) => {
    const path = req.path.replace('/', '').split('/')[0];    
    const list = await axios.get(`${jsonBin[path]}latest`);    
    let uniqueItem = list.data.filter( item => item[idFields[path]] === req.params[`${path}Id`]);    
    res.send(uniqueItem);
}

const update = async (req, res, next) => {
    const path = req.path.replace('/', '');
    const list = await axios.get(`${jsonBin[path]}latest`);    
    req.body.forEach( patchItem => {
       let id = patchItem[idFields[path]];       
       if(!id) res.status(400).send(`The ${idFields[path]} to update is required.`);
       else {
            list.data.forEach( (item, index) => {
               if(item[idFields[path]] === id) {
                   list.data[index] = Object.assign(item, patchItem);
               }
           });
       }
   })
   const updatedList = list.data;
   const updateList = await axios.put(jsonBin[path], updatedList, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(updateList.data.success) res.send(updateList.data.data);
}

server.get('/', hello);

paths.forEach( path => {
        server.post(path, create);
        server.get(path, getMany);
        server.patch(path, update);
        server.get(`${path}/:${path.replace('/', '')}Id`, getOne);
    });



const port = 8000 || process.env.PORT;
server.listen(port, () => {
    console.log('Server listening at', port);
})