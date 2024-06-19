import PrimaryButton from "@/components/Button";
import { useWeb3 } from "@/context/useWeb3";
import { useEffect, useState } from "react";

export default function Home() {
    const {
        address,
        getUserAddress,
        sendCUSD
    } = useWeb3();
    const [signingLoading, setSigningLoading] = useState(false);
    const [tx, setTx] = useState<any>(undefined);
    const [recipient, setRecipient] = useState<string>("");
    const [amount, setAmount] = useState<string>("");


    useEffect(() => {
        getUserAddress().then(async () => {
           
         
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    async function sendingCUSD() {
        if (recipient && amount) {
            setSigningLoading(true);
            try {
                const tx = await sendCUSD(recipient, amount);
                console.log(tx);
                setTx(tx);
            } catch (error) {
                console.log(error);
            } finally {
                setSigningLoading(false);
            }
        }
    }

    


    return (
        <div className="">
            <div className="h1">
              Mbalis cUSD Wallet
            </div>
            {address && (
                <>
                    <div className="">
                        Your Address:{" "}
                        <span className="">{address}</span>
                    </div>
                   
                    {tx && (
                        <p className="">
                            Tx Completed:{" "}
                            {(tx.transactionHash as string).substring(0, 6)}
                            ...
                            {(tx.transactionHash as string).substring(
                                tx.transactionHash.length - 6,
                                tx.transactionHash.length
                            )}
                        </p>
                    )}
                    <div className="">
                        <input
                            type="text"
                            placeholder="Recipient Address"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className=""
                        />
                        <input
                            type="text"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className=""
                        />
                        <PrimaryButton
                            loading={signingLoading}
                            onClick={sendingCUSD}
                            title="Send cUSD"
                        />
                    </div>
                   


                </>
            )}
        </div>
    );
}


