import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountrybycodeService } from 'src/app/services/countrybycode.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  countryCodeForm: FormGroup;
  incorrectCode: Boolean = false;
  countryAlreadyfetched: Boolean = false;
  showData = false;
  @ViewChild('showbtn') showbtn: ElementRef;

  countries = [];
  constructor(
    private fb: FormBuilder,
    private countrybycodeService: CountrybycodeService
  ) {
  }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.countryCodeForm = this.fb.group({
      code: ['', [Validators.required]]
    });
  }

  showCountry() {
    const code = this.countryCodeForm.get('code').value;
    if (this.countries.length > 0) {
      const status = this.countries.find(elem => elem.alpha3Code.toUpperCase() === code.toUpperCase());
      console.log(status);
      if (typeof status !== 'undefined' && status.countryName) {
        this.countryAlreadyfetched = true;
        return;
      }
    }
    this.countrybycodeService.getCountryDetails(code).subscribe(
      (res: any) => {
        const format = {
          'countryName': res.name,
          'neighborCountries': res.borders,
          'languagesSpoken': res.languages,
          'flag': res.flag,
          'alpha3Code': res.alpha3Code
        };
        this.countries.push(format);
        this.showData = true;
        this.countryCodeForm.reset();
      },
      (err: any) => {
        if (!err.ok) {
          if (err.status === 404) {
            this.incorrectCode = true;
          }
        }
      }
    );
  }

  triggerFalseClick() {
    const el: HTMLElement = this.showbtn.nativeElement as HTMLElement;
    el.click();
  }

  getDynamicErrors(controlName) {
    const control = this.countryCodeForm.get(controlName);
    if (control.hasError('required')) {
      return 'This Field is required';
    } else if (control.hasError('pattern')) {
      return 'Invalid Value! Exactly Three letter country code';
    }
  }

  resetWrongErr() {
    this.incorrectCode = false;
    this.countryAlreadyfetched = false;
  }
}
