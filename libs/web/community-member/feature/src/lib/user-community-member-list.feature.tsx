import { Group } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useUserFindManyCommunityMember } from '@pubkey-link/web-community-member-data-access'
import { UserCommunityMemberUiTable } from '@pubkey-link/web-community-member-ui'
import { UiSearchField } from '@pubkey-link/web-ui-core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserCommunityMemberListFeature({ community }: { community: Community }) {
  const { deleteCommunityMember, items, pagination, query, setSearch } = useUserFindManyCommunityMember({
    communityId: community.id,
    limit: 12,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search member" setSearch={setSearch} />
        <UiDebugModal data={items} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserCommunityMemberUiTable
          deleteCommunityMember={(communityMember) => {
            if (!window.confirm('Are you sure?')) return
            return deleteCommunityMember(communityMember.id)
          }}
          communityMembers={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        // <CommunityMemberUiGrid
        //   communityMembers={items}
        //   page={pagination.page}
        //   totalRecords={pagination.total}
        //   onPageChange={pagination.setPage}
        //   limit={pagination.limit}
        //   setLimit={pagination.setLimit}
        //   setPage={pagination.setPage}
        // />
        <UiInfo message="No members found." />
      )}
    </UiStack>
  )
}
