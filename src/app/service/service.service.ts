import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getApod(api: string) {
    return this.http.get(api);
  }

  translateText(textToTranslate: string) {
    const targetLanguage = 'es';
    const url = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyBTB6tFVKO9aDBvhE76tBovzhijDkqS5eY";
    const body = {
      q: textToTranslate,
      target: targetLanguage
    };
    return this.http.post(url, body)
  }
}
