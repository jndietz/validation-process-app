import { renderHook, waitFor } from '../test/utils';
import { useConfigQuery } from './config';

import { server, rest } from '../msw/server';
import { uris } from './endpoints';
import { assignedConfig } from '../stubs/config';

describe('useConfigQuery', () => {
    it('Should return the config', async () => {
        server.use(
            rest.get(uris.configUri(':id'), (_req, res, ctx) => {
                return res(ctx.json(assignedConfig));
            }),
        );

        const { result } = renderHook(() => useConfigQuery('test'));

        await waitFor(() =>
            expect(result.current.data).toStrictEqual(
                expect.objectContaining({
                    configurationName: assignedConfig.configurationName,
                }),
            ),
        );
    });

    it('Should gracefully handle the error', async () => {
        server.use(
            rest.get(uris.configUri(':id'), (_req, res) => {
                console.info('request handled');
                return res.networkError();
            }),
        );

        const { result } = renderHook(() => useConfigQuery('test'));

        await waitFor(() => expect(result.current.isError).toBeTruthy());
    });
});
