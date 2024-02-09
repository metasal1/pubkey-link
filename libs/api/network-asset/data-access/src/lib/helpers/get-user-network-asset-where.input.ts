import { Prisma } from '@prisma/client'
import { UserFindManyNetworkAssetInput } from '../dto/user-find-many-network-asset.input'

export function getUserNetworkAssetWhereInput(
  identities: string[] = [],
  input: UserFindManyNetworkAssetInput,
): Prisma.NetworkAssetWhereInput {
  const where: Prisma.NetworkAssetWhereInput = {
    cluster: input.cluster,
    type: input.type ? input.type : undefined,
    owner: { in: identities },
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { group: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
