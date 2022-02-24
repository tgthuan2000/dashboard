import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export interface CounterState {
	value: number
}

const initialState: CounterState = {
	value: 0,
}

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1
		},
		decrement: (state) => {
			state.value -= 1
		},
		incrementByAmount: (state, { payload }: PayloadAction<number>) => {
			state.value += payload
		},
	},
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer

export const useCounter = () => useSelector((state: RootState) => state.counter)
