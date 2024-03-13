import { HeaderModule } from './../header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsComponent } from './rooms.component';
import { FormsModule } from '@angular/forms';
import { RouteConfigToken } from '../services/routeConfig.service';


@NgModule({
  declarations: [
    EmployeeComponent,
    RoomsComponent,
    RoomsListComponent,
    RoomsBookingComponent,
    RoomsAddComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    RoomsRoutingModule
  ],
  providers: [ {
    provide: RouteConfigToken,
    useValue: { title: 'Room'},
  }]
})
export class RoomsModule { }
