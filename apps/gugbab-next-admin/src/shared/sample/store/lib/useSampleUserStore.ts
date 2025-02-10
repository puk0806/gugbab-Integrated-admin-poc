import { create } from 'zustand';

interface UserInfo {
  userId: string;
  userName: string;
}

const initState: UserInfo = {
  userId: '',
  userName: '',
};

interface SampleUserStore {
  userInfo: UserInfo;
  isLogin: boolean;
  setUserInfo: (userInfo: UserInfo) => void;
  setIsLogin: (isLogin: boolean) => void;
}

export const useOnboardingStore = create<SampleUserStore>(set => ({
  userInfo: initState,
  isLogin: false,
  setUserInfo: userInfo => set({ userInfo }),
  setIsLogin: isLogin => set({ isLogin }),
}));
