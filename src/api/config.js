import { useQuery } from 'react-query';
import { endpoints, keys } from './endpoints';

/**
 * @typedef {typeof import('../stubs/config').assignedConfig} ConfigData
 */

/**
 * @param {string} id
 * @param {import('react-query').UseQueryOptions<ConfigData>} config
 * @returns {import('react-query').UseQueryResult<ConfigData>}
 */
export function useConfigQuery(id, config = {}) {
    return useQuery({
        ...config,
        queryKey: keys.configById(id),
        queryFn: endpoints.getConfig(id),
    });
}
