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
    if(!this.translate){
      this.translate = true;
      this.service.translateText(textToTranslate).subscribe((res: any) => {
        const translatedText = res.data.translations[0].translatedText;
        this.data.forEach((image: any) => {
          if (image.explanation === textToTranslate) {
            image.explanation = translatedText;
          }
        });
      });
    } else {
      this.translate = false;
    }
  }
}
