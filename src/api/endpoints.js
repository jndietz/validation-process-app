import axios from 'axios';

const api = axios.create();

// List of api locations
export const uris = {
    configBase: 'api/v1/config',
    configUri: (id) => `${uris.configBase}/settings/${id}`,
};

// List of api endpoints
export const endpoints = {
    // Get configuration by id
    getConfig: (id) => async () => {
        try {
            const { data } = await api.get(uris.configUri(id));

            return data;
        } catch (e) {
            throw e;
        }
    },
};

// List of query keys
export const keys = {
    config: ['config'],
    configById: (id) => [...keys.config, 'id', id],
};
