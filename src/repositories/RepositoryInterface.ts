export interface RepositoryInterface<DomainEntity> {
  insert(serviceName: string): Promise<DomainEntity | null>;
}
