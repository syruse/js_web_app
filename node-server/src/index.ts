import express from 'express';
import bodyParser from "body-parser";

const port = 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

app.post('/login', async (req, res) => {
    const {email, pass} = req.body;
    console.log("login for " + email)
    /*const result = await user.findOne({email: email, pass: pass}).exec();
    if(!result){
        res.sendStatus(401);
        return;
    } else {
        console.log("login succeeded for " + result.email)
        const token = jwt.sign({ user: result }, configValues.jwt.secret);
        res.send({token});
    }*/
});

console.log("server is waiting for connection on port :", port)
app.listen(port);
