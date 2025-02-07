import {create} from "zustand";

export const useFormCreateRoutes = create((set) => ({
    start:[],
    setStart:(start) => set(() => ({start})),
}));