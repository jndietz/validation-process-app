import { rest } from 'msw';
import { uris } from '../api/endpoints';
import { assignedConfig } from '../stubs/config';

export const handlers = [
    rest.get(uris.configUri(':id'), (_req, res, ctx) => {
        return res(ctx.json(assignedConfig));
    }),
    rest.post(uris.configUri(':id'), async (req, res, ctx) => {
        const response = await req.json();

        return res(ctx.json(response));
    }),
];
