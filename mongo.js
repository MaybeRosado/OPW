const mongoose = require('mongoose')

if(process.argv.length < 3 ){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = 
`mongodb+srv://erosado:${password}@part3.viuh9.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Part3`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

// person.save().then(result => {
//     console.log(`added ${process.argv[3]} number ${process.argv[4]} to the phonebook `);
//     mongoose.connection.close();
// })

Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})