import { defineStore } from 'pinia';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { ILaunch } from '@/components/models/ILaunch';
import { toast } from 'vue3-toastify';

type IsavedIds =
    {
        id: number,
    }

export const useLaunchStore = defineStore('launch', {

    state: () => ({
        allLaunches: [] as ILaunch[],
        savedLaunch: [] as ILaunch[],
        savedLaunchIds: [] as number[],
        baseURL: 'http://localhost:3000' as string,
        httpError: false as boolean,
    }),

    actions: {
        async fetchAllLaunches() {
            try {
                const response = await axios.get(`${this.baseURL}/allLaunch`);
                this.allLaunches = response.data;
            } catch (error) {
                this.httpError = true;
                this.errorHandler(error);
            }
        },

        async fetchSavedLaunches() {
            try {
                const response = await axios.get(`${this.baseURL}/getLaunch`);
                this.savedLaunch = response.data;
            } catch (error) {
                this.errorHandler(error);
            }
        },

        async addLaunch(launch_data: ILaunch) {
            try {
                const response = await axios.post(`${this.baseURL}/addLaunch`, launch_data);
                this.savedLaunch.push(response.data);
                this.toastController('add', response.data.message);
            } catch (error) {
                this.errorHandler(error);
            }
            finally {
                this.fetchsavedIds();
            }
        },

        async deleteLaunch(id: number) {
            try {
                const response = await axios.delete(`${this.baseURL}/rmvLaunch/${id}`);
                this.savedLaunch = this.savedLaunch.filter(launch => launch._id !== id);
                this.toastController('delete', response.data.message);
            } catch (error) {
                this.errorHandler(error);
            }
        },

        async fetchsavedIds() {
            try {
                const response = await axios.get(`${this.baseURL}/savedIds`);
                this.savedLaunchIds = response.data.map((item: IsavedIds) => item.id);
            } catch (error) {
                this.errorHandler(error);
            }
        },

        toastController(type: 'add' | 'delete' | 'fail', message: string) {
            switch (type) {
                case 'add': {
                    toast.info(message);
                    break;
                }
                case 'delete': {
                    toast.error(message);
                    break;
                }
                case 'fail': {
                    toast.warn(message);
                    break;
                }
            }
        },
        errorHandler(error: unknown) {
            const err = error as AxiosError;
            if (err.response) {
                const msg = err.response as AxiosResponse;
                console.log(msg)
                if (msg.data.message) {
                    this.toastController('fail', msg.data.message);
                }
                else {
                    this.toastController('fail', "Oops, something went wrong");
                }
            }
            else {
                this.toastController('fail', "Oops, something went wrong");
            }
        }
    },

    // getters: {
    //     getAllLaunches(state) {
    //         return state.allLaunches;
    //     },

    //     getSavedLaunches(state) {
    //         return state.savedLaunch;
    //     },

    //     getIdsOfSavedLaunches(state) {
    //         return state.savedLaunchIds;
    //     },
    //     isHttpError(state) {
    //         return state.httpError;
    //     }
    // }

});
