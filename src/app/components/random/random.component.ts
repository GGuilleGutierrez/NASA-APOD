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

  ngOnInit(): void {
    this.formRandom = this.formBuilder.group({
      count: ["", Validators.required]
    })
  }

  constructor(private service: ServiceService, private formBuilder: FormBuilder) { }

  data!: any;
  ok: boolean = true;
  count!: number;

  generateImages() {
    this.count = this.formRandom.value.count;
    this.service.getApod(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${this.count}`).subscribe({
      next: (res) => {
        this.data = res;
      }, error: () => {
        this.ok = false;
      }
    })
  }

  translate: boolean = false;
  translatedText!: string;

  translateExplanation(textToTranslate: string) {
    this.translate = true;
    this.service.translateText(textToTranslate).subscribe((res: any) => {
      this.translatedText = res.data.translations[0].translatedText;
  })
  }
}
