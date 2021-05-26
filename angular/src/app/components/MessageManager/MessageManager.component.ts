import { Component, OnInit } from '@angular/core';
import { Message, MessageManagerService } from './MessageManager.service';

@Component({
  selector: 'message-manager',
  templateUrl: './MessageManager.component.html',
  styleUrls: ['./MessageManager.component.scss']
})
export class MessageManager implements OnInit {
  isShown: boolean = false;
  messages: Message[] = [];

  constructor(public messageManager: MessageManagerService) { }

  ngOnInit() {
    this.messageManager.messageEmitter.subscribe(
      () => {
        this.messages = this.messageManager.getMessages();

        this.isShown = true;
    
        setTimeout(() => {
            this.isShown = false
        }, 5000);
      }
    );
  }
}
