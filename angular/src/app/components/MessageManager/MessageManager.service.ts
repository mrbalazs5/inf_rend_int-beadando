import { EventEmitter, Injectable } from '@angular/core';

export type Message = {
  type: "success" | "error";
  text: string;
  isShown?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MessageManagerService {
  private messages: Message[];
  messageEmitter: EventEmitter<Message[]> = new EventEmitter();

  setMessages(messages: Message[]) {
    this.messages = messages;
    this.messageEmitter.emit(this.messages);
  }

  getMessages() {
    return this.messages;
  }
}
