require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const toDoModel = require('./models/ToDo')

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL).then(console.log("connected to database"));


app.get('/get', (req, res) => {

    toDoModel.find().then(result => res.json(result)).catch(err => res.json(err))    
})

app.post('/add', (req, res) => {

    const task = req.body.task;
    console.log("post request");
    toDoModel.create( { 

        task : task
    }).then(result => res.json(result)).catch(
        err=> res.json(err)
    )


})

app.put('/update/:id', (req, res) => {

    const {id} = req.params
    toDoModel.findByIdAndUpdate({_id : id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))

    
})

app.delete('/delete/:id', (req,res)=> {

    const {id} = req.params
    console.log("delete req")
    toDoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
    

})


app.get('/', (req, res) => {

    res.send('Hello');
})

app.listen(PORT, ()=> {

    console.log(`Listening on port = ${PORT}`);
})
