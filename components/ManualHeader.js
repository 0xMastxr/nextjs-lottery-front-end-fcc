import { useMoralis } from "react-moralis"
import { useEffect } from "react" //We are going to use it so when you reload the page, it won't disconnect the wallet.

// Hard way to create the Header
export default function ManualHeader() {
    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3 } =
        useMoralis()

    useEffect(() => {
        if (isWeb3Enabled) return //So, if isWeb3Enabled, it doesn't do anything on reload, unless isWeb3Enabled (on the array) changes.
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                //It checks to not be flashing the metamask everytime you refresh
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changet to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])
    // empty array, run once (when it render)
    // dependency array, run when the stuff in it changes

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected") //Metamask won't flash up every time we reload the page when you are disconected and you have been connected before
                        }
                    }}
                    disable={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
