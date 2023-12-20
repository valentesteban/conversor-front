import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class LoginComponent {
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  loading: boolean = false;

  errorAuth: boolean = false;

  constructor(private loginService: LoginService) {}
  
  parseErrors(errors: ValidationErrors) {
    if (errors == null) {
      return;
    }

    if (errors?.['required']) {
      return 'Completa este campo';
    }

    if (errors?.['minlength']) {
      return (
        'El campo debe tener mínimo ' +
        errors?.['minlength'].requiredLength +
        ' caracteres'
      );
    }

    if (errors?.['maxlength']) {
      return (
        'El campo puede tener máximo ' +
        errors?.['maxlength'].requiredLength +
        ' caracteres'
      );
    }

    if (errors?.['min']) {
      return 'El campo debe tener un valor mínimo de ' + errors?.['min'].min;
    }

    if (errors?.['email']) {
      return 'El campo debe ser un correo electrónico válido';
    }

    return '';
  }

  onSubmit(): void {
    if (this.email.errors != null || this.password.errors != null) {
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loginService
        .authenticate(this.email.value!, this.password.value!)
        .then((res) => {
          this.errorAuth = !res.success;
        })
        .finally(() => {
          this.loading = false;
        });
    }, 1000);
  }
}