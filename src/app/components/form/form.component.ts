import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  addCountryForm: FormGroup;
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.addCountryForm = this.fb.group({
      countryControl: [],
      note: ['', [Validators.required]]
    });
  }

}
