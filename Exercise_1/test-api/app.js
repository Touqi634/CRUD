const Joi = require('joi');
const express = require('express');
const { valid, func } = require('joi');
const app = express();

app.use(express.json());

const users = [
    {id:1, name: 'Bob Baker'},
    {id:2, name: 'Rakesh'},
    {id:3, name: 'Buk Lau'},
    {id:4, name: 'John Smith'},
    {id:5, name: 'Tyrone'},
]

app.get('/', (req, res) =>{
    res.send('Hello World!');
});

app.get('/api/users', (req, res) =>{
    res.send(users);
});

app.get('/api/users/:id', (req, res) =>{

    const user = users.find(c => c.id === parseInt(req.params.id))

    if(!user) return res.status(404).send('User with given ID was not found');

    res.send(user);
})

app.post('/api/users/', (req, res) =>{
  
    if(!user) return res.status(404).send('User with given ID was not found');

    const result = validateUser(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const user  = {
        id: users.length + 1,
        name: req.body.name
    }
    users.push(user);
    res.send(user);
})

app.put('/api/users/:id',(req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id))

    if(!user) {
    res.status(404).send('User with given ID was not found');
    return;
    }

   const result = validateUser(req.body);

   if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  user.name = req.body.name;
  res.send(user);

})

app.delete('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id))

    if(!user) {
        res.status(404).send('User with given ID was not found');
        return;
    }
   const index =  users.indexOf(user)
   users.splice(index, 1);
   res.send(user);
})

function validateUser(user){
    const schema = Joi.object( {
        name: Joi.string().min(3).required()
    });
   return schema.validate(user);
}

const port =  process.env.PORT || 3000;
app.listen(port, function(){
    console.log(`Listening on port ${port}`);
});
