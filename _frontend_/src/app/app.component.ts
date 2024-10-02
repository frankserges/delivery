import { Component, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy{
  title = 'delivery';
  // private messageSubscription: Subscription;
  // messages: string[] = [];
  // newMessage: string = '';
  constructor(private socketService: SocketService) {
    // this.messageSubscription = this.socketService
    //   .on('status_changed')
    //   .subscribe((data) => {
    //     this.messages.push(data.text);
    //     console.log(data.text);
    //   });
  }
  // sendMessage() {
  //   this.socketService.emit('status_changed', { text: this.newMessage });
  //   this.newMessage = '';
  // }
  ngOnDestroy() {
    // this.messageSubscription.unsubscribe();
  }

}
