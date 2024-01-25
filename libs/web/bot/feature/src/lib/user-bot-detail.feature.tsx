import { Button, Group, Paper } from '@mantine/core'
import { Community, UserCreateBotInput } from '@pubkey-link/sdk'
import { useUserFindOneBot } from '@pubkey-link/web-bot-data-access'
import { BotUiItem, UserBotUiCreateForm } from '@pubkey-link/web-bot-ui'
import {
  toastError,
  UiCard,
  UiCardTitle,
  UiDebug,
  UiError,
  UiGroup,
  UiLoader,
  UiStack,
  UiTabRoutes,
  UiWarning,
} from '@pubkey-ui/core'
import { UserBotCommands } from './user-bot-commands'
import { UserBotDetailPermissionsTab } from './user-bot-detail-permissions.tab'
import { UserBotDetailServerList } from './user-bot-detail-server-list'
import { UserBotDetailSettingsTab } from './user-bot-detail-settings.tab'

export function UserBotDetailFeature({ community }: { community: Community }) {
  const { item, query, deleteBot, createBot } = useUserFindOneBot({ communityId: community.id })

  async function submit(input: UserCreateBotInput) {
    return createBot(input)
      .then((res) => {})
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!item) {
    return (
      <UiStack>
        <UiCardTitle>Create Discord Bot</UiCardTitle>
        <UiCard>
          <UserBotUiCreateForm submit={submit} />
        </UiCard>
      </UiStack>
    )
  }

  return (
    <UiStack>
      <Paper withBorder p="md" radius="sm">
        <UiGroup>
          <BotUiItem bot={item} />
          <Group>
            <UserBotCommands bot={item} />
          </Group>
        </UiGroup>
      </Paper>
      {item.started ? (
        <UiTabRoutes
          tabs={[
            {
              path: 'permissions',
              label: 'Permissions',
              element: <UserBotDetailPermissionsTab bot={item} />,
            },
            {
              path: 'servers',
              label: 'Servers',
              element: <UserBotDetailServerList bot={item} />,
            },
            {
              path: 'settings',
              label: 'Settings',
              element: (
                <UiStack>
                  <UserBotDetailSettingsTab bot={item} />
                  <UiError
                    variant="outline"
                    title="Danger zone"
                    message={
                      <UiStack align="end">
                        <Button
                          variant="outline"
                          color="red"
                          onClick={() => {
                            deleteBot(item.id)
                          }}
                        >
                          Delete Bot
                        </Button>
                      </UiStack>
                    }
                  />
                  <UiDebug data={item} />
                </UiStack>
              ),
            },
          ]}
        />
      ) : (
        <UiWarning message="Bot not started." />
      )}
    </UiStack>
  )
}
