import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.component.html',
  imports: [
    FormsModule, ReactiveFormsModule
  ]
})

export class RegisterFormComponent {
  firstName = new FormControl('');
  lastName = new FormControl('');
  email = new FormControl('');
  username = new FormControl('');
  password = new FormControl('');
  repeatPassword = new FormControl('');

  passwordPattern = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
  passwordMatch: boolean = true;
  emailExists: boolean = false;

  loading: boolean = false;

  constructor(private loginService: LoginService, private userService: UserService) {
    this.firstName.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
    this.lastName.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
    this.email.setValidators([Validators.required, Validators.email]);
    this.username.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
    this.password.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(this.passwordPattern)]);
    this.repeatPassword.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
  }

  parseErrors(errors: ValidationErrors){
    if (errors == null){
      return;
    }

    if (errors?.["required"]){
      return "Completa este campo";
    }

    if (errors?.["minlength"]){
      return "El campo debe tener mínimo " + errors?.["minlength"].requiredLength+ " caracteres";
    }

    if (errors?.["maxlength"]){
      return "El campo puede tener máximo " + errors?.["maxlength"].requiredLength+ " caracteres";
    }

    if (errors?.["min"]){
      return "El campo debe tener un valor mínimo de " + errors?.["min"].min;
    }

    if (errors?.["email"]){
      return "El campo debe ser un correo electrónico válido";
    }

    if (errors?.["pattern"]){
      return "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número";
    }

    return ""
  }

  async onSubmit(): Promise<void> {
    this.email.markAllAsTouched();
    this.firstName.markAllAsTouched();
    this.lastName.markAllAsTouched();
    this.username.markAllAsTouched();
    this.password.markAllAsTouched();
    this.repeatPassword.markAllAsTouched();
    
    if (this.firstName.errors != null || this.lastName.errors != null || this.email.errors != null || this.username.errors != null || this.password.errors != null || this.repeatPassword.errors != null) {
      return;
    }

    if (this.password.value != this.repeatPassword.value) {
      this.passwordMatch = false;

      return;
    }
    
    this.loading = true;

    const email = await this.userService.existEmail(this.email.value!);

    if (email) {
      this.emailExists = true;
      this.loading = false;

      return;
    }

    const register = await this.loginService.register(this.username.value!, this.firstName.value!, this.lastName.value!, this.email.value!, this.password.value!);
    
    this.loading = false;
  }
}