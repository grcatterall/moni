import { PrismaClient, Events } from '@prisma/client';
import { Event } from '../models/Event';
import { RepositoryInterface } from './RepositoryInterface';

export class EventRepository implements RepositoryInterface<Events> {
    protected prismaClient;
  
    constructor(prismaClient: PrismaClient) {
      this.prismaClient = prismaClient;
    }

    public async insert(event: Event): Promise<Events | null> {
        const prismaEvent = await this.prismaClient.events.create({
          data: {
            id: event.id,
            name: event.name,
            message: event.message || '',
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
            service: {
                connect: {
                    id: event.service
                }
            }
          },
        });
    
        return prismaEvent;
    }
}