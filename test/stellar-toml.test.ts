import test from "ava"
import { Server } from "stellar-sdk"
import { fetchWebAuthData } from "../src/index"

test("fetchWebAuthData() can fetch the stellarport.io auth endpoint URL", async t => {
  const horizon = new Server("https://horizon.stellar.org/")
  const webauth = await fetchWebAuthData(
    horizon,
    "GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5"
  )

  if (!webauth) {
    return t.fail("Could not fetch all web auth data.")
  }

  t.is(webauth.endpointURL, "https://api.stellarport.io/Authentication")
  t.is(
    webauth.signingKey,
    "GABWHTAVRYF2MCNDR5YC5SC3JTZQBGDZ3HKI4QAREV5533VU43W4HJUX"
  )
})
