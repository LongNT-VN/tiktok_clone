import create from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

interface authStore {
  userProfile?: null | IUser;
  addUser: (user: IUser) => void;
  removeUser: () => void;
}

const useAuthStore = create<authStore>()(
  persist(
    (set) => ({
      userProfile: null,
      addUser: (user: IUser) => set({ userProfile: user }),
      removeUser: () => set({ userProfile: null }),
    }),
    {
      name: "auth",
    }
  )
);
export default useAuthStore;
