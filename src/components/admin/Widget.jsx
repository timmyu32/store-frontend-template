import './Widget.scss'

import { CgProfile } from "react-icons/cg";
import { FaClipboardList, FaBalanceScale } from "react-icons/fa";
import axios from 'axios'
import { MdAttachMoney } from "react-icons/md";
import { useRef, useState } from 'react';


const Widget = ({type}) => {
    let data;

    //temp
    // const amount = 1231
    const [amount, setAmount] = useState(1234);
    const [dataFetched, setDataFetched] = useState(false)
    const [isOrders, setIsOrders] = useState(false);

    switch(type){
        case "user":
            const res1 = axios.get(process.env.REACT_APP_API_URL + "/api/users/count").then(result => {
                setAmount(result.data.count)
                setDataFetched(true);

            })
            data = {
                title: 'USERS',
                isMoney: false,
                link: 'See all users',
                icon: <CgProfile className='icon'/>
            };
            break;
            case "order":
            const res2 = axios.get(process.env.REACT_APP_API_URL + "/api/orders/unshipped/count").then(result => {
                setAmount(result.data.count);
                setIsOrders(true)
                setDataFetched(true);
            })
            data = {
                title: 'ORDERS (unshipped)',
                isMoney: false,
                link: 'See all orders',
                icon: <FaClipboardList className="icon"/>
            };
            break;
            case "earnings":
            const res3 = axios.get(process.env.REACT_APP_API_URL + "/api/total-earnings").then(result => {
                setAmount(result.data.earnings);
                setDataFetched(true);
            })
            data = {
                title: 'EARNINGS (total)',
                isMoney: true,
                link: 'Total Earnings',
                icon: <MdAttachMoney className='icon'/>
            };
            break;
            case "balance":
            const res4 = axios.get(process.env.REACT_APP_API_URL + "/api/strpe/balance/").then(result => {
                setAmount(result.data.pending_balance);
                setDataFetched(true);
            })

            data = {
                title: 'BALANCE (pending)',
                isMoney: true,
                link: '*Bank account payouts are on a rolling 2-day basis',
                icon: <FaBalanceScale className='icon'/>
            };
            break;
            default:
                break;
    }


  return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            {dataFetched && <span className="counter">{data.isMoney && "$"}{amount}</span>}
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage positive">
                .
            </div>
            {data.icon}
        </div>

    </div>
  )
}

export default Widget
