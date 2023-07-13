import './index.css';
import { useConfigQuery } from './api/config';

export default function App() {
    const { data } = useConfigQuery('test');

    return (
        <div className="mb-4">
            <p>
                Your configuration is:{' '}
                {data ? (
                    <span className="font-semibold">
                        {data.configurationName}
                    </span>
                ) : (
                    <span className="blur-sm">Loading</span>
                )}
            </p>
        </div>
    );
}
