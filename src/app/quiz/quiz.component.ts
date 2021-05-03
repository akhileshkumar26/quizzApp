import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { options, Result } from "../model/data-modal";
import { QuizzService } from "../quizz.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.scss"],
})
export class QuizComponent implements OnInit {
  name: string;
  enableQuiz:boolean = false;
  quizData: Result[];
  count:number = 0;
  score:number = 0;
  options:options[] = [];
  finish:boolean = false;
  selectedOption;
  index;

  constructor(private _quizService: QuizzService) {
   // this.startQuiz();
  }

  ngOnInit() {}

  addName(value) {
    this.name = value;
  }


  startQuiz() {
    this.enableQuiz = true;
    this._quizService
      .quizData()
      .pipe(
        map((res) => {
          return (this.quizData = res["results"]);
        })
      )
      .subscribe((res) => {
        console.log(res);
        res.forEach((curValue) => {
          this.options.push(
            {
              question: curValue.question,
             correctAnswer: curValue.correct_answer,
             inCorrectAnswers: curValue.incorrect_answers,
             optionsValue:[curValue.correct_answer,...curValue.incorrect_answers].sort()
            }
          )
          
        })
      });
      console.log(this.options)
  }

  nextQuestion() {
    this.count++;
    if (this.count == this.quizData.length) {
      //  this.score = 0;
      //  console.log('count',this.count);
        this.finish = true;
      } else {
 
    console.log('count',this.count);
    this.validateAnswer(this.selectedOption, this.index);
      }
  }

  restart() {
    this.finish = false;
    this.count = 0;
    this.score = 0;
    this.enableQuiz = false;
    this.startQuiz();
  }

  sendingAnswer(option, index) {
    console.log(option);
    this.selectedOption = option;
    this.index = index;
  //  this.validateAnswer(option, index);
  }
  validateAnswer(answer, index) {
    console.log(answer, index);
    console.log(this.options[this.count-1].correctAnswer)
  //  console.log(this.options[index].correctAnswer == answer)
  if(this.options[this.count-1].correctAnswer == answer ) {
    this.score++;
    console.log('score',this.score);
    this.selectedOption = ""
  }
   this.selectedOption = ""
  }
}
