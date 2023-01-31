import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {

    const {id} = useParams()

    return (
        <div>
            <h1>Product Detail</h1>
            <p>{id}</p> 
        </div>
    );
};

export default ProductDetail;