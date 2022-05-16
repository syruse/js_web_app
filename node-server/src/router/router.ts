import express from 'express';
import auth from '../middleware/auth';
import { GeneralController, JwtData } from '../controller/generalController';
import { User } from '../entity/User';
import logger from '../middleware/logger';

const router = express.Router();

router.use('/', logger);
router.use('/api/', auth);

router.post('/login', async (req: express.Request, res: express.Response) => {
    const { email, pass } = req.body;
    console.log("login for " + email);
    const user: User | undefined = await GeneralController.login(email, pass);
    if (!user) {
        res.sendStatus(401);
        return;
    } else {
        console.log("login succeeded for " + user.email)
        const data: JwtData = { user: { name: user.name, email: user.email} };
        const token = GeneralController.jwt_sign(data);
        res.send({ token: token, data });
    }
});

router.post('/register', async (req: express.Request, res: express.Response) => {
    console.log("registeration for ")
    const { email, pass, name } = req.body;
    console.log("registeration for " + email + " " + name);
    const result: boolean = await GeneralController.register(email, pass, name);
    if (!result) {
        res.sendStatus(401);
        console.log("registration failed for " + email);
    } else {
        res.send('OK');
        console.log("registration succeeded for " + email);
    }
});

router.get('/api/phones', async (req, res) => {
    console.log("/api/phones " + (req as any).user)
    res.send((req as any).user);
});

export default router;