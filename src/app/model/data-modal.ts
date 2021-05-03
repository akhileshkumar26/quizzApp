export interface Result {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface RootObject {
  response_code: number;
  results: Result[];
}

export interface options {
    question: string;
    correctAnswer: string;
    inCorrectAnswers: string[];
    optionsValue?:any[]
}
