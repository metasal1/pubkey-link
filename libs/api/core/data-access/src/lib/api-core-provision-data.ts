import { faker } from '@faker-js/faker'
import {
  CommunityRole,
  IdentityProvider,
  NetworkCluster,
  Prisma,
  RuleConditionType,
  UserRole,
  UserStatus,
} from '@prisma/client'

export const provisionCommunities: Prisma.CommunityCreateInput[] = [
  {
    cluster: NetworkCluster.SolanaMainnet,
    name: 'PubKey',
    description: 'Decentralized identities on Solana',
    avatarUrl: 'https://avatars.githubusercontent.com/u/125477168?v=4',
    members: {
      create: [
        { user: { connect: { id: 'beeman' } }, role: CommunityRole.Admin },
        { user: { connect: { id: 'alice' } }, role: CommunityRole.Member },
      ],
    },
    rules: {
      create: [{ name: 'Mad Lads' }, { name: 'Mc Degens DAO' }, { name: 'The Faceless' }],
    },
  },
  {
    cluster: NetworkCluster.SolanaMainnet,
    name: "Dean's List DAO",
    description: 'A DAO turned Network State',
    avatarUrl: 'https://avatars.githubusercontent.com/u/137821488?v=4',
    rules: {
      create: [
        {
          name: 'One of Us',
          conditions: {
            create: [
              {
                type: RuleConditionType.SolanaNftAssets,
                name: 'Deanslist NFT holder',
                account: '5FusHaKEKjfKsmQwXNrhFcFABGGxu7iYCdbvyVSRe3Ri',
                amount: '1',
              },
              {
                type: RuleConditionType.AnybodiesNftAssets,
                name: 'Deanslist NFT staked in Anybodies Vault',
                account: 'JiZUwqz0ETakNYOIulut',
                amount: '1',
              },
            ],
          },
        },
        {
          name: 'Business Visa',
          conditions: {
            create: [
              {
                type: RuleConditionType.SolanaNftAssets,
                name: 'Business Visa NFT holder',
                account: '9HdPsLjMBUW8fQTp314kg4LoiqGxQqvCxKk6uhHttjVp',
                amount: '1',
                filters: { status: 'active' },
              },
            ],
          },
        },
        {
          name: 'Business Visa (Expired)',
          conditions: {
            create: [
              {
                type: RuleConditionType.SolanaNftAssets,
                name: 'Business Visa NFT holder (Expired)',
                account: '9HdPsLjMBUW8fQTp314kg4LoiqGxQqvCxKk6uhHttjVp',
                amount: '1',
                filters: { status: 'expired' },
              },
            ],
          },
        },
        {
          name: 'DEAN Holder',
          conditions: {
            create: [
              {
                type: RuleConditionType.SolanaTokenAmount,
                name: '$DEAN token holder',
                account: 'Ds52CDgqdWbTWsua1hgT3AuSSy4FNx2Ezge1br3jQ14a',
                amount: '1000',
              },
            ],
          },
        },
      ],
    },
    members: {
      create: [
        { user: { connect: { id: 'beeman' } }, role: CommunityRole.Admin },
        { user: { connect: { id: 'alice' } }, role: CommunityRole.Admin },
        { user: { connect: { id: 'bob' } }, role: CommunityRole.Member },
      ],
    },
  },
  {
    cluster: NetworkCluster.SolanaMainnet,
    name: 'Marinade',
    description: 'A DAO with a staking protocol built on Solana',
    avatarUrl: 'https://avatars.githubusercontent.com/u/81361338?v=4',
    members: {
      create: [
        { user: { connect: { id: 'beeman' } }, role: CommunityRole.Admin },
        { user: { connect: { id: 'bob' } }, role: CommunityRole.Member },
      ],
    },
    rules: {
      create: [{ name: 'MNDE Holders' }, { name: 'MNDE Holders (Shark)' }, { name: 'MNDE Holders (Whale)' }],
    },
  },
]
export const provisionUsers: Prisma.UserCreateInput[] = [
  {
    id: 'beeman',
    username: 'beeman',
    avatarUrl: 'https://avatars.githubusercontent.com/u/36491?v=4',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [
        //
        { provider: IdentityProvider.GitHub, providerId: '36491' },
        ...[
          '3XN71ShwyPNYZ22fV4phQCnyPj6E6EbMLAD5ReLRvdRP',
          '9VyTdXMBXXPaEcCXjhCqicLF975Ji2zz4SwMSvCYe9ks',
          'BeEMuaaQCQPodQdaA7W6Rmsu7761vCabN4Tth6jA4VCP',
          'BumrJWH5kf4MXZ5bEg7VyZY6oXAMr78jXC1mFiDAE3u3',
          'CdrFwyi78fjEN3WFUc72KUxewFdxv1SUSaKAMVkPHQyd',
          'Dd1JSwojUsptwFa97A3WRZU1SijCWYo9Qa3xLxT8yzb7',
        ].map((providerId) => ({ provider: IdentityProvider.Solana, providerId, verified: true })),
      ],
    },
  },
  {
    username: 'alice',
    password: 'password',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [{ provider: IdentityProvider.Solana, providerId: 'ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG' }],
    },
  },
  {
    username: 'bob',
    password: 'password',
    role: UserRole.User,
  },
  // Charlie is a user with no password, so they can only log in with an external provider
  {
    username: 'charlie',
    role: UserRole.User,
  },
  // Dave is set to inactive, so they can't log in
  {
    username: 'dave',
    password: 'password',
    role: UserRole.User,
    status: UserStatus.Inactive,
  },
]

export function fakeUsers(count: number): Prisma.UserCreateInput[] {
  return Array.from({ length: count }, (_, index) => fakeUser(index))
}

export function fakeUser(index: number): Prisma.UserCreateInput {
  faker.seed(index)
  const username = faker.internet.userName()
  const password = faker.internet.password()
  const avatarUrl = faker.internet.avatar()
  const name = faker.internet.displayName()

  return {
    avatarUrl,
    name,
    password,
    role: UserRole.User,
    status: UserStatus.Active,
    username,
  }
}
