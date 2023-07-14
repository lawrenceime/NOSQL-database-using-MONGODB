import express from 'express';
import {createUser, getAll, login, updateUser} from '../controllers/userController';


const router = express.Router();

router.post('/create', createUser)
router.post('/login', login)
router.get('/getall', getAll)
router.put('/update', updateUser)

export default router;


