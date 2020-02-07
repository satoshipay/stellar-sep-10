import { Server, StellarTomlResolver } from "stellar-sdk"
import { debug } from "./logger"

export interface WebauthData {
  domain: string
  endpointURL: string
  signingKey: string | null
}

interface StellarTomlData {
  [key: string]: any
}

export function getServiceSigningKey(
  stellarTomlData: StellarTomlData
): string | null {
  return stellarTomlData.SIGNING_KEY || null
}

export function getWebAuthEndpointURL(
  stellarTomlData: StellarTomlData
): string | null {
  return stellarTomlData.WEB_AUTH_ENDPOINT || null
}

export async function fetchWebAuthData(
  horizon: Server,
  issuerAccountID: string
): Promise<WebauthData | null> {
  const account = await horizon.loadAccount(issuerAccountID)
  const domain = (account as any).home_domain

  if (!domain) {
    debug(
      `Web auth endpoint cannot be located. Issuing account has no home_domain: ${issuerAccountID}`
    )
    return null
  }

  const stellarTomlData = await StellarTomlResolver.resolve(domain)
  const endpointURL = getWebAuthEndpointURL(stellarTomlData)
  const signingKey = getServiceSigningKey(stellarTomlData)

  if (!endpointURL || !signingKey) {
    return null
  }

  return {
    domain,
    endpointURL,
    signingKey
  }
}
