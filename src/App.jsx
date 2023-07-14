import './index.css';
import { useConfigQuery } from './api/config';

export default function App() {
    const { data, isError, refetch } = useConfigQuery('test');

    if (isError) {
        return (
            <p className="text-lg text-center leading-none text-red-700 font-semibold">
                There was a problem loading your configuration.{' '}
                <button className="underline" type="button" onClick={refetch}>
                    Retry
                </button>
                .
            </p>
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
