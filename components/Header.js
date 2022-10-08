import { ConnectButton } from "web3uikit"

//EASY WAY TO CREATE THE HEADER just 1 command xD
export default function Header() {
    return (
        <div className="border-b-2">
            <h1 className="py-4 px-4 font-blog text-3xl">Decentralized Lottery</h1>
            <div className="ml-auto py-2 px-4"></div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
