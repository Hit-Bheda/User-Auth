const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const port = 3100;

app.use(express.json());

const users = []

app.get('/users',(req,res)=>{
    res.json(users)
})

app.post('/register',async(req,res)=>{
    try {
        const hashPasswd = await bcrypt.hash(req.query.password,10)
        const user = { username : req.query.username,password:hashPasswd }
        users.push(user)
        res.status(200).send()
    } catch (error) {
        console.log(`Error While Register ${error}`);
    }
})
app.post('/login',async(req,res)=>{
    const user = users.find(user => user.username = req.query.username)
    if(!user){
        res.status(400).send("User Not Found")
    }
    try {
        if(await bcrypt.compare(req.query.password,user.password)){
            res.status(200).send("Login Sucessfully")
        }else{
            res.status(400).send("Login Failed")
        }
    } catch (error) {
        console.log(`Error While Gogin ${error}`);
    }
})
app.listen(port)