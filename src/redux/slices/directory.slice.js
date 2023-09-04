import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isPending,
    isRejectedWithValue,
} from '@reduxjs/toolkit';
import { directoryService } from '../../services';

const initialState = {
    directories: [],
    directoryForUpdate: null,
    trigger: null,
    loading: false,
    error: null,
};

const getAll = createAsyncThunk('directorySlice/getAll', async (_, thunkAPI) => {
    try {
        const { data } = await directoryService.getAll();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const create = createAsyncThunk(
    'directorySlice/create',
    async ({ directory }, thunkAPI) => {
        try {
            await directoryService.create(directory);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const update = createAsyncThunk(
    'directorySlice/update',
    async ({ id, directory }, thunkAPI) => {
        try {
            await directoryService.updateById(id, directory);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const deleteDirectory = createAsyncThunk(
    'directorySlice/deleteDirectory',
    async ({ id }, thunkAPI) => {
        try {
            await directoryService.deleteById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const slice = createSlice({
    name: 'directorySlice',
    initialState,
    reducers: {
        setDirectoryForUpdate: (state, action) => {
            state.directoryForUpdate = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.directories = action.payload;
            })
            .addCase(update.fulfilled, state => {
                state.directoryForUpdate = null;
            })
            .addMatcher(isPending(), state => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isFulfilled(), state => {
                state.loading = false;
                state.error = null;
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addMatcher(isFulfilled(update, create, deleteDirectory), (state) => {
                state.trigger = !state.trigger;
            }),
});

const { reducer: directoryReducer, actions } = slice;

const directoryActions = {
    ...actions,
    getAll,
    create,
    update,
    deleteDirectory
};

export { directoryReducer, directoryActions };
