import { UserUpdateRuleInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneRule({ ruleId }: { ruleId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-rule', ruleId],
    queryFn: () => sdk.userFindOneRule({ ruleId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateRule: async (input: UserUpdateRuleInput) =>
      sdk
        .userUpdateRule({ ruleId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Rule updated')
            await query.refetch()
            return true
          }
          toastError('Rule not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}