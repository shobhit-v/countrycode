import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  countryCodeForm: FormGroup;
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.countryCodeForm = this.fb.group({
      code: ['', [Validators.required]]
    });
  }

  getDynamicErrors(controlName) {
    const control = this.countryCodeForm.get(controlName);
    if (control.hasError('required')) {
      return 'This Field is required';
    } else if (control.hasError('pattern')) {
      return 'Invalid Value';
    }
  }
}
