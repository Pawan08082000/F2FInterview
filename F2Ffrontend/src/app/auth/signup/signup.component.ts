import { Router } from '@angular/router';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    company: null,
    name: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(5)])
    ],
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder, private authService : AuthService,private router: Router) {}
  ngOnInit(){

  }
  onSubmit(): void {
    console.log(this.signupForm);
    if(this.signupForm){
      this.authService.register(this.signupForm.value.name,this.signupForm.value.email,this.signupForm.value.password).subscribe(
        () =>{
          this.router.navigateByUrl('/auth/login');
        }
      )
    }
  }
}
