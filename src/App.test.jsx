import { fireEvent, render, screen } from './test/utils';
import { server, rest } from './msw/server';
import { uris } from './api/endpoints';
import { unassignedConfig } from './stubs/config';
import App from './App';

describe('App', () => {
    it('Renders without crashing and calls for API data', async () => {
        render(<App />);

        screen.getByText(/We are loading your configuration./i);

        await expect(
            screen.findByText(/Configuration 1/),
        ).resolves.toBeInTheDocument();
    });

    it('Renders an error message when request fails. User can retry.', async () => {
        server.use(
            rest.get(uris.configUri(':id'), (_req, res, ctx) => {
                return res.once(ctx.status(500));
            }),
            rest.get(uris.configUri(':id'), (_req, res, ctx) => {
                return res(ctx.json(unassignedConfig));
            }),
        );

        render(<App />);

        await expect(
            screen.findByText(
                /There was a problem loading your configuration./i,
            ),
        ).resolves.toBeInTheDocument();

        fireEvent.click(screen.getByText(/Retry/));

        await expect(
            screen.findByText(unassignedConfig.configurationName),
        ).resolves.toBeInTheDocument();
    });
});
