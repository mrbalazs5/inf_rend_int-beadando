import { Component, OnInit } from '@angular/core';
import { Message, MessageManagerService } from './MessageManager.service';

@Component({
  selector: 'message-manager',
  templateUrl: './MessageManager.component.html',
  styleUrls: ['./MessageManager.component.scss']
})
export class MessageManager implements OnInit {
  messages: Message[] = [];

  constructor(public messageManager: MessageManagerService) { }

  ngOnInit() {
    this.messageManager.messageEmitter.subscribe(
      async () => {
        this.messages = this.messageManager.getMessages();

        await Promise.all(this.messages.map(async message => {
          message.isShown = true;

          setTimeout(() => {
            message.isShown = false
          }, 5000);
        }));
      }
    );
  }
}
