import { create } from "zustand";

export const useFormCreateRoutes = create((set) => ({
  step: 1,
  start: [],
  points: [],
  descriptions: {},

  // Данные маршрута
  routeInfo: {
    title: "",
    description: "",
    type: "Пеший",
    media: [],
    isPublic: false,
  },

  // Методы
  setStep: (step) => set(() => ({ step })),

  setStart: (start) => set(() => ({ start })),

  addPoint: (point) =>
    set((state) => {
      // Проверяем, существует ли уже точка с таким ID
      if (state.points.some((p) => p.id === point.id)) return state;
  
      return {
        points: [...state.points, point],
        descriptions: {
          ...state.descriptions,
          [point.id]: { name: "", description: "", photos: [] },
        },
      };
    }),

  updatePoint: (id, updatedData) =>
    set((state) => ({
      points: state.points.map((point) =>
        point.id === id ? { ...point, ...updatedData } : point
      ),
    })),

  updateDescription: (id, data) =>
    set((state) => ({
      descriptions: {
        ...state.descriptions,
        [id]: { ...state.descriptions[id], ...data },
      },
    })),

  setPoints: (points) =>
    set(() => ({
      points,
      descriptions: points.reduce((acc, point) => {
        acc[point.id] = { name: "", description: "", photos: [] };
        return acc;
      }, {}),
    })),

  removePoint: (id) =>
    set((state) => ({
      points: state.points.filter((point) => point.id !== id),
      descriptions: Object.keys(state.descriptions).reduce((acc, key) => {
        if (key !== id) acc[key] = state.descriptions[key];
        return acc;
      }, {}),
    })),

  // Обновление информации о маршруте
  updateRouteInfo: (key, value) =>
    set((state) => ({
      routeInfo: { ...state.routeInfo, [key]: value },
    })),

  // Функция для очистки всех данных
  clearAllData: () =>
    set(() => ({
      step: 1,
      start: [],
      points: [],
      descriptions: {},
      routeInfo: {
        title: "",
        description: "",
        type: "Пеший",
        media: [],
        isPublic: false,
      },
    })),
}));