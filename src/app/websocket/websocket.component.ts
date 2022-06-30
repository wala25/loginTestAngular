import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements OnInit, OnDestroy {

  constructor() { 
    
  }
  wsAdress=environment.apiAdressWS;
wss= webSocket({url: this.wsAdress});



m=new FormControl('');
sendMessage(){
this.wss.next(this.m.value)
this.m.reset()

}
 arr=new Array<string>();

  ngOnInit(): void {
    this.wss.subscribe({
      next:(m:any)=>{this.arr.push(m.message);console.log(m)}
      ,
      error:(e:any)=>{console.log(e)}
    }
      );
    
  }
  ngOnDestroy(): void {
    this.wss.unsubscribe()
  }

}
