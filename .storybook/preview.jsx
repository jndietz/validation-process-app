import { QueryClient, QueryClientProvider } from 'react-query';
import { mswLoader, initialize } from 'msw-storybook-addon';

import '../src/index.css';
import { handlers } from '../src/msw/handlers';

// Initialize MSW
initialize();

/** @type { import('@storybook/react').Preview } */
const preview = {
    decorators: [
        (
            Story,
            {
                parameters: {
                    queryClient = new QueryClient({
                        defaultOptions: {
                            queries: { staleTime: Infinity, retry: false },
                        },
                    }),
                },
            },
        ) => (
            <QueryClientProvider client={queryClient}>
                <Story />
            </QueryClientProvider>
        ),
    ],
    loaders: [mswLoader],
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        msw: {
            handlers: handlers,
        },
    },
};

export default preview;
