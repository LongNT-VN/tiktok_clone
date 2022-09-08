import create from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

const authStore = (set: any) => ({
  userProfile: null,
  addUser: (user: IUser) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
