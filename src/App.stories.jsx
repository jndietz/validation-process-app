import App from './App';
import { uris } from './api/endpoints';
import { rest } from 'msw';
import { assignedConfig } from './stubs/config';

export default {
    title: 'App',
    component: App,
};

const Template = () => <App />;

export const Default = Template.bind({});

export const LongLoadingTimes = Template.bind({});
LongLoadingTimes.parameters = {
    msw: {
        handlers: [
            rest.get(uris.configUri(':id'), (_req, res, ctx) => {
                return res(ctx.json(assignedConfig), ctx.delay(2000));
            }),
        ],
    },
};

export const Error = Template.bind({});
Error.parameters = {
    msw: {
        handlers: [
            rest.get(uris.configUri(':id'), (_req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({ message: 'Error' }),
                    ctx.delay(500),
                );
            }),
        ],
    },
};
