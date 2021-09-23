import "../styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";

import type { AppProps /*, AppContext */ } from "next/app";

import Layout from "@containers/layout";
import store from "@redux/store";
import { defaultQueryFn } from "config/query-config";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: defaultQueryFn,
        },
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Provider>
    );
}

export default MyApp;
