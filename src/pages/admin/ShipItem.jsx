import './ShipItem.scss';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { MdLocalShipping } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";


const ShipItem = () => {
  const [data, setData] = useState([])

  const [error, setError] = useState(false)

  const [dataFetched, setFetched] = useState(false)
  const carrier = useRef(null);
  const trackingNum1 = useRef(null);
  const trackingNum2 = useRef(null);

  const [marked, setMarked] = useState(false)



  useEffect(() =>{
    getInfoById();
}, []);



  const getInfoById = () => { 
    const orderID = window.location.pathname.split('/')[3]
    const res = axios.get(process.env.REACT_APP_API_URL + "/api/order/"+orderID).then(
        result => {
            setData(result.data.order);
            setFetched(true)
        }
    )

  }

  const newShipped = () => {
    const res = axios.post(process.env.REACT_APP_API_URL + '/api/shipping/',
    {
        orderID: data['_id'],
        email: data.email,
        billingAddress: data.billingAddress,
        carrier: carrier.current.value,
        trackingNumber: trackingNum1.current.value,
    }).then(result => {
        setError(false)
        setMarked(true)
    }
        
    )
  }

  const handleClick = (event) => {
  

    if (trackingNum1.current.value == trackingNum2.current.value && trackingNum1.current.value.length > 0) {
        
        const orderID = window.location.pathname.split('/')[3]
        const res = axios.put(process.env.REACT_APP_API_URL + "/api/order/edit/"+orderID).then(result => {
            newShipped();
        })
        
    }else{
        setError(true)
    }
    event.preventDefault();

  }






  return (
    <div className="shipItem">
        <Sidebar/>
        <div className="container">
            <Navbar/>
            {dataFetched && <div className="infoContainer">
            
           
                <div className="left">
                    <div className="itemDetails">
                        <div className="orderID">
                            <h3>ORDER ID: {data['_id']}</h3>
                        </div>
                        <h5>Shipping Label</h5>
                        <p className="name">{data.firstName} {data.lastName}</p>
                        <div className="address">
                            <p>{data.billingAddress.line1}</p>
                            <p>{data.billingAddress.city}</p>
                            <p>{data.billingAddress.postal_code}</p>
                        </div>


                    </div>
                </div>
                <div className="right">
                    <div className="rightLeft">

                        {marked ? <BsFillCheckCircleFill size={'3x'} color='#7451f8'/> : <MdLocalShipping size={'3x'} color='#7451f8' />}
                        
                    </div>
                    <div className="rightRight">
                        <div className="formContainer">
                            {marked && <h3 >Marked As Shipped!</h3>}
                            <div className="inputs">
                                <form id='form' onSubmit={handleClick}>
                                    
                                    <div className="formInput">
                                        <label>Shipping Carrier</label>
                                        <input ref={carrier} type="text" placeholder='Ex: FedEx, USPS, UPS...' />
                                    </div>
                                    <div className="formInput">
                                        <label>Tracking Number</label>
                                        <input ref={trackingNum1} type="text" placeholder='Ex: 1234567890' />
                                    </div>
                                    <div className="formInput">
                                        <label>Tracking Number</label>
                                        <input ref={trackingNum2} type="text" placeholder='Confirm Tracking Number' />
                                    </div>
                                    {error &&
                                    <p style={{color: 'red'}}>Tracking Numbers do not match</p>}
                                    <button>MARK AS SHIPPED AND NOTIFY BUYER</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            


        </div>
    </div>
  )
}

export default ShipItem
