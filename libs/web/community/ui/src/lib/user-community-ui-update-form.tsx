import { Button, Group } from '@mantine/core'
import { Community, UserUpdateCommunityInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserCommunityUiUpdateForm({
  submit,
  community,
}: {
  submit: (res: UserUpdateCommunityInput) => Promise<boolean>
  community: Community
}) {
  const model: UserUpdateCommunityInput = {
    avatarUrl: community.avatarUrl ?? '',
    description: community.description ?? '',
    discordUrl: community.discordUrl ?? '',
    githubUrl: community.githubUrl ?? '',
    name: community.name ?? '',
    telegramUrl: community.telegramUrl ?? '',
    twitterUrl: community.twitterUrl ?? '',
    websiteUrl: community.websiteUrl ?? '',
  }

  const fields: UiFormField<UserUpdateCommunityInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('description', { label: 'Description' }),
    formFieldText('avatarUrl', { label: 'Avatar Url' }),
    formFieldText('websiteUrl', { label: 'Website Url' }),
    formFieldText('discordUrl', { label: 'Discord Url' }),
    formFieldText('githubUrl', { label: 'Github Url' }),
    formFieldText('twitterUrl', { label: 'Twitter Url' }),
    formFieldText('telegramUrl', { label: 'Telegram Url' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
