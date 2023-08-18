import { EventRepository } from "../repositories";
import { Event } from "../models/Event";
import { PrismaClient } from '@prisma/client';

export class EventIngestHandler {
    public async handleEvent(eventBody: any): Promise<Event | null> {
        if (!eventBody) {
            throw new Error("Body data passed invalid");
        }
        const prismaClient = new PrismaClient();

        const event = new Event(eventBody.name, eventBody.time, eventBody.status, eventBody.service, eventBody.message);
    
        const eventRepository = new EventRepository(prismaClient);
        await eventRepository.insert(event);

        return event;
    }
}