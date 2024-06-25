import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserType } from '@services/types/User';

export type ModalType = {
  isModalOpen: boolean;
  modal: 'primary' | 'secondary';
};

export interface UserState {
  user: UserType;
  token: string | null;
  refreshToken: string | null;
  modal: ModalType;
  loggedInPressed: boolean;
}

const initialState: UserState = {
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    birthDate: '',
  },
  modal: {
    isModalOpen: true,
    modal: 'primary',
  },
  loggedInPressed: false,
  token: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = { ...state.user, ...action.payload };
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },
    setModal: (state, action: PayloadAction<ModalType>) => {
      state.modal = { ...state.modal, ...action.payload };
    },
    setLoggedInPressed: (state, action: PayloadAction<boolean>) => {
      state.loggedInPressed = action.payload;
    },
  },
});

export const { setUser, setToken, setRefreshToken, setModal, setLoggedInPressed } = userSlice.actions;

export default userSlice.reducer;
