import './Sidebar.scss'
import { MdDashboard, MdLocalShipping, MdNotificationsActive, MdSettings, MdOutlineAddCircle } from "react-icons/md";
import { FaUsers, FaClipboardList } from "react-icons/fa";

import { IoShirtSharp } from "react-icons/io5";
import { IoAnalyticsOutline, IoStorefrontSharp } from "react-icons/io5";

import { BsHeartFill } from "react-icons/bs";

import { GiNotebook } from "react-icons/gi";

import { CgProfile } from "react-icons/cg";

import { ImBarcode } from "react-icons/im";
import { RiLogoutBoxRFill } from "react-icons/ri";

import { Link } from "react-router-dom";





const Sidebar = () => {
  return (
    <div className='Sidebar'>
        <div className="top">
            <span className="logo">Shmy</span>
        </div>
        <hr  className="icon"/>
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link to='/admin'>
                    <li>
                        <MdDashboard  className="icon"/>
                        <span>Dashboard</span>
                    </li>
                </Link>
                <Link to='/'>
                    <li>
                    
                        <IoStorefrontSharp  className="icon"/>
                        <span>Store Front</span>
                    </li>
                </Link>
                <p className="title">REPORTS</p>
                <Link to='/admin/redirect/users'>
                    <li>
                        <FaUsers className="icon"/>
                        <span>Users</span>
                    </li>
                </Link>
                <Link to='/admin/redirect/products'>
                    <li>
                        <IoShirtSharp className="icon"/>
                        <span>Products</span>
                    </li>
                </Link>
                <Link to='/admin/redirect/orders'>
                    <li>
                        <FaClipboardList className="icon"/>
                        <span>Orders</span>
                    </li>
                </Link>
                <Link to='/admin/redirect/shipping'>
                    <li>
                        <MdLocalShipping className="icon"/>
                        <span>Shipping</span>
                    </li>
                </Link>
                {/* <p className="title">USEFUL</p>
                <li>
                    <IoAnalyticsOutline className="icon"/>
                    <span>Stats</span>
                </li>
                <li>
                    <MdNotificationsActive className="icon"/>
                    <span>Notifications</span>
                </li> */}
                <p className="title">USER</p>
                <Link to='/admin/new-item'>
                    <li>
                        <MdOutlineAddCircle className="icon"/>
                        <span>New Listing</span>
                    </li>
                </Link>
                <Link to='/admin/discounts'>
                    <li>
                        <ImBarcode className="icon"/>
                        <span>Discount Codes</span>
                    </li>
                </Link>
                <li>
                    <RiLogoutBoxRFill className="icon"/>
                    <span>Logout</span>
                </li>

                {/* <li>
                    <GiNotebook className="icon"/>
                    <span>Logs</span>
                </li>
                <li>
                    <MdSettings className="icon"/>
                    <span>Settings</span>
                </li>
                <p className="title">USER</p>
                <li>
                    <CgProfile className="icon"/>
                    <span>Profile</span>
                </li> */}
                
            </ul>
        </div>

      
    </div>
  )
}

export default Sidebar
