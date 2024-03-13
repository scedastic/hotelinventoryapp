import { Component, OnInit, DoCheck, ViewChild, AfterViewInit, ViewChildren, QueryList, OnDestroy, SkipSelf } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit {

  hotelName = 'Hilton';
  numberOfRooms = 10;
  hideRooms = true;

  selectedRoom!: RoomList ;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  };

  title = 'Room List';

  roomList: RoomList[] = [];

  stream = new Observable(observer => {
    observer.next('user1'); //
    observer.next('user2'); //
    observer.next('user3'); //
    observer.complete();  //
  });

  // Allow access to the HeaderComponent
  // static: true allows this component to be (safely) used in the OnInit of its parent
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

    error: string = '';

    totalBytes = 0;

    subscription !: Subscription;

    error$ = new Subject<string>();

    getError$ = this.error$.asObservable();

  // stream
  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {   // best not to do it here in the component.
      this.error$.next(err.message );
      return of([]);
    })
  );

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) =>rooms.length)
  );

  // Making the service private keeps it from being accessed by the client in the template, for example.
  constructor(@SkipSelf() private roomsService: RoomsService,
    private configService: ConfigService) {

  }

  ngAfterViewInit(): void {
    this.headerComponent.title = 'Rooms View';
    this.headerChildrenComponent.last.title = 'Last TITLE';

  }

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Request success');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Request success');
          break;

        case HttpEventType.DownloadProgress:
          this.totalBytes += event.loaded;
          break;
        case HttpEventType.Response:
          console.log(event.body);
          break;
      }
    })


    this.stream.subscribe( {
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
  });
    this.stream.subscribe((data) => console.log(data));

    // this.subscription = this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // })


  }

  ngDoCheck() {
    console.log('ngDoCheck(): On Changes is called.');
  }

  ngAfterViewChecked(): void {

  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms Liste";
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber:'4',
      roomType: 'Deluxe Room',
      amenities: 'A/C, Free WiFi, TV, Kitchen',
      price: 500,
      photos: 'http://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };

    //this.roomList.push(room);
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber:'3',
      roomType: 'Deluxe Room',
      amenities: 'A/C, Free WiFi, TV, Kitchen',
      price: 500,
      photos: 'http://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
