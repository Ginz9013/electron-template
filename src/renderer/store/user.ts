import { BehaviorSubject } from 'rxjs';

type UserState = {
  token: string | null;
};

const state$ = new BehaviorSubject<UserState>({ token: null });

export const userStore = {
  subscribe: (callback: (userState: UserState) => void) =>
    state$.subscribe(callback),
  getUserStore: () => state$.getValue(),
  setUserStore: (newState: Partial<UserState>) => {
    const currentUser = state$.getValue();
    state$.next({ ...currentUser, ...newState });
  },
};
