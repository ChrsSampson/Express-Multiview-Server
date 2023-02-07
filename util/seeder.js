// utility for planting data into the database

const User = require('../models/User');
const Machine = require('../models/Machine');
const mongoose = require('mongoose');

const testUsers = [
    {
        email: 'John.Doe@placeholder.com',
        password: '123456',
        displayName: 'John Doe',
        role: 'user'
    },
    {
        email: 'a@test.com',
        password: 'admin',
        displayName: 'Test Admin',
        role: 'admin'
    }
]

const testMachines = [
    {
        name: 'Machine 1',
        link: 'https://test.com',
        tag: 'Desktop Encoder'
    },
    {
        name: 'Machine 2',
        link: 'https://test.com',
        tag: 'Desktop Encoder'
    },
    {
        name: 'Machine 3',
        link: 'https://test.com',
        tag: 'Laptop Encoder'
    },
    {
        name: 'Machine 4',
        link: 'https://test.com',
        tag: 'Radius'
    }
]


async function seeder () {

    const users = testUsers;
    const machines = testMachines;

    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log(err));

    const Ids = {
        users: [],
        machines: []
    }
    try{

    for(let user of users) {
        const test = await User.find({email: user.email});
        if(test.length > 0) continue;
            const newUser = new User(user);
            await newUser.save();
            Ids.users.push(newUser._id);
    }   

    for(let machine of machines) {
        const test = await Machine.find({name: machine.name});
        if(test.length > 0) continue;
            const newMachine = new Machine(machine);
            await newMachine.save();
            Ids.machines.push(newMachine._id);
    }

    return Ids;
    } catch(err) {
        console.log(err);
    }
}

module.exports = seeder