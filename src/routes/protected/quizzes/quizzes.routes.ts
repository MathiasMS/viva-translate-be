import { Router } from 'express';
import * as quizzes from '../../../controllers/quizzes/quizzes.controller';
import validateRequest from '../../../middlewares/validateRequest';
import { QuizDTO } from '../../../dtos/QuizDTO';
import { AnswerDTO } from '../../../dtos/AnswerDTO';

const router: Router = Router();

router.get('/', quizzes.getManyPaginated);
router.get('/:quizId', quizzes.get);
router.post('/:quizId/answer', validateRequest(AnswerDTO), quizzes.answer);
router.post('', validateRequest(QuizDTO), quizzes.create);
router.put('/:quizId', validateRequest(QuizDTO), quizzes.update);
router.delete('/:quizId', quizzes.remove);

export default router;
