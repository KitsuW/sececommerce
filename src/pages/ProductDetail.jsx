import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { postCartThunk } from '../store/slices/cart.slice';
import { filterProductCategoryThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

    const {id} = useParams()
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productList = useSelector(state => state.products)

    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then(res => {  
                    setProduct(res.data),
                    setCategory(res.data.category.id),
                    dispatch(filterProductCategoryThunk(res.data.category.id))    
                })
    }, [id])

    const [quantity, setQuantity] = useState(1)
    const addToCart = () => {
        const cart = {
            quantity: quantity,
            productId: id
        }
        dispatch(postCartThunk(cart))
        console.log(cart)
    }



    return (
        <div>
            <div>
                <div>
                    {product.images?.map( image => (
                        <img key={image.url} src={image.url} alt="" />
                    ))}                    
                </div>
                <div>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <div>
                        <div>
                            <h4>Price</h4>
                            <p>$ {product.price}</p>
                        </div>
                        <div>
                            <h4>Quantity</h4>
                            <button onClick={() => setQuantity(quantity -1)}> - </button>
                            <p> {quantity} </p>
                            <button onClick={() => setQuantity(quantity +1)}> + </button>
                        </div>
                    </div>
                <button onClick={() => addToCart()}> Add to cart</button>
                </div>
            </div>
            <div>
                <h2>Similar Products</h2>
                {productList.map(product => (
                    <div    key={product.id}
                            onClick={() => navigate(`/products/${product.id}`)}>
                        <img src={product.images?.[0].url} alt="" />
                        <h5>
                            {product.title}
                        </h5>
                        <div>
                            <h6>
                                Price
                            </h6>
                            <p>$ {product.price}</p>
                        </div>
                        <div>
                            Cart
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <p>
                    Total:
                </p>
                <p>
                    {}
                </p>
            </div>
        </div>
    );
};

export default ProductDetail;