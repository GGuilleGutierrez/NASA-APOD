import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  slideOffset = '0';

  constructor() { }

  ngOnInit(): void {
  }

  prevSlide(): void {
    const slideWidth = window.innerWidth;
    const offset = parseInt(this.slideOffset, 10) + slideWidth;

    if (offset > 0) {
      const lastSlideOffset = -(slideWidth * (4 - 1));
      this.slideOffset = lastSlideOffset + 'px';
    } else {
      this.slideOffset = offset + 'px';
    }
  }

  nextSlide(): void {
    const slideWidth = window.innerWidth;
    const offset = parseInt(this.slideOffset, 10) - slideWidth;

    if (offset <= -(slideWidth * (5 - 1))) {
      this.slideOffset = '0';
    } else {
      this.slideOffset = offset + 'px';
    }
  }
}