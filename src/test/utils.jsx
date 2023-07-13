import { QueryClient, QueryClientProvider } from 'react-query';
import * as TestingLibrary from '@testing-library/react';

afterEach(() => {
    TestingLibrary.cleanup();
});

const defaultQueryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity, retry: false } },
});

/**
 * @param {React.ReactElement} callback
 * @param {TestingLibrary.RenderOptions<any>} [options]
 * @returns {TestingLibrary.RenderResult<any> & { queryClient: QueryClient }}
 */
const customRender = (
    ui,
    { queryClient = defaultQueryClient, ...options } = {},
) => ({
    ...TestingLibrary.render(ui, {
        ...options,
        wrapper: ({ children }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        ),
    }),
    queryClient,
});

/**
 * @template T,R
 * @param {(props: T) => R} callback
 * @param {TestingLibrary.RenderHookOptions<R>} [options]
 * @returns {TestingLibrary.RenderHookResult<R> & { queryClient: QueryClient }}
 */
const customRenderHook = (
    callback,
    { queryClient = defaultQueryClient, ...options } = {},
) => ({
    ...TestingLibrary.renderHook(callback, {
        ...options,
        wrapper: ({ children }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        ),
    }),
    queryClient,
});

export * from '@testing-library/react';
export {
    customRender as render,
    customRenderHook as renderHook,
    defaultQueryClient,
};
