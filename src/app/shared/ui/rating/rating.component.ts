import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Input() hasLabel: boolean = false;
  @Input() color?: string;

  icons: string[] = [];

  ngOnInit() {
    let i = 1;
    while (i <= this.rating) {
      this.icons.push('fas fa-star');
      i++;
    }
    if (Math.floor(this.rating) !== this.rating) {
      this.icons.push('fas fa-star-half-alt');
      i++;
    }
    while (i <= 5) {
      this.icons.push('far fa-star');
      i++;
    }
  }
}
