require('dotenv').config()
const cors = require('cors')
const express = require('express');
const app = express();
const Person = require('./models/person');

app.use(cors());
app.use(express.json());
app.use(express.static('dist'))

// app.post('/api/persons', (req, res) => {
//     res.status(201).json({message: 'Person added', data: req.body})
// })


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/info', (request, response) => {
    const resTime = new Date()
    response.send(`<p> <b>Phonebook has info for ${persons.length} people </p>
                    <p>${resTime}</p>
        `);
    
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})


app.post('/api/persons', (request, response) => {
    const body = request.body;
    
    if(body.name === undefined){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})