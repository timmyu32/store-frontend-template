import './Navbar.scss'
import { BiSearchAlt2 } from "react-icons/bi";
import { MdNotificationsActive } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaClipboardList, FaBalanceScale } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [numOrders, setNumOrders] = useState(null)
    const [numMessages, setNumMessages] = useState(null)

    
    
    useEffect(() =>{
        fetchData();
    }, []);


    const fetchData = async () => {
        const res1 = await axios.get(process.env.REACT_APP_API_URL + "/api/orders/unshipped/count").then(result => {
            setNumOrders(result.data.count);
        })

    }
    
  return (
    <div className='Navbar'>
        <div className="wrapper">
            <div className="search">
                {/* <input type="text" placeholder='Search'/>
                <BiSearchAlt2 className="icon"/> */}
            </div>

            <div className="items">
                <Link to='/admin/list/orders'>
                    <div className="item">
                        <FaClipboardList color='#7451f8' className="icon"/>
                        {numOrders != 0  && <div className="counter">{numOrders}</div>}
                    </div>
                </Link>
                {/* <div className="item">
                    <FiMessageSquare className="icon"/>
                    {numMessages && <div className="counter">{numMessages}</div>}
                    
                </div> */}

                {/* <div className="item">
                    <AiOutlineUnorderedList className="icon"/>
                </div> */}
            </div>

        </div>
      
    </div>
  )
}

export default Navbar
