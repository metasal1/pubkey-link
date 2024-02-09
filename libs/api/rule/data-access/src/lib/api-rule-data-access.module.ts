import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api-network-data-access'
import { ApiAdminRuleService } from './api-admin-rule.service'
import { ApiRuleResolverService } from './api-rule-resolver.service'
import { ApiRuleService } from './api-rule.service'
import { ApiUserRuleService } from './api-user-rule.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiNetworkDataAccessModule],
  providers: [ApiRuleService, ApiAdminRuleService, ApiRuleResolverService, ApiUserRuleService],
  exports: [ApiRuleService],
})
export class ApiRuleDataAccessModule {}
