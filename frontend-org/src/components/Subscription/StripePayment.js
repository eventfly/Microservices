import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Button from 'react-bootstrap/Button';
import {getOrgApi, getPaymentApi} from '../../api/axiosHook'


const StripePaymentModal = ({pkgData}) => {
    const STRIPE_PK = 'pk_test_51LXrGUCiOQbXltGfYZOGvMQlyWnMB2GXJItj8c5ZtQv3Tm8lkk1YHYLJJ2v92iIp6xhnOKnZuHbzCueRlLQNUipX00VD8hHMwY'

    function onToken(token)
    {
        console.log("Token", token);

        getOrgApi(localStorage.getItem('token')).post('/order', {package_id: pkgData._id}).then((res)=>{
            console.log(res.data.order)

            let order = res.data.order


            getPaymentApi(localStorage.getItem('token')).post('/org', {
                token: token.id,
                order_id: order._id
            })
            .then((res)=>{
                console.log(res.data)
    
            }).catch((err)=>{
                alert('Your stripe token is invalid')
                console.log(err)
            })


        }).catch((err)=>{
            console.log(err)
            alert('Your order is failed')
        })

    }


    return ( 

        <>

            <StripeCheckout
                token={onToken}
                stripeKey={STRIPE_PK}
            >

                <Button variant="success">Buy Package</Button>
            
            </StripeCheckout>

        
        </>

    );
}
 
export default StripePaymentModal;