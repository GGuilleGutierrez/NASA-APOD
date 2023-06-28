import { Component, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('divAnimation', [
      state('hidden', style({ opacity: 0, transform: 'translateX(100%)' })),
      state('hidden2', style({ opacity: 0, transform: 'translateX(-100%)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('1000ms ease-in-out')),
      transition('hidden2 => visible', animate('1000ms ease-in-out'))
    ]),
  ],
})
export class BannerComponent {
  slideOffset = '0';

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

  ngOnInit(): void {
  }

  div1 = { state: 'hidden' };
  div2 = { state: 'hidden2' };
  div3 = { state: 'hidden' };
  div4 = { state: 'hidden2' };

  @HostListener('window:scroll', [])
  onScroll() {
    const rect = document.documentElement.getBoundingClientRect();
    const scrollPosition = window.innerHeight + window.pageYOffset;

    if (scrollPosition > rect.height * 0.1) {
      this.div1.state = 'visible';
      this.div2.state = 'visible';
    }

    if (scrollPosition > rect.height * 1.3) {
      this.div3.state = 'visible';
      this.div4.state = 'visible';
    }
  }
}