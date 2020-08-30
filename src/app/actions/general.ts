import { Payload } from "./types";

export interface GeneralState {
    loading: boolean;
    error: Error;
}

export interface Error {
    name: string;
    message: string;
}

export const SET_ERROR = 'SET_ERROR';
export const setError = (error: Error): Payload => {
    return {
        type: SET_ERROR,
        data: error
    }
}

export const SET_LOADING = 'SET_LOADING';
export const setLoading = (loading: boolean): Payload => {
    return {
        type: SET_LOADING,
        data: loading
    }
}
