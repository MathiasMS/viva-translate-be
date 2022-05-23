import { IsNotEmpty } from 'class-validator';

export class AnswerDTO {
    @IsNotEmpty()
    public questionId: string;

    @IsNotEmpty()
    public optionId: string;

    constructor(questionId: string, optionId: string) {
        this.questionId = questionId;
        this.optionId = optionId;
    }
}
