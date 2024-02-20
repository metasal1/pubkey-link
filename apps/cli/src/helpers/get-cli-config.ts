import { getKeypairFromFile } from '@solana-developers/helpers'
import fs from 'fs'
import { getGraphQLSdk, Sdk } from '@pubkey-link/sdk'
import { PubKeyServer } from '../types/pubkey-server'

const home = process.env.HOME || process.env.USERPROFILE
const config = `${home}/.config/pubkey-link`

export async function getCliConfig(server: string) {
  const idJson = `${config}/id.json`
  const keypair = await getKeypairFromFile(idJson)

  if (!keypair) {
    // TODO: Add instructions on how to create a keypair
    throw new Error(`Keypair not found in ${idJson}`)
  }

  const serversJson = `${config}/servers.json`
  const servers = JSON.parse(fs.readFileSync(serversJson, 'utf8')) as PubKeyServer[]

  if (!servers.length) {
    // TODO: Add command to add a server and list instructions on how to do so
    throw new Error(`No servers found in ${serversJson}`)
  }

  const found = servers.find((s) => s.id === server)
  if (!found) {
    throw new Error(`Server not found: ${server}`)
  }

  const sdk: Sdk = getGraphQLSdk(`${found.endpoint}/graphql`)

  return {
    keypair,
    sdk,
  }
}
