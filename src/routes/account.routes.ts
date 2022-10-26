import { Router } from 'express';
import { getAccount } from '../controllers/account.controller';

const router = Router();

router.get('/:email', getAccount);

export default router; 