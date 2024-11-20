import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MannegerService } from '../../services/manneger.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  public signedUp: boolean = false;
  public fullName!: string;
  public error: { [key: string]: boolean } = {
    firstName: false,
    lastName: false,
    emailRequired: false,
    emailInvalid: false,
    passwordRequired: false,
    passwordMinLength: false,
    passwordMaxLength: false,
  };
  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
    ]),
  });
  private manneger = inject(MannegerService);
  get texts() {
    return this.manneger.texts;
  }

  ngOnInit() {
    this.trackChanges();
  }

  trackChanges() {
    Object.keys(this.signUpForm.controls).forEach((field) => {
      const control = this.signUpForm.get(field);
      control?.valueChanges.subscribe(() => {
        this.validateField(field);
      });
    });
  }

  validateField(field: string) {
    const control = this.signUpForm.get(field);
    if (field === 'email') {
      this.error['emailRequired'] = control?.hasError('required') || false;
      this.error['emailInvalid'] = control?.hasError('email') || false;
    } else if (field === 'password') {
      this.error['passwordRequired'] = control?.hasError('required') || false;
      this.error['passwordMinLength'] = control?.hasError('minlength') || false;
      this.error['passwordMaxLength'] = control?.hasError('maxlength') || false;
    } else {
      this.error[field] = control?.invalid || false;
    }
  }

  onSubmit() {
    Object.keys(this.signUpForm.controls).forEach((field) => {
      this.validateField(field);
    });
    if (this.signUpForm.valid) {
      this.fullName =
        this.signUpForm.value.firstName + ' ' + this.signUpForm.value.lastName;
      this.signedUp = true;
    }
  }
}
