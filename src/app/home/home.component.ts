import { Component, Injector } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent extends BaseComponent {
  carouselImages = ['1469474968028-56623f02e42e', '1441974231531-c6227db76b6e', '1470252649378-9c29740c9fa8'];

  constructor(injector: Injector) {
    super(injector);
  }

  getCarouselImage = (i: number) => `https://images.unsplash.com/photo-${this.carouselImages[i]}?fit=crop&w=720`;
}
