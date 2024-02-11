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
}

const initialState: UserState = {
  user: {
    id: 0,
    firstName: '',
    lastName: '',
  },
  modal: {
    isModalOpen: true,
    modal: 'primary',
  },
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
  },
});

export const {
  setUser,
  setToken,
  setRefreshToken,
  setModal,
} = userSlice.actions;

export default userSlice.reducer;
