import { Field, ObjectType } from '@nestjs/graphql'
import { IdentityProvider } from '@pubkey-link/api-core-data-access'

@ObjectType()
export class IdentityChallenge {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date

  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
  @Field()
  challenge!: string
  @Field({ nullable: true })
  signature?: string
  @Field()
  ip!: string
  @Field()
  userAgent!: string
  @Field()
  verified!: boolean
}
