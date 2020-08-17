const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());

const hello = (req, res, next) => {
    res.send('Hello World!');
}

const newTrainee = async (req, res, next) => {
    const trainees = await axios.get('https://api.jsonbin.io/b/5f3a5c31b88c04101cf59111/latest');
    trainees.data.push(req.body);
    const updatedTrainees = trainees.data;
    const updateTrainees = await axios.put('https://api.jsonbin.io/b/5f3a5c31b88c04101cf59111/', updatedTrainees, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(updateTrainees.data.success) res.send(req.body);
}

const traineeList = async (req, res, next) => {
    const trainees = await axios.get('https://api.jsonbin.io/b/5f3a5c31b88c04101cf59111/latest');
    res.send(trainees.data);
}

const getTrainee = async (req, res, next) => {
    const trainees = await axios.get('https://api.jsonbin.io/b/5f3a5c31b88c04101cf59111/latest');
    let trainee = trainees.data.filter( trainee => trainee.trainee_id === req.params.traineeId);
    res.send(trainee);
}

const updateTrainees = async (req, res, next) => {
   const trainees = await axios.get('https://api.jsonbin.io/b/5f3a5c31b88c04101cf59111/latest');
   req.body.forEach( patchTrainee => {
       let { trainee_id } = patchTrainee;
       console.log(trainee_id);
       if(!trainee_id) res.code(400).send('The trainee ID to update is required.');
       else {
            trainees.data.forEach( (trainee, index) => {
               if(trainee.trainee_id == trainee_id) {
                   console.log(trainees.data[index]);
                   console.log(Object.assign(trainee, patchTrainee));
                   trainees.data[index] = Object.assign(trainee, patchTrainee);
                   console.log(trainees.data[index]);
               }
           });
       }
   })
   const updatedTrainees = trainees.data;
   const updateTrainees = await axios.put('https://api.jsonbin.io/b/5f3a5c31b88c04101cf59111/', updatedTrainees, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(updateTrainees.data.success) res.send(updateTrainees.data.data);
}
  

server.get('/', hello);
server.post('/trainee', newTrainee)
server.get('/trainee', traineeList);
server.patch('/trainee', updateTrainees);
server.get('/trainee/:traineeId', getTrainee);

const port = 8000 || process.env.PORT;
server.listen(port, () => {
    console.log('Server listening at', port);
})