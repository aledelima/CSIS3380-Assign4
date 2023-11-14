//imports
const express = require('express');
const bodyParser = require('body-parser');
const records = require('./records.js')

//Variables
const app = express();
const PORT = 3000;



//Middleware for parsing jsons
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Endpoints
//All users
app.get('/getusers', async (req, res)=>{
    const users = await records.getUsers();
    res.json(users);
});

//A specific user
app.get('/getuser/:id', async (req, res)=>{
    const user = await records.getUser(req.params.id);
    if (user)
        res.json(user);
    else
        res.status(404).json({message: `User Not Found. id: ${req.params.id}`});
});

//A random user
app.get('/getrandomuser', async (req, res)=>{
    const user = await records.getRandomUser();
    res.json(user);
});

//Create a new user
app.post('/newuser', async (req,res) =>{
    try {
        const user = await records.createUser({
            email: req.body.email,
            username: req.body.username
        });
    res.json(user);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

//Update an existing user
app.put('/users/:id', async(req,res) => {
    try {
    const user = await records.getUser(req.params.id);
    if(user){
        if (req.body.email)
            user.email= req.body.email;
        if (req.body.username)
            user.username= req.body.username;
        await records.updateUser(user);
        res.status(204).end();
    } else {
        res.status(404).json({message: `User Not Found. id: ${req.params.id}`});
    }
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

//Delete an existing user
app.delete("/users/:id", async(req,res, next) => {
    try {
        const user = await records.getUser(req.params.id);
        if (user) {
            await records.deleteUser(user);
            res.status(204).end();
        } else {
            res.status(404).json({message: `User Not Found. id: ${req.params.id}` });
        }
    } catch(err){
        next(err);
    }
});

//Error handling for non existing URL
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
});

//application deploy
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});