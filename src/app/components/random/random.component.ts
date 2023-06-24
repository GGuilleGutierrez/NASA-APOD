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

  count!: number;

  generateImages() {
    this.count = this.formRandom.value.count;
    this.service.getApod(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${this.count}`).subscribe(res => {
      this.data = res;
    })
  }
}