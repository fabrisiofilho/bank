import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../../services/url-service";
import { Pageable } from "../../models/pageable";
import { Transaction } from "../../models/transaction";

export const getTransactions = createAsyncThunk(
    'transaction/getTransactions',
    async (page: string) => {
      const result = await backend.get<Pageable<Transaction>>(
        `transaction/page/${page}`);
      return result.data;
    }
);

export const getTransaction = createAsyncThunk(
    'transaction',
    async (id: string) => {
      const result = await backend.get<Transaction>(
        `transaction/${id}`);
      return result.data;
    }
);

export const updateTransaction = createAsyncThunk(
    'transaction/updateTransaction',
    async (transaction: Transaction) => {
      try {
        const result = await backend.put<Transaction>(
          `transaction`, transaction);
        return result.data;
      } catch(err) {
        throw new Error(err.response.data);
      }
    }
);

export const createTransaction = createAsyncThunk(
    'transaction/createTransaction',
    async (transaction: Transaction) => {
      try {
        const result = await backend.post<Transaction>(
          `transaction`, transaction);
        return result.data;
      } catch(err) {
        throw new Error(err.response.data);
      }
    }
);

export const deleteTransaction = createAsyncThunk(
    'transaction/deleteTransaction',
    async (id: string) => {
      const result = await backend.delete<Transaction>(
        `transaction/${id}`);
      return result.data;
    }
)

export const getCountsTransaction = createAsyncThunk(
  'transaction/counts',
  async () => {
    const result = await backend.get<String>(
      `transaction/counts`);
    return result.data;
  }
);

type StateProps = {
    transactions: Pageable<Transaction>;
    status: 'pending' | 'accept' | 'rejected';
};

const initialState: StateProps = {
    transactions: {
      content: [],
      number: 0,
      size: 20,
      totalElements: 0,
      totalPages: 0
    },
    status: 'pending',
};

export const transactionSlice = createSlice({
    initialState,
    name: 'transaction',
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getTransactions.pending, (state, action) => {
            state.status = 'pending';
        })
        .addCase(getTransactions.fulfilled, (state, action) => {
            state.transactions = action.payload;
            state.status = 'accept';
        })
        .addCase(getTransactions.rejected, (state, action) => {
            state.status = 'rejected';
        })
    },
});


export const {} = transactionSlice.reducer;
