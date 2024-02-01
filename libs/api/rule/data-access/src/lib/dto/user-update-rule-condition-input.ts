import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { GraphQLJSON } from 'graphql-scalars'

@InputType()
export class UserUpdateRuleConditionInput {
  @Field({ nullable: true })
  tokenId?: string | null
  @Field({ nullable: true })
  account?: string | null
  @Field({ nullable: true })
  amount?: string | null
  @Field(() => GraphQLJSON, { nullable: true })
  config?: Prisma.InputJsonValue | null
  @Field(() => GraphQLJSON, { nullable: true })
  filters?: Prisma.InputJsonValue | null
}