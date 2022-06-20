import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  imports: [HomeRoutingModule, CarouselModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
