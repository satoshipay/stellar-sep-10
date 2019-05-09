import test from "ava"
import { Server } from "stellar-sdk"
import { fetchWebAuthEndpointURL } from "../src/index"

test("fetchWebAuthEndpointURL() can fetch the stellarport.io auth endpoint URL", async t => {
  const horizon = new Server("https://horizon.stellar.org/")
  const transferServerURL = await fetchWebAuthEndpointURL(
    horizon,
    "GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5"
  )

  t.is(transferServerURL, "https://api.stellarport.io/Authentication")
})
