import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#username should be invalid when empty'),
    () => {
      expect(component.username?.invalid).toBeTruthy();
    };

  it('#username should be valid when not empty'),
    () => {
      component.username?.setValue('username');
      expect(component.username?.valid).toBeTruthy();
    };

  it('#password should be invalid when empty'),
    () => {
      expect(component.password?.invalid).toBeTruthy();
    };

  it('#password should be valid when not empty'),
    () => {
      component.password?.setValue('password');
      expect(component.password?.valid).toBeTruthy();
    };

  it('#loginForm should be invalid when any child is invalid'),
    () => {
      component.username?.setValue('');
      expect(component.loginForm.valid).toBeFalsy();
    };

  it('#loginForm should be valid when all children are valid'),
    () => {
      component.username?.setValue('username');
      component.password?.setValue('password');
      expect(component.loginForm.valid).toBeTruthy();
    };

  it('#onSubmit should reset username and password'),
    () => {
      component.username?.setValue('username');
      component.password?.setValue('password');
      component.onSubmit();
      expect(component.username?.value).toEqual('');
      expect(component.password?.value).toEqual('');
    };
});
