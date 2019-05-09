import { Server, StellarTomlResolver } from "stellar-sdk"
import { debug } from "./logger"

interface StellarTomlData {
  [key: string]: any
}

export function getWebAuthEndpointURL(
  stellarTomlData: StellarTomlData
): string | null {
  return stellarTomlData.WEB_AUTH_ENDPOINT || null
}

export async function fetchWebAuthEndpointURL(
  horizon: Server,
  issuerAccountID: string
): Promise<string | null> {
  const account = await horizon.loadAccount(issuerAccountID)
  const domainName = (account as any).home_domain

  if (!domainName) {
    debug(
      `Web auth endpoint cannot be located. Issuing account has no home_domain: ${issuerAccountID}`
    )
    return null
  }

  const stellarTomlData = await StellarTomlResolver.resolve(domainName)
  return getWebAuthEndpointURL(stellarTomlData)
}
