import { Router } from 'express';
import { createTransaction } from '../controllers/transaction.controller';

const router = Router();

router.put('/send', createTransaction);
router.put('/receive', createTransaction);

export default router; 