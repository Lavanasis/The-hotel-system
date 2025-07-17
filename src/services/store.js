import { configureStore } from '@reduxjs/toolkit';
import { cabinApi } from './CabinApi';
import { settingApi } from './SettingApi';
import { bookingApi } from './BookingApi';
import { registerApi} from './RegisterApi';
import { userApi } from './UserApi';
export const store = configureStore({
  reducer: {
    [cabinApi.reducerPath]: cabinApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [settingApi.reducerPath]: settingApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cabinApi.middleware,
      settingApi.middleware,
      bookingApi.middleware,
      userApi.middleware,
      registerApi.middleware,
    ),
});