import { Community, Rule } from '@pubkey-link/sdk'
import { UserRuleConditionCreateFeature } from './user-rule-condition-create.feature'
import { UserRuleConditionListFeature } from './user-rule-condition-list.feature'

export function UserRuleDetailConditionsTab({ community, rule }: { community: Community; rule: Rule }) {
  return rule.conditions?.length ? (
    <UserRuleConditionListFeature conditions={rule.conditions ?? []} />
  ) : (
    <UserRuleConditionCreateFeature community={community} />
  )
}
