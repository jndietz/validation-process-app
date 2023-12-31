import '@testing-library/jest-dom';
import { setLogger } from 'react-query';
import { server } from '../msw/server';

beforeAll(() => {
    return server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => server.close());

setLogger({
    // log: console.log,
    warn: console.warn,
    error: () => {},
});
