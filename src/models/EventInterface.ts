import { EventType } from '../type/EventType';

export interface EventInterface {
  name: string;
  time: Date;
  status: string;
  message?: string;
  service: string;
  id: number;

  toJson(): EventType | null;
}
