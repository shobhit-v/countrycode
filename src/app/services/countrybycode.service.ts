import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountrybycodeService {

  constructor(
    private http: HttpClient
  ) { }

  getCountryDetails(code) {
    const header = {
      headers: {}
    };
    return this.http.get(`https://restcountries.eu/rest/v2/alpha/${code}`, header);
  }
  getCountryCode() {
    return this.http.get('https://restcountries.eu/rest/v2/all?fields=alpha3Code');
  }
}
