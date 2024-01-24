import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { NetworkToken } from '@pubkey-link/sdk'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { NetworkTokenUiItem } from './network-token-ui-item'
import { NetworkTokenUiProgram } from './network-token-ui-program'

export function AdminNetworkTokenUiTable({
  deleteNetworkToken,
  networkTokens = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteNetworkToken: (networkToken: NetworkToken) => void
  networkTokens: NetworkToken[]
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        onPageChange={onPageChange}
        page={page ?? 1}
        recordsPerPage={recordsPerPage ?? 10}
        totalRecords={totalRecords ?? 1}
        columns={[
          {
            accessor: 'name',
            render: (item) => <NetworkTokenUiItem networkToken={item} to={`./${item.id}`} />,
          },
          { accessor: 'type' },
          {
            accessor: 'program',
            render: (item) => (item.program ? <NetworkTokenUiProgram program={item.program} /> : null),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteNetworkToken(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={networkTokens}
      />
    </ScrollArea>
  )
}