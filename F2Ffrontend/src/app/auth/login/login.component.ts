import { TokenStorageService } from './../../services/token-storage.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    company: null,
    email: [null, Validators.required],
    password: [null,  Validators.required],
  });


  constructor(private fb: FormBuilder, private authService : AuthService,private router: Router,
    private tokenStorge:TokenStorageService) {}

  onSubmit(): void {
    console.log(this.loginForm);
    if(this.loginForm){
      this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(
        (data) =>{
          console.log(data)
          this.tokenStorge.saveToken(data.accessToken);
          this.tokenStorge.saveUser(data)
          this.router.navigateByUrl('/product/show');
        },
      )
    }
  }
}
