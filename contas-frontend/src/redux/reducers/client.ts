import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backend } from "../../services/url-service";
import { Pageable } from "../../models/pageable";
import { Client } from "../../models/client";

export const getClients = createAsyncThunk(
    'client/getClients',
    async (page: string) => {
      const result = await backend.get<Pageable<Client>>(
        `client/page/${page}`);
      return result.data;
    }
);

export const getClient = createAsyncThunk(
    'client',
    async (id: string) => {
      const result = await backend.get<Client>(
        `client/${id}`);
      return result.data;
    }
);

export const getClientByName = createAsyncThunk(
  'client',
  async (name: string) => {
    const result = await backend.post<Client[]>(
      `client/byName`, { name } );
    return result.data;
  }
);

export const updateClient = createAsyncThunk(
    'client/updateClient',
    async (client: Client) => {
      const result = await backend.put<Client>(
        `client`, client);
      return result.data;
    }
);

export const createClient = createAsyncThunk(
    'client/createClient',
    async (client: Client) => {
      try{
        const result = await backend.post<Client>(
          `client`, client);
        return result.data;
      } catch(err) {
        throw new Error(err.response.data);
      }
    }
);

export const deleteClient = createAsyncThunk(
    'client/deleteClient',
    async (id: string) => {
      const result = await backend.delete<Client>(
        `client/${id}`);
      return result.data;
    }
)

export const getCountsClient = createAsyncThunk(
  'client/counts',
  async () => {
    const result = await backend.get<String>(
      `client/counts`);
    return result.data;
  }
);


type StateProps = {
    clients: Pageable<Client>;
    status: 'pending' | 'accept' | 'rejected';
};

const initialState: StateProps = {
    clients: {
      content: [],
      number: 0,
      size: 20,
      totalElements: 0,
      totalPages: 0
    },
    status: 'pending',
};

export const clientSlice = createSlice({
    initialState,
    name: 'client',
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getClients.pending, (state, action) => {
            state.status = 'pending';
        })
        .addCase(getClients.fulfilled, (state, action) => {
            state.clients = action.payload;
            state.status = 'accept';
        })
        .addCase(getClients.rejected, (state, action) => {
            state.status = 'rejected';
        })
        .addCase(createClient.pending, (state, action) => {
          state.status = 'pending';
        })
        .addCase(createClient.fulfilled, (state, action) => {
          state.status = 'accept';
        })
        .addCase(createClient.rejected, (state, action) => {
          state.status = 'rejected';
        })
        .addCase(updateClient.pending, (state, action) => {
          state.status = 'pending';
        })
        .addCase(updateClient.fulfilled, (state, action) => {
          state.status = 'accept';
        })
        .addCase(updateClient.rejected, (state, action) => {
          state.status = 'rejected';
        })
        .addCase(getClientByName.pending, (state, action) => {
          state.status = 'pending';
        })
        .addCase(getClientByName.fulfilled, (state, action) => {
          state.status = 'accept';
        })
        .addCase(getClientByName.rejected, (state, action) => {
          state.status = 'rejected';
        })
    },
});


export const {} = clientSlice.reducer;
