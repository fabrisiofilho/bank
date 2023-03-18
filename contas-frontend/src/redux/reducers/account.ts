import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../../services/url-service";
import { Pageable } from "../../models/pageable";
import { Account } from "../../models/account";

export const getAccounts = createAsyncThunk(
    'account/getAccount',
    async (page: string) => {
      const result = await backend.get<Pageable<Account>>(
        `account/page/${page}`);
      return result.data;
    }
);

export const getCountsAccount = createAsyncThunk(
  'account/counts',
  async () => {
    const result = await backend.get<String>(
      `account/counts`);
    return result.data;
  }
);

export const getAccount = createAsyncThunk(
    'account',
    async (id: string) => {
      const result = await backend.get<Account>(
        `account/${id}`);
      return result.data;
    }
);

export const updateAccount = createAsyncThunk(
    'account/updateAccount',
    async (account: Account) => {
      try {
      const result = await backend.put<Account>(
        `account`, account);
      return result.data;
      } catch(err) {
        throw new Error(err.response.data);
      }
    }
);

export const createAccount = createAsyncThunk(
    'account/createAccount',
    async (account: Account) => {
      try {
        const result = await backend.post<Account>(
          `account`, account);
        return result.data;
      } catch(err) {
        throw new Error(err.response.data);
      }
    }
);

export const deleteAccount = createAsyncThunk(
    'account/deleteAccount',
    async (id: string) => {
      const result = await backend.delete<Account>(
        `account/${id}`);
      return result.data;
    }
)

type StateProps = {
    accounts: Pageable<Account>;
    status: 'pending' | 'accept' | 'rejected';
};

const initialState: StateProps = {
    accounts: {
      content: [],
      number: 0,
      size: 20,
      totalElements: 0,
      totalPages: 0
    },
    status: 'pending',
};

export const accountSlice = createSlice({
    initialState,
    name: 'account',
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAccounts.pending, (state, action) => {
            state.status = 'pending';
        })
        .addCase(getAccounts.fulfilled, (state, action) => {
            state.accounts = action.payload;
            state.status = 'accept';
        })
        .addCase(getAccounts.rejected, (state, action) => {
            state.status = 'rejected';
        })
    },
});


export const {} = accountSlice.reducer;
