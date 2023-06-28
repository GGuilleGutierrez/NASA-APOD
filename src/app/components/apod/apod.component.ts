import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})

export class ApodComponent {

  ngOnInit(): void {
    this.apod();
  }

  constructor(private service: ServiceService) { }

  data: any = [];
  ok: boolean = true;

  apod() {
    return this.service.getApod("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY").subscribe({
      next: (res) => {
        this.data.push(res);
        this.addData();
        this.verifyMediaType();
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

  isImg: boolean = true;

  verifyMediaType() {
    if (this.data[0].media_type == "video") {
      this.isImg = false;
    }
  }

  // download() {
  //     const blob = new Blob([this.url], { type: 'image/jpg' });
  //     const urlImagen = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = urlImagen;
  //     link.download = 'apod-' ;
  //     // + this.date;
  //     link.click();
  //     window.URL.revokeObjectURL(urlImagen);
  //   }
}
