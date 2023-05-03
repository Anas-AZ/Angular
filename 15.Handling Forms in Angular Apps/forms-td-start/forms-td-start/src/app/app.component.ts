import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  defaultQuestion = 'pet';
  answer= '';
  genders=['male','female'];

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(form: NgForm){
  //   console.log(form.value);
  // }

  @ViewChild('f') signupForm: NgForm;

  onSubmit(){
    console.log(this.signupForm.value)
  }
}
