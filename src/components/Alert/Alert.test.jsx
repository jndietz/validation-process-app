import Alert, { severityLevel } from './Alert';
import { render, screen } from '@testing-library/react';

describe('Alert', () => {
    const unrollBySeverity = Object.values(severityLevel).map((x) => [x]);

    it.each(unrollBySeverity)(
        'Severity level %s matches snapshot',
        (severity) => {
            render(
                <Alert
                    severity={severity}
                    message="Test"
                    data-testid={severity}
                />,
            );

            expect(screen.getByTestId(severity)).toMatchSnapshot();
        },
    );

    it('Default severity level matches snapshot', () => {
        render(<Alert message="Default" />);

        expect(screen.getByText(/Default/)).toMatchSnapshot();
    });

    it('Passes className to child and matches snapshot', () => {
        render(<Alert message="Classy" className="test" />);

        const alert = screen.getByText(/Classy/);

        expect(alert).toMatchSnapshot();
        expect(alert.classList.contains('test')).toBeTruthy();
    });
});
