import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import ButtonModule from './Button.module.css';

export const buttonTypes = {
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    danger: 'danger',
    link: 'link',
};

const ButtonProps = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    variant: PropTypes.oneOf(Object.values(buttonTypes)),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    component: PropTypes.elementType,
};

/**
 * @typedef {React.ButtonHTMLAttributes<?> & PropTypes.InferProps<ButtonProps>} ButtonPropTypes
 */

/**
 * Renders custom button component.
 *
 * @type {React.ForwardRefRenderFunction<?, ButtonPropTypes>}
 */
const Button = React.forwardRef(
    (
        {
            children,
            className,
            component: Component,
            fullWidth,
            variant,
            disabled,
            loading,
            ...restProps
        },
        ref,
    ) => (
        <Component
            {...restProps}
            ref={ref}
            className={clsx(
                ButtonModule.base,
                ButtonModule[variant],
                {
                    [ButtonModule.disabled]: disabled,
                    [ButtonModule.full]: fullWidth,
                    [ButtonModule.button]: variant !== buttonTypes.link,
                    [ButtonModule.loading]: loading,
                },
                className,
            )}
        >
            {children}
        </Component>
    ),
);

Button.propTypes = ButtonProps;

Button.defaultProps = {
    variant: buttonTypes.primary,
    fullWidth: false,
    disabled: false,
    loading: false,
    component: 'button',
};

export default Button;
