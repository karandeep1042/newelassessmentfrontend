import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    staffId: null,
    isUpdate: null,
    isOnlyRead: null
}

export const Slice = createSlice({
    name: 'ID',
    initialState,
    reducers: {
        setStaffId: (state, action) => {
            state.staffId = action.payload;
        },
        setIsUpdate: (state, action) => {
            state.isUpdate = action.payload;
        },
        setIsOnlyRead: (state, action) => {
            state.isOnlyRead = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setStaffId, setIsUpdate, setIsOnlyRead } = Slice.actions

export default Slice.reducer