import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { accountSlice } from './reducers/account';
import { transactionSlice } from './reducers/transaction';
import { clientSlice } from './reducers/client';
import { sessionSlice } from './reducers/session';

export const store = configureStore ({
    reducer: {
        conta: accountSlice.reducer,
        movimentacao: transactionSlice.reducer,
        pessoa: clientSlice.reducer,
        session: sessionSlice.reducer
    },
    middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  