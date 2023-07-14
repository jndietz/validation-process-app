import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import AlertModule from './Alert.module.css';

export const severityLevel = {
    warning: 'warning',
    error: 'error',
    info: 'info',
    success: 'success',
};

const AlertProps = {
    className: PropTypes.string,
    severity: PropTypes.oneOf(Object.keys(severityLevel)),
    message: PropTypes.node.isRequired,
};

/**
 * @typedef {React.HTMLAttributes<?> & PropTypes.InferProps<AlertProps>} AlertPropTypes
 */

/**
 * @type {React.FC<AlertPropTypes>}
 */
export default function Alert({ severity, message, className, ...restProps }) {
    return (
        <div
            {...restProps}
            className={clsx(
                AlertModule.alert,
                AlertModule[`alert-${severity}`],
                className,
            )}
        >
            {message}
        </div>
    );
}

Alert.propTypes = AlertProps;

Alert.defaultProps = {
    severity: 'info',
};
