
import { getStore } from "./storeService";

export const searchCryptoName = async function(name: string) {
    const store = getStore();
    store.set("cryptoNameFound", false)
    store.set("cryptoNameAddress", "")
    const url = `https://${name}.elastos.name/ela.address`
    const fetchCryptoName = await fetch(url, { method: "GET", headers: { 'content-type': 'application/json' } })
    const response = (await fetchCryptoName.text())
    store.set("cryptoNameAddress", response)
    store.set("withdrawalAddress", response)
    store.set("cryptoNameFound", true)
}