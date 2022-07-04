import './NewDiscount.scss';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { MdLocalShipping } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ImBarcode } from "react-icons/im";
import DataTable from '../../components/admin/DataTable';

const NewDiscount = () => {
    const [dataFetched, setFetched] = useState(false)
    const codeRef = useRef(null);
    const discountRef = useRef(null);
  
    const handleClick = (event) => {
        event.preventDefault();
        
            const orderID = window.location.pathname.split('/')[3]
            const res = axios.post(process.env.REACT_APP_API_URL + "/api/code/",
            {
                code: codeRef.current.value,
                discount: discountRef.current.value,

            }
            ).then(result => {
                setFetched(true);
            })
            
   
    
      }
    

  return (
    <div className="newDiscount">
        <Sidebar/>
        <div className="container">
            <Navbar/>
            <div className="top">
                <div className="topLeft">
                    <div className="title">
                        <h2>CREATE A NEW DISCOUNT CODE</h2>
                        <h4>It only takes a few seconds!</h4>
                        <div className="icon">
                            <ImBarcode size={150}/>
                        </div>
                    </div>
                </div>
                <div className="topRight">
                <div className="formContainer">
                            <div className="inputs">
                                <form id='form' onSubmit={handleClick}>
                                    
                                    <div className="formInput">
                                        <label>Code</label>
                                        <input ref={codeRef} type="text" placeholder='Ex: VINTAGE2022...' />
                                    </div>
                                    <div className="formInput">
                                        <label>Savings Percentage</label>
                                        <input ref={discountRef} type="text" placeholder='Ex: 10' style={{width:'146px'}} />
                                    </div>
                                    <div className="button">
                                        {dataFetched ? <span>Code successfully published!</span> : <button>PUBLISH COUPON DISCOUNT CODE</button>}
                                        
                                    </div>

                                </form>
                            </div>
                    </div>
                </div>
            </div>

            <div className="bottom">
                <div className="table">
                    <DataTable/>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewDiscount
