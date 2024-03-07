import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Prisma } from '@prisma/client'
import { ApiCoreService, slugifyId } from '@pubkey-link/api-core-data-access'
import { provisionCommunities } from './api-community-provision-data'

@Injectable()
export class ApiCommunityProvisionService {
  private readonly logger = new Logger(ApiCommunityProvisionService.name)

  constructor(private readonly core: ApiCoreService) {}

  @OnEvent('network.provisioned')
  async onApplicationStarted() {
    if (this.core.config.databaseProvision) {
      await this.provisionCommunities()
      this.logger.verbose(`Provisioned communities`)
    }
  }

  private async provisionCommunities() {
    await Promise.all(provisionCommunities.map((community) => this.provisionCommunity(community)))
  }

  private async provisionCommunity(input: Prisma.CommunityCreateInput) {
    const found = await this.core.getCommunityById(slugifyId(input.name).toLowerCase())
    if (!found) {
      await this.core.createCommunity({ input }).then((community) => {
        this.core.logInfo(`Provisioned Community ${input.name}`, { communityId: community.id })
      })
      return
    }
  }
}
