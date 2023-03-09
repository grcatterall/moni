import { ModelInterface } from './ModelInterface';
import { EventType } from '../type/EventType';

export class Event implements ModelInterface {
  public name: string;
  public time: Date;
  public status: string;
  public message?: string;
  public service: string;
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(name: string, time: Date, status: string, service: string, message?: string, createdAt?: Date) {
    this.id = Math.floor(Math.random() * (9999999 - 1000000) + 1000000);
    this.name = name;
    this.time = time;
    this.status = status;
    this.message = message;
    this.service = service;
    this.createdAt = createdAt ? createdAt : new Date();
    this.updatedAt = new Date('dd-MM-yy hh:mm:ss');
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
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
    }

    throw 'Status error';
  }
}
