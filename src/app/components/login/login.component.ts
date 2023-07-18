import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public auth: AuthService) {
    console.log('LoginComponent constructor');
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/),
    ]),
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    console.log('LoginComponent: onSubmit()');
    console.log(this.loginForm.value);

    this.username?.reset();
    this.password?.reset();
  }

  ngOnInit(): void {
    console.log('LoginComponent initialized');

    // this.loginService.login('username', 'password').subscribe(
    //   (data) => {
    //     console.log('LoginComponent: login success');
    //     this.router.navigate(['/reservation']);
    //   },
    //   (error) => {
    //     console.log('LoginComponent: login failed');
    //   }
    // );
  }

  ngOnDestroy(): void {
    console.log('LoginComponent destroyed');

    // this.loginService.logout().subscribe(
    //   (data) => {
    //     console.log('LoginComponent: logout success');
    //   },
    //   (error) => {
    //     console.log('LoginComponent: logout failed');
    //   }
    // );
  }
}
