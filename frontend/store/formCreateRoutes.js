import {create} from "zustand";

export const useFormCreateRoutes = create((set) => ({
    step:1,
    start:[],
    points:[],


    setStep:(step) => set(() => ({step})),
    setStart:(start) => set(() => ({start})),
    addPoint: (point) => set((state) => ({ points: [...state.points, point] })),
    
    // Если нужно установить points целиком
    setPoints: (points) => set({ points }),
}));