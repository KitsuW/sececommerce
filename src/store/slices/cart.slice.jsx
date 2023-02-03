import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {setIsLoading} from './isLoading.slice'
import getConfig from '../../utils/getConfig';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action)  => {
            const cart = action.payload
            return cart
        }
    }
})

export const getCartThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
        .then(res => dispatch(setCart(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const postCartThunk = (cart) => dispatch => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', cart, getConfig())
        .then(res => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const {  } = cartSlice.actions;

export const {setCart} = cartSlice.actions

export default cartSlice.reducer;