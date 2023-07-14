import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  allFarmers: Array<any>
  allDistrict: Array<any>
  createFarmer: Array<any>
  updateFarmer: Array<any>
  deleteFarmer: Array<any>
  getFarmer: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  allFarmers: [],
  allDistrict: [],
  createFarmer: [],
  updateFarmer: [],
  getFarmer: [],
  deleteFarmer: [],
  isLoading: false
}
export const getAllFarmers = createAsyncThunk('farmers/getAllFarmers', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/getAllFarmer`, payload, {
      headers
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const getAllDistrict = createAsyncThunk('farmers/getAllDistrict', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/getAllCity`, payload, {
      headers
    })
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const createFarmer = createAsyncThunk('farmers/createFarmer', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/createFarmer`, payload, {
      headers
    })
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const getSingleFarmer = createAsyncThunk('farmer/getSingleFarmer', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/getSingleFarmer/${payload?.id}`, {
      headers
    })
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const updateFarmer = createAsyncThunk('farmer/updateFarmer', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/updateFarmer`, payload, {
      headers
    })
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const deleteFarmer = createAsyncThunk('farmer/deleteFarmer', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/deleteFarmer/${payload?.id}`, {
      headers
    })
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
// Company Profile slice
export const farmersSlice = createSlice({
  name: 'farmers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllFarmers.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllFarmers.fulfilled, (state, action) => {
      state.isLoading = false
      state.allFarmers = action.payload
    })
    builder.addCase(getAllFarmers.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getAllDistrict.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllDistrict.fulfilled, (state, action) => {
      state.isLoading = false
      state.allDistrict = action.payload
    })
    builder.addCase(getAllDistrict.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createFarmer.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createFarmer.fulfilled, (state, action) => {
      state.isLoading = false
      state.createFarmer = action.payload
    })
    builder.addCase(createFarmer.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateFarmer.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateFarmer.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateFarmer = action.payload
    })
    builder.addCase(updateFarmer.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getSingleFarmer.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getSingleFarmer.fulfilled, (state, action) => {
      state.isLoading = false
      state.getFarmer = action.payload
    })
    builder.addCase(getSingleFarmer.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteFarmer.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteFarmer.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteFarmer = action.payload
    })
    builder.addCase(deleteFarmer.rejected, state => {
      state.isLoading = false
    })
  }
})
export default farmersSlice.reducer
