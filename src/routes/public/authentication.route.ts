import { Router } from 'express';
import * as authentication from '../../controllers/authentication/authentication.controller';
import { UserDTO } from '../../dtos/UserDTO';
import validateRequest from '../../middlewares/validateRequest';

const router: Router = Router();

router.post('/signup', validateRequest(UserDTO), authentication.signUpUser);
router.post('/login', validateRequest(UserDTO), authentication.login);

export default router;
