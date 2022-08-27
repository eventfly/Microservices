import {Table, Accordion} from 'react-bootstrap';
import FormTitle from '../../Form/FormTitle';
// import { useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react'
import {getOrgApi} from '../../../api/axiosHook'


const BillingDetails = ({orgPackage}) => {

    // const location = useLocation()
    // const { orgPackage } = location.state

    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState(null)

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }


    const events = []
    for(let i = 0; i < 10; i++){
        events.push(i)
    }


    useEffect(() => {

        if(loading == false && auth && auth.ref_id){

            getOrgApi(localStorage.getItem('token')).get(`/${auth.ref_id}/biling-details`).then((res)=>{
                console.log(res.data)

                setOrders([...res.data.orders])

            }).catch((err)=>{
                console.log(err)
            })


            setLoading(true)
        }


    }, [loading, orders, auth])

    const dateFormatter = (dateISO) =>{
        let date = new Date(dateISO)
        let dateStr = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()

        let expDate = new Date(date.setMonth(date.getMonth()+12))
        dateStr = dateStr + ' to ' + expDate.getDate() + '/' + (expDate.getMonth()+1) + '/' + expDate.getFullYear()

        return dateStr
    }
    
    const getCreationDate = (dateISO) =>{
        let date = new Date(dateISO)
        let dateStr = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
        dateStr = dateStr + '\n' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

        return dateStr
    }
    
    const getNextBillingDate = (dateISO) =>{
        let date = new Date(dateISO)
        let expDate = new Date(date.setMonth(date.getMonth()+12))
        let dateStr = expDate.getDate() + '/' + (expDate.getMonth()+1) + '/' + expDate.getFullYear()
        dateStr = dateStr + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

        return dateStr
    } 


    return ( 
        <div className="profile">
            <FormTitle title="Billing Details" />
            <Accordion style={{
                marginTop: '4rem',
                marginBottom: '4rem',
                marginLeft: '1.5%',
                marginRight: '-1.5%'
            }}>

                <Accordion.Item eventKey="0">
                    <Accordion.Header>Your Plan</Accordion.Header>
                    <Accordion.Body>
                    <p>{orgPackage ? orgPackage.name : ''}</p>
                    <p>{orgPackage ? orgPackage.price : ''} BDT/Month</p>
                    </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Next Billing Date</Accordion.Header>
                    <Accordion.Body>
                    {orders ? getNextBillingDate(orders[orders.length-1].created_at) : ''}
                    </Accordion.Body>
                </Accordion.Item>
            
            </Accordion>

            <Table style ={{ textAlign: "center", margin:'3rem 1rem'}} striped bordered hover >
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Package</th>
                    <th>Order Id</th>
                    <th>Transaction Id</th>
                    <th>Service Period</th>
                    <th>Payment Method</th>
                    <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                {
                    (
                        orders && orders.map((item, index) =>{

                            return (
                                <tr key={index}>
                                    <td>{getCreationDate(item.created_at)}</td>
                                    <td>{item.package_id.name}</td>
                                    <td>{item._id}</td>
                                    <td>{item.transaction_id}</td>
                                    <td>{dateFormatter(item.created_at)}</td>
                                    <td>Visa</td>
                                    <td>{item.total_price} BDT</td>
                                </tr>
        
                                );
                        })
                    ) 
                }
                </tbody>
            </Table>
        </div>
     );
}
 
export default BillingDetails;