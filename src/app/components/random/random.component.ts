import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent {

  formRandom!: FormGroup;
  data!: any;
  ok: boolean = true;
  count!: number;
  translate: boolean = false;

  constructor(private service: ServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formRandom = this.formBuilder.group({
      count: ["", Validators.required]
    });
  }

  generateImages() {
    this.count = this.formRandom.value.count;
    this.service.getApod(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${this.count}`).subscribe({
      next: (res) => {
        this.data = res;
      },
      error: () => {
        this.ok = false;
      }
    });
  }

  translateExplanation(textToTranslate: string) {
    if (this.translate) {
      const targetLanguage = 'en';
      this.service.translateText(textToTranslate, targetLanguage).subscribe((res: any) => {
        const translatedText = res.data.translations[0].translatedText;
        this.data.forEach((imagen: any) => {
          if (imagen.explanation === textToTranslate) {
            imagen.explanation = translatedText;
          }
        });
        this.translate = false;
      });
    } else {
      const targetLanguage = 'es';
      this.service.translateText(textToTranslate, targetLanguage).subscribe((res: any) => {
        const translatedText = res.data.translations[0].translatedText;
        this.data.forEach((imagen: any) => {
          if (imagen.explanation === textToTranslate) {
            imagen.explanation = translatedText;
          }
        });
        this.translate = true;
      });
    }
  }
}
