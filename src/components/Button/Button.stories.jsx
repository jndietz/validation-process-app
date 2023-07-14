import Button from './Button';

export default {
    title: 'Controls/Button',
    component: Button,
    args: {
        children: 'Button',
    },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Primary',
    variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'Secondary',
    variant: 'secondary',
};

export const Danger = Template.bind({});
Danger.args = {
    children: 'Danger',
    variant: 'danger',
};

export const Success = Template.bind({});
Success.args = {
    children: 'Success',
    variant: 'success',
};

export const Link = Template.bind({});
Link.args = {
    children: 'Link',
    variant: 'link',
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'Disabled',
    disabled: true,
};

export const DisabledLink = Template.bind({});
DisabledLink.args = {
    children: 'Disabled Link',
    disabled: true,
    variant: 'link',
};

export const Loading = Template.bind({});
Loading.args = {
    children: 'Loading',
    disabled: true,
    loading: true,
};
