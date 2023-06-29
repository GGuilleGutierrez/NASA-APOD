import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendary',
  templateUrl: './calendary.component.html',
  styleUrls: ['./calendary.component.css']
})
export class CalendaryComponent {

  formCalendary!: FormGroup;

  ngOnInit(): void {
    this.formCalendary = this.formBuilder.group({
      year: ["", Validators.required],
      month: ["", Validators.required],
      day: ["", Validators.required]
    })
  }

  constructor(private service: ServiceService, private formBuilder: FormBuilder) { }

  data: any = [];

  count!: number;

  year!: number;
  month!: number;
  day!: number;

  ok: boolean = true;

  generateImage() {
    this.year = this.formCalendary.value.year;
    this.month = this.formCalendary.value.month;
    this.day = this.formCalendary.value.day;
    this.service.getApod(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${this.year}-${this.month}-${this.day}`).subscribe({
      next: (res) => {
        this.data.push(res);
        this.addData();
        // this.verifyMediaType();
      }, error: () => {
        this.ok = false;
      }
    })
  }

  date!: Date;
  explanation!: string;
  media_type!: string;
  title!: string;
  url!: string;
  copyright!: string;

  addData() {
    this.date = this.data[0].date;
    this.explanation = this.data[0].explanation;
    this.media_type = this.data[0].media_type;
    this.title = this.data[0].title;
    this.url = this.data[0].url;
    this.copyright = this.data[0].copyright;
  }

  // isImg:boolean = true;

  // verifyMediaType(){
  //   if(this.data[0].media_type == "video"){
  //     this.isImg = false;
  //   }
  // }

  translate: boolean = false;
  translatedText!: string;

  translateExplanation(textToTranslate: string) {
    if (!this.translate) {
      const targetLanguage = 'es';
      this.service.translateText(textToTranslate, targetLanguage).subscribe((res: any) => {
        this.translatedText = res.data.translations[0].translatedText;
        this.translate = true;
      })
    } else {
      const targetLanguage = 'en';
      this.service.translateText(textToTranslate, targetLanguage).subscribe((res: any) => {
        this.translatedText = res.data.translations[0].translatedText;
        this.translate = false;
      })
    }
  }
}
