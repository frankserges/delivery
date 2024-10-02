import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { BASE_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  constructor() {
    this.socket = io(`${BASE_URL}`);
  }
  emit(event: string, data: any) {
    // console.log(event, data);
    this.socket.emit(event, data);
  }
  on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });

      // Handle cleanup
      return () => {
        this.socket.off(event);
      };
    });
  }
}
