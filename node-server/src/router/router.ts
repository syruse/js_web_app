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
        const data: JwtData = { user: { name: user.name, email: user.email, is_admin: user.is_admin} };
        const token = GeneralController.jwt_sign(data);
        res.send({ token: token, data });
    }
});

router.post('/register', async (req: express.Request, res: express.Response) => {
    console.log("registeration for ")
    const { email, pass, name } = req.body;
    console.log("registeration for " + email + " " + name);
    try {
        await GeneralController.register(email, pass, name);
        res.send('OK');
        console.log("registration succeeded for " + email);
    } catch (error) {
        res.status(400).send(error.message);
        console.log("registration failed for " + email);
    }
});

router.get('/api/phones', async (req, res) => {
    console.log("/api/phones ")
    const phones = await GeneralController.getPhones();
    res.send(phones);
});

router.post('/api/phones', async (req, res) => {
    console.log("/api/phones ", (req as any).user);
    if ( typeof (req as any).user  === 'undefined' || !(req as any).user.is_admin) {
        res.sendStatus(401);
        console.log("unauthorized request");
        return;
    }

    const { model, desc, price } = req.body;
    console.log(" phone is bening added " + model + " " + desc + " " + price);
    try {
        const phone = await GeneralController.addPhone(model, desc, price);
        res.send('OK');
        console.log("phone adding succeeded id: " + phone.id);
    } catch (error) {
        res.status(400).send(error.message);
        console.log("phone adding failed for " + model);
    }
});

export default router;