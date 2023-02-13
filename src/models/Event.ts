import { EventInterface } from './EventInterface';
import { EventType } from '../type/EventType';

export class Event implements EventInterface {
  public name: string;
  public time: Date;
  public status: string;
  public message?: string;
  public service: string;
  public id: number;

  constructor(name: string, time: Date, status: string, service: string, message?: string) {
    this.id = Math.floor(Math.random() * (9999999 - 1000000) + 1000000);
    this.name = name;
    this.time = time;
    this.status = status;
    this.message = message;
    this.service = service;
  }

  toJson(): EventType | null {
    if (this.status === '200') {
      return {
        id: this.id,
        name: this.name,
        service: this.service,
        time: this.time,
        status: this.status,
        message: this.message,
      };
    }

    throw('Status error');
  }
}
