import { Schema, model, Document, PopulatedDoc, PaginateModel } from 'mongoose';
import { IUser } from './User';
import mongoosePaginate from 'mongoose-paginate-v2';

export type QuizId = string;
export type QuizName = string;
export type QuizDescription = string;

export interface IQuiz extends Document {
    _id: QuizId;
    name: QuizName;
    description?: QuizDescription;
    user: PopulatedDoc<IUser>;
    createdAt: Date;
    updatedAt: Date;
}

const QuizSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'The quiz name is required.'],
        },
        description: String,
        questions: [
            {
                name: {
                    type: String,
                    required: [true, 'The question name is required.'],
                },
                description: {
                    type: String,
                },
                options: [
                    {
                        name: {
                            type: String,
                            required: [true, 'The option name is required.'],
                        },
                        isCorrect: {
                            type: Boolean,
                            default: false,
                        },
                    },
                ],
            },
        ],
        user: {
            ref: 'User',
            type: Schema.Types.ObjectId,
        },
    },
    {
        collection: 'quiz',
        timestamps: true,
        versionKey: false,
    }
);

QuizSchema.plugin(mongoosePaginate);

interface QuizModel<T extends Document> extends PaginateModel<T> {}

const QuizModel: QuizModel<IQuiz> = model<IQuiz>('Quiz', QuizSchema) as QuizModel<IQuiz>;

export default QuizModel;
