export type OptionId = string;
export type OptionName = string;

export interface IOption {
    _id?: OptionId;
    name: OptionName;
    isCorrect: boolean;
}
