import {createSlice} from '@reduxjs/toolkit'

const tabSlice=createSlice({
    name:'tab',
    initialState:{
        isClose:false
    },
    reducers:{
        closeMenu:state=>{
            state.isClose=!state.isClose
        }
    }
})

export const {closeMenu}=tabSlice.actions
export default tabSlice.reducer