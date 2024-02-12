import { Role, UserCreateRoleInput, UserFindManyRoleInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyRole(props: Partial<UserFindManyRoleInput> & { communityId: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyRoleInput = { page, limit, search, communityId: props.communityId }
  const query = useQuery({
    queryKey: ['user', 'find-many-role', input],
    queryFn: () => sdk.userFindManyRole({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items: Role[] = query.data?.paging.data ?? []

  return {
    items,
    query,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
    createRole: (input: UserCreateRoleInput) =>
      sdk
        .userCreateRole({ input: { ...input, communityId: props.communityId } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Role created`)
          } else {
            toastError(`Role not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteRole: (roleId: string) =>
      sdk.userDeleteRole({ roleId }).then(() => {
        toastSuccess('Role deleted')
        return query.refetch()
      }),
  }
}
