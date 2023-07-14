import { render, screen, fireEvent } from '@testing-library/react';
import Button, { buttonTypes } from './Button';

describe('Button', () => {
    const unrollByType = Object.values(buttonTypes).map((x) => [x]);

    it.each(unrollByType)('Button type %s matches snapshot', (type) => {
        render(
            <Button variant={type} data-testid={type}>
                Test
            </Button>,
        );

        expect(screen.getByTestId(type)).toMatchSnapshot();
    });

    it.each(unrollByType)(
        'Button type %s matches snapshot in loading state',
        (type) => {
            render(
                <Button variant={type} data-testid={type} loading>
                    Test
                </Button>,
            );

            expect(screen.getByTestId(type)).toMatchSnapshot();
        },
    );

    it.each(unrollByType)(
        'Button type %s matches snapshot in disabled state',
        (type) => {
            render(
                <Button variant={type} data-testid={type} disabled>
                    Test
                </Button>,
            );

            expect(screen.getByTestId(type)).toMatchSnapshot();
        },
    );

    it.each(unrollByType)(
        'Button type %s matches snapshot in mixed state',
        (type) => {
            render(
                <Button variant={type} data-testid={type} disabled loading>
                    Test
                </Button>,
            );

            expect(screen.getByTestId(type)).toMatchSnapshot();
        },
    );

    it.each(unrollByType)(
        'Button type %s matches snapshot in full width',
        (type) => {
            render(
                <Button variant={type} data-testid={type} fullWidth>
                    Full
                </Button>,
            );

            expect(screen.getByTestId(type)).toMatchSnapshot();
        },
    );

    it('Custom class matches snapshot', () => {
        render(<Button className="classy">Style</Button>);

        expect(screen.getByText(/Style/)).toMatchSnapshot();
    });

    it('Custom component matches snapshot', () => {
        render(
            <Button component={'a'} href="#">
                Link
            </Button>,
        );

        expect(screen.getByText(/Link/)).toMatchSnapshot();
    });

    it('Accepts standard element props', () => {
        const mockClick = vi.fn();
        render(<Button onClick={mockClick}>Action</Button>);

        fireEvent.click(screen.getByText(/Action/));

        expect(mockClick).toHaveBeenCalled();
    });
});
