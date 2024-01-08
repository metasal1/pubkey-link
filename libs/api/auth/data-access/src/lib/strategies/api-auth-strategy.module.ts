import { type DynamicModule, Module } from '@nestjs/common'

import { ApiAuthStrategyDiscordModule } from './oauth/api-auth-strategy-discord.module'
import { ApiAuthStrategyGithubModule } from './oauth/api-auth-strategy-github.module'
import { ApiAuthStrategyTwitterModule } from './oauth/api-auth-strategy-twitter.module'

@Module({})
export class ApiAuthStrategyModule {
  static register(): DynamicModule {
    return {
      module: ApiAuthStrategyModule,
      imports: [
        ApiAuthStrategyDiscordModule.register(),
        ApiAuthStrategyGithubModule.register(),
        ApiAuthStrategyTwitterModule.register(),
      ],
    }
  }
}
