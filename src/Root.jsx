import { QueryClientProvider } from 'react-query';
import App from './App';

import queryClient from './client';

export default function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <main className="flex flex-col h-screen w-full">
                <div className=" flex flex-grow px-4 py-6">
                    <section className="w-full md:max-w-screen-md m-auto rounded-md px-5 py-6 border border-gray-200">
                        <App />
                    </section>
                </div>
                <footer
                    role="contentinfo"
                    className="bg-gray-100 text-gray-800 p-4"
                    aria-aria-label="Configuration Info"
                >
                    <p className="text-sm text-gray-500">
                        Copyright &copy; {new Date().getFullYear()}
                    </p>
                </footer>
            </main>
        </QueryClientProvider>
    );
}
