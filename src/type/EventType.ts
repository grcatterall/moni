export class EventType {
  public name: string;
  public time: Date;
  public status: string;
  public message?: string;
  public service: string;
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id: number, name: string, time: Date, status: string, service: string, message?: string) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.status = status;
    this.message = message;
    this.service = service;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
