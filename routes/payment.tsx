import { Head } from "$fresh/runtime.ts";
import ReverePayWrapper from "../islands/ReverePayWrapper.tsx";

export default function PaymentPage() {
    return (
        <>
            <Head>
                <script src="https://cdn.jsdelivr.net/npm/@revere_payments/tokenizer@latest/dist/umd/main.js" />
            </Head>
            <div>
                <h1>Payment Page</h1>
                <ReverePayWrapper
                    merchantId="YourMerchantId"
                    publicAPIKey="yourPublicApiKey"
                />
            </div>
        </>
    );
}
