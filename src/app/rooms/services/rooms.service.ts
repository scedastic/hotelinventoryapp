import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { environment } from 'src/environments/environment';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  roomList : RoomList[] =  [];
  // header = new HttpHeaders({'token': '12345asdg'});
  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
    shareReplay(1),  // Replay the last call - used to cache the results in order to avoid multiple calls.

  );

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient) {
    console.log(environment.apiEndpoint);
    console.log("Rooms Service initialized...");
  }

  getRooms() {

    // config already has localhost:3000
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  delete(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`, {
      reportProgress: true,

    });
    return this.http.request(request);
  }
}
