import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';

if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./msw/browser');
    worker.start();
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
);
