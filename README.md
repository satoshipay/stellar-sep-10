# @satoshipay/stellar-sep-10

[Stellar Ecosystem Proposal 10 - "Stellar Web Authentication"](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md) client SDK, allowing Stellar wallets to authenticate for a web service using an account's private key.

**Note: This package is still considered experimental. Breaking changes should be expected.**

## Installation

```
npm install @satoshipay/stellar-sep-10
# or with yarn:
yarn add @satoshipay/stellar-sep-10
```

## Usage

### Digest remote stellar.toml information

```ts
// Look up the stellar.toml for an issuing account, parse it, return data
import { Server } from "stellar-sdk"
import { fetchWebAuthData } from "@satoshipay/stellar-sep-10"

const horizon = new Server("https://stellar-horizon.satoshipay.io/")
const issuingAccountID =
  "GABWHTAVRYF2MCNDR5YC5SC3JTZQBGDZ3HKI4QAREV5533VU43W4HJUX"

const webauth = fetchWebAuthData(horizon, issuingAccountID)
// typeof webauth = { endpointURL: string, signingKey: string } | undefined
```

Alternatively, if you already fetched and parsed the stellar.toml file:

```ts
import {
  getServiceSigningKey,
  getWebAuthEndpointURL
} from "@satoshipay/stellar-sep-10"

const stellarToml = {
  // Parsed stellar.toml content fetched from remote...
}

const endpointURL = getWebAuthEndpointURL(stellarToml)
const signingKey = getServiceSigningKey(stellarToml)
```

## License

GPL v3
