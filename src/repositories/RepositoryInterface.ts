export interface RepositoryInterface<DomainEntity> {
  insert(object: any): Promise<DomainEntity | null>;
}
