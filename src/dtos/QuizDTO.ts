import { IsArray, IsNotEmpty } from 'class-validator';
import { QuestionDescription, QuestionId, QuestionName } from '../entities/Question';
import { IOption } from '../entities/Option';

export interface IQuestion {
    _id?: QuestionId;
    name: QuestionName;
    description: QuestionDescription;
    options: IOption[];
}

export class QuizDTO {
    @IsNotEmpty()
    public name: string;

    @IsArray()
    public questions: IQuestion[];

    public _id?: string;

    public description?: string;

    constructor(name: string, questions: IQuestion[], _id?: string, description?: string) {
        this.name = name;
        this.questions = questions;
        this._id = _id;
        this.description = description;
    }
}
