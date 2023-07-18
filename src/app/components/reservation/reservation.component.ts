import { Component, ViewRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environment';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';

const { fiAPI, fiToken } = environment;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent {
  constructor(private httpClient: HttpClient, public auth: AuthService) {
    console.log('ReservationComponent constructor');
  }
  AuthSubscription!: Subscription;
  isLoggedIn: boolean = false;
  showToast: boolean = false;
  toastClass: string = 'bg-success text-light z-index-1';
  toastMessage: string = 'Success!';

  reservationForm = new FormGroup({
    airline: new FormControl('', [Validators.required]),
    flightNumber: new FormControl('', [Validators.required]),
    arrivalDate: new FormControl('', [Validators.required]),
    arrivalTime: new FormControl('', [Validators.required]),
    numOfGuests: new FormControl(1, [Validators.required, Validators.min(1)]),
    comments: new FormControl(''),
  });

  get airline() {
    return this.reservationForm.get('airline');
  }

  get flightNumber() {
    return this.reservationForm.get('flightNumber');
  }

  get arrivalDate() {
    return this.reservationForm.get('arrivalDate');
  }

  get arrivalTime() {
    return this.reservationForm.get('arrivalTime');
  }

  get numOfGuests() {
    return this.reservationForm.get('numOfGuests');
  }

  get comments() {
    return this.reservationForm.get('comments');
  }

  onSubmit(): void {
    console.log('ReservationComponent: onSubmit()');
    console.log(this.reservationForm.value);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', fiToken);

    this.httpClient
      .post<Boolean>(
        fiAPI,
        {
          airline: this.airline?.value,
          flightNumber: this.flightNumber?.value,
          arrivalDate: this.arrivalDate?.value,
          arrivalTime: this.arrivalTime?.value,
          numOfGuests: Number(this.numOfGuests?.value),
          comments: this.comments?.value,
        },
        { headers: headers }
      )
      .subscribe((data) => {
        console.log('ReservationComponent: onSubmit() success');
        console.log(data);
        if (data) {
          this.toastClass = 'bg-success text-light z-index-1';
          this.toastMessage = 'Success!';
          return this.toggleToast();
        }
        this.toastClass = 'bg-danger text-light z-index-1';
        this.toastMessage = 'Not found!';
        this.toggleToast();
      });

    this.reservationForm.reset();
  }

  toggleToast() {
    this.showToast = !this.showToast;
  }

  ngOnInit(): void {
    console.log('ReservationComponent initialized');
    this.AuthSubscription = this.auth.isAuthenticated$.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  ngOnDestroy(): void {
    console.log('ReservationComponent destroyed');
  }
}
