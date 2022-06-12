import "../styles/globals.css";
import "../styles/reset.css";
import { MoralisProvider } from "react-moralis";
import { ElectionProvider } from "../context/ElectionContext";
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://hniajrg29hl0.usemoralis.com:2053/server"
      appId="XlCWN19XOAvAkGJdJahY9Nvud7YvxONtrMxyCvW9"
    >
      <ElectionProvider>
        <Component {...pageProps} />
      </ElectionProvider>
    </MoralisProvider>
  );
}

export default MyApp;

