import '@/styles/globals.css';
import { useState } from 'react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/react/utils';
import type { AppProps } from 'next/app';
import { queryClientAtom } from 'jotai-tanstack-query';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';


export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  useHydrateAtoms(new Map([[queryClientAtom, queryClient]]));

  return (
    <QueryClientProvider client={ queryClient }>
      <Hydrate state={ pageProps.dehydratedState }>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
