import { useEffect, useState } from "preact/hooks";
import type { SimpleReverePay } from "@revere_payments/tokenizer";
interface ReverePayWrapperProps {
    merchantId: string;
    publicAPIKey: string;
}
declare global {
    interface Window {
        tokenizer: {
            SimpleReverePay: typeof SimpleReverePay;
        };
    }
}
export default function ReverePayWrapper(
    { merchantId, publicAPIKey }: ReverePayWrapperProps,
) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [reverePay, setReverePay] = useState<SimpleReverePay | null>(null);
    useEffect(() => {
        if (typeof window !== "undefined" && window.tokenizer.SimpleReverePay) {
            const initReverePay = new window.tokenizer.SimpleReverePay({
                merchantId,
                publicAPIKey,
                config: {
                    fields: {
                        cardHolderName: {
                            placeholder: "John Doex",
                        },
                        postalCode: {
                            value: "12345",
                        },
                    },
                    paymentMethods: ["card"],
                    sandbox: true,
                },
            });

            initReverePay.onSuccess = (data) => {
                console.log("SUCCESS!");
                console.log(data);
            };

            initReverePay.onError = (err) => {
                console.error("ERROR!");
                console.error(err);
            };

            setReverePay(initReverePay);
            setIsLoaded(true);
        }
    }, [merchantId, publicAPIKey]);

    const handleSubmit = () => {
        if (reverePay && typeof reverePay.submit === "function") {
            reverePay.submit();
        } else {
            console.error("Submit method not found on reverePay instance");
        }
    };

    return (
        <div>
            <div id="reverePayForm">
                {/* SimpleReverePay will render the form here */}
            </div>
            {isLoaded
                ? <button onClick={handleSubmit}>Submit Payment</button>
                : <div>Loading ReverePayment form...</div>}
        </div>
    );
}
