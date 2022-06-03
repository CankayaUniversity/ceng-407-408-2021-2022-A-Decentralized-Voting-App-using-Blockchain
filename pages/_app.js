import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { ElectionProvider } from "../context/ElectionContext";
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://prgvn0sn9kgr.usemoralis.com:2053/server"
      appId="1P3E2CSZFwYWTV73gyJfunADxKZQ2srNl3Q10yEM"
    >
      <ElectionProvider>
        <Component {...pageProps} />
      </ElectionProvider>
    </MoralisProvider>
  );
}

export default MyApp;

