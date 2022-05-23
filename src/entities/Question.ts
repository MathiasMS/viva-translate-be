import { Schema, model, Document, PopulatedDoc } from 'mongoose';
import { IUser } from './User';
import { IOption } from './Option';

export type QuestionId = string;
export type QuestionName = string;
export type QuestionDescription = string;

export interface IQuestions extends Document {
    _id: QuestionId;
    name: QuestionName;
    description?: QuestionDescription;
    options: PopulatedDoc<IOption>;
    createdBy: PopulatedDoc<IUser>;
    createdAt: Date;
    updatedAt: Date;
}

const QuestionSchema: Schema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Name is required.'],
        },
        description: {
            type: String,
        },
        options: [
            {
                option: {
                    type: String,
                    required: [true, 'La opción de respuesta es requerida'],
                },
                isCorrect: {
                    type: Boolean,
                    default: false,
                    required: [true, 'La validación de opción respuesta es requerida'],
                },
            },
        ],
        createdBy: {
            ref: 'User',
            type: Schema.Types.ObjectId,
        },
    },
    {
        collection: 'questions',
        timestamps: true,
        versionKey: false,
    }
);

export default model<IQuestions>('Questions', QuestionSchema);
