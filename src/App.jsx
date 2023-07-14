import './index.css';
import { useConfigQuery } from './api/config';

import Alert from './components/Alert';
import Button from './components/Button';

export default function App() {
    const { data, isError, refetch } = useConfigQuery('test');

    if (isError) {
        return (
            <Alert
                severity="error"
                message={
                    <div className="flex flex-col md:flex-row gap-4 align-middle justify-between">
                        <p className="my-auto leading-none text-red-700 font-semibold">
                            There was a problem loading your configuration.
                            Please try again.
                        </p>
                        <div>
                            <Button
                                variant="danger"
                                type="button"
                                onClick={refetch}
                                fullWidth
                            >
                                Retry
                            </Button>
                        </div>
                    </div>
                }
            />
        );
    }

    if (!data) {
        return (
            <p className="text-xl text-center leading-none blur-sm">
                We are loading your configuration.
            </p>
        );
    }

    return (
        <p className="text-xl text-center leading-none">
            Your configuration is:{' '}
            <span className="font-semibold">{data.configurationName}</span>
        </p>
    );
}
