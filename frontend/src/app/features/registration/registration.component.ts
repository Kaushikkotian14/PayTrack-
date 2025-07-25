import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, RegistrationData } from '../../core/services/auth.services';
import { Router } from '@angular/router';
import {RouterModule} from '@angular/router';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationData: RegistrationData = {
    phone: '',
    pan_no: '',
    password: ''
  };

  constructor( private authService: AuthService, private router: Router ) {}

  onSubmit() {
    if (this.isFormValid()) {
      this.authService.register(this.registrationData).subscribe({
        next: (response) => {
          alert(response.detail);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(err.error.detail );
        }
      });
    }
  }

  private isFormValid(): boolean {
    return this.registrationData.phone.length === 10 &&
           this.registrationData.pan_no.length === 10 &&
           this.registrationData.password.length > 0;
  }
}