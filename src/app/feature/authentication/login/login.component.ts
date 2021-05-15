import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router){}
  loginForm = new FormGroup({
        username: new FormControl('' ,  [Validators.required]),
        password: new FormControl('' ,  [Validators.required])
    });

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // get f() { return this.loginForm.controls; }

  login(): void{
    this.authService.login(
      {
        // username: this.f.username.value,
        // password: this.f.password.value
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value
      }
    )
    .subscribe(user => {
      if (user) {
        localStorage.setItem('isloggedIN', JSON.stringify(true));
        this.authService.isLoggedIn$.next(true);
        this.router.navigateByUrl(this.returnUrl);
      }
      else{
        alert('Please Enter Valid Credentails');
        this.router.navigate(['/login']);
      }
      });
  }

  getControlValidationClasses(control: AbstractControl): object {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

}
