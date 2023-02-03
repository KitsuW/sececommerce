import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const purchases = useSelector(state => state.purchases)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    console.log(purchases)

    return (
        <ul>  
            {purchases.map (purchase => (
                    <li key={purchase.product?.id}
                        onClick={() => navigate(`/products/${purchase.product.id}`)}>
                        <img src={purchase.product?.images[0].url} alt="" /> {purchase.product?.title}</li>
            ))}
        </ul>
    );
};

export default Purchases;