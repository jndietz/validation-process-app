import { QueryClientProvider } from 'react-query';
import App from './App';

import queryClient from './client';

export default function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
}
