import { Component } from '@angular/core';
import { RegisterFormComponent } from "../../components/register-form/register-form.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    imports: [RegisterFormComponent]
})
export class RegisterComponent {

}
