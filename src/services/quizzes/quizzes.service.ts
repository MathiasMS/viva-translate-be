import Quiz, { IQuiz } from '../../entities/Quiz';
import { HTTP400Error, HTTP404Error } from '../../utils/httpErrors';
import { QuizDTO } from '../../dtos/QuizDTO';
import { AnswerDTO } from '../../dtos/AnswerDTO';
import { Types } from 'mongoose';
import { IOption } from '../../entities/Option';

export interface IQuizzesService {
    getManyPaginated(userId: string, page: number, limit: number): Promise<any>;
    getOne(quizId: string): Promise<IQuiz | null>;
    answer(answerDTO: AnswerDTO): Promise<IOption>;
    create(quizDTO: QuizDTO, userId: string): Promise<IQuiz>;
    update(quizId: string, quizDTO: QuizDTO): Promise<IQuiz | null>;
    remove(quizId: string): Promise<string>;
}

const QuizzesService: IQuizzesService = {
    async getManyPaginated(userId: string, page: number, limit: number): Promise<any> {
        const query = { user: userId };
        const options = {
            page,
            limit,
            select: {
                'questions.options.isCorrect': 0,
            },
        };

        return await Quiz.paginate(query, options);
    },
    async getOne(quizId: string): Promise<IQuiz | null> {
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            throw new HTTP404Error('Quiz not found.');
        }

        return quiz;
    },
    async answer(answerDTO: AnswerDTO) {
        const optionId = new Types.ObjectId(answerDTO.optionId);
        const questionId = new Types.ObjectId(answerDTO.questionId);

        const options: any[] = await Quiz.aggregate([
            {
                $project: {
                    questions: {
                        $filter: {
                            input: '$questions',
                            as: 'item',
                            cond: {
                                $eq: ['$$item._id', questionId],
                            },
                        },
                    },
                },
            },
            {
                $unwind: '$questions',
            },
            {
                $project: {
                    questions: {
                        $filter: {
                            input: '$questions.options',
                            as: 'item',
                            cond: {
                                $eq: ['$$item._id', optionId],
                            },
                        },
                    },
                },
            },
            {
                $unwind: '$questions',
            },
            {
                $replaceRoot: {
                    newRoot: '$questions',
                },
            },
        ]);

        const option = options[0];

        const optionToCheck: IOption = {
            isCorrect: option.isCorrect,
            name: option.name,
        };

        return optionToCheck;
    },
    async create(quizDTO: QuizDTO, userId: string): Promise<IQuiz> {
        const query = { user: userId, name: quizDTO.name };

        const existingQuiz = await Quiz.findOne(query);

        if (existingQuiz) {
            throw new HTTP404Error('Another Quiz already has that name.');
        }

        const { name, description, questions } = quizDTO;

        return await Quiz.create({
            name,
            description,
            questions,
            user: {
                _id: userId,
            },
        });
    },
    async update(quizId: string, quizDTO: QuizDTO): Promise<IQuiz | null> {
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            throw new HTTP404Error('Quiz not found.');
        }

        const { name, description, questions } = quizDTO;

        const updateQuiz = {
            name,
            description,
            questions,
        };

        return await Quiz.findByIdAndUpdate(quizId, updateQuiz, { new: true });
    },
    async remove(quizId: string): Promise<string> {
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            throw new HTTP404Error('Quiz not found.');
        }

        await Quiz.findByIdAndRemove(quizId);

        const validateRemovedQuiz = await Quiz.findById(quizId);

        if (validateRemovedQuiz) {
            throw new HTTP400Error('Quiz could not be deleted.');
        }

        return quizId;
    },
};

export default QuizzesService;
