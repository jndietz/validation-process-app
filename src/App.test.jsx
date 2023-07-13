import { render, screen } from './test/utils';
import App from './App';

describe('App', () => {
    it('Renders without crashing and calls for API data', async () => {
        render(<App />);

        screen.getByText(/Loading/i);

        await expect(
            screen.findByText(/Configuration 1/),
        ).resolves.toBeInTheDocument();
    });
});
