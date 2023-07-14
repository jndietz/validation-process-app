import Alert from './Alert';

export default {
    title: 'Components/Alert',
    component: Alert,
    args: {
        severity: 'info',
        message: 'This is an info alert',
    },
};

const Template = (args) => <Alert {...args} />;

export const Info = Template.bind({});
Info.args = {
    severity: 'info',
    message: 'This is an info alert',
};

export const Success = Template.bind({});
Success.args = {
    severity: 'success',
    message: 'This is a success alert',
};

export const Warning = Template.bind({});
Warning.args = {
    severity: 'warning',
    message: 'This is a warning alert',
};

export const Error = Template.bind({});
Error.args = {
    severity: 'error',
    message: 'This is an error alert',
};
