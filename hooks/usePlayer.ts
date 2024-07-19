import { create } from "zustand";

interface PlayerStore{
    ids: string[];
    activeId?: string;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    reset: () => void;
};

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: undefined,
    setId: (id: string) => set({ activeId: id }),   // Uses a set function to open an object and assign an activeId to that id variable
    setIds: (ids: string[]) => set({ ids: ids }),
    reset: () => set({ ids: [], activeId: undefined }), // It will be used to reset the state, with activeId becoming undefined
}));

export default usePlayer;
