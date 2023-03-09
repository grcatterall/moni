import { PrismaClient, Services } from '@prisma/client';
import { RepositoryInterface } from './RepositoryInterface';

export class ServiceRepository implements RepositoryInterface<Services> {
  protected prismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async insert(serviceName: string): Promise<Services | null> {
    const service = await this.prismaClient.services.create({
      data: {
        name: serviceName,
      },
    });

    return service;
  }

  public async getById(id: string): Promise<Services | null> {
    return await this.prismaClient.services.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async getByName(name: string): Promise<Services | null> {
    return await this.prismaClient.services.findUnique({
      where: {
        name: name,
      },
    });
  }

  public async getAll(): Promise<Services[]> {
    return await this.prismaClient.services.findMany();
  }
}
