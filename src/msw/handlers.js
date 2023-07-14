import { rest } from 'msw';
import { uris } from '../api/endpoints';
import { assignedConfig } from '../stubs/config';

export const handlers = [
    rest.get(uris.configUri(':id'), (_req, res, ctx) => {
        return res(ctx.json(assignedConfig));
    }),
];
