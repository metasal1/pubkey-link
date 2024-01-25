import { Community } from '@pubkey-link/sdk'
import { useRoutes } from 'react-router-dom'
import { UserCommunityMemberCreateFeature } from './user-community-member-create.feature'
import { UserCommunityMemberDetailFeature } from './user-community-member-detail.feature'
import { UserCommunityMemberListFeature } from './user-community-member-list.feature'

export default function UserCommunityMemberRoutes({ community }: { community: Community }) {
  return useRoutes([
    { path: '', element: <UserCommunityMemberListFeature community={community} /> },
    {
      path: 'create',
      element: <UserCommunityMemberCreateFeature community={community} />,
    },
    { path: ':communityMemberId/*', element: <UserCommunityMemberDetailFeature /> },
  ])
}
