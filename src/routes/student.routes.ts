import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';

const router = Router();

router.post('/students', StudentController.register);
router.post('/students/progress', StudentController.saveProgress);

export default router;
