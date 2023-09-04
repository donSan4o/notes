import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isPending,
    isRejectedWithValue,
} from '@reduxjs/toolkit';
import { carService } from '../../services';

const initialState = {
    cars: [],
    carForUpdate: null,
    trigger: null,
    loading: false,
    error: null,
};

const getAll = createAsyncThunk('carSlice/getAll', async (_, thunkAPI) => {
    try {
        const { data } = await carService.getAll();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const create = createAsyncThunk(
    'carSlice/create',
    async ({ car }, thunkAPI) => {
        try {
            await carService.create(car);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const update = createAsyncThunk(
    'carSlice/update',
    async ({ id, car }, thunkAPI) => {
        try {
            await carService.updateById(id, car);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const deleteCar = createAsyncThunk(
    'carSlice/deleteCar',
    async ({ id }, thunkAPI) => {
        try {
            await carService.deleteById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const slice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
            .addCase(update.fulfilled, state => {
                state.carForUpdate = null;
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
            .addMatcher(isFulfilled(update, create, deleteCar), (state) => {
                state.trigger = !state.trigger;
            }),
});

const { reducer: carReducer, actions } = slice;

const carActions = {
    ...actions,
    getAll,
    create,
    update,
    deleteCar
};

export { carReducer, carActions };
