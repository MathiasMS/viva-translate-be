import { NextFunction, Request, Response } from 'express';
import { paginationLimit } from '../../utils/pagination';
import QuizzesService from '../../services/quizzes/quizzes.service';
import { HTTP400Error } from '../../utils/httpErrors';
import { QuizDTO } from '../../dtos/QuizDTO';
import { AnswerDTO } from '../../dtos/AnswerDTO';

// Quizz manipulation
export const getManyPaginated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            userId,
            query: { page, limit },
        } = req;

        const [pageRequested, limitRequested] = paginationLimit(page, limit);

        const paginatedQuizzes = await QuizzesService.getManyPaginated(userId, pageRequested, limitRequested);

        res.send(paginatedQuizzes);
    } catch (error) {
        next(error);
    }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { quizId },
        } = req;

        if (!quizId) {
            throw new HTTP400Error('You need to provide a valid quiz ID.');
        }

        const quiz = await QuizzesService.getOne(quizId);

        res.send(quiz);
    } catch (error) {
        next(error);
    }
};

export const answer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const answerDTO: AnswerDTO = req.body;

        res.send(await QuizzesService.answer(answerDTO));
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req;

        const quizzDTO: QuizDTO = req.body;

        res.send(await QuizzesService.create(quizzDTO, userId));
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { quizId },
        } = req;

        if (!quizId) {
            throw new HTTP400Error('You need to provide a valid quiz ID.');
        }

        const quizDTO: QuizDTO = req.body;

        res.send(await QuizzesService.update(quizId, quizDTO));
    } catch (error) {
        next(error);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            params: { quizId },
        } = req;

        if (!quizId) {
            throw new HTTP400Error('You need to provide a valid quiz ID.');
        }

        res.send(QuizzesService.remove(quizId));
    } catch (error) {
        next(error);
    }
};
