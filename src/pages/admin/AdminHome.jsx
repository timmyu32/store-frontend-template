import './AdminHome.scss';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import Widget from '../../components/admin/Widget';
import FeaturedChart from '../../components/admin/FeaturedChart';
import Chart from '../../components/admin/Chart';
import TableComponent from '../../components/admin/Table';
import { Link } from "react-router-dom";
import { useEffect } from 'react';


const AdminHome = () => {

  useEffect(() =>{
    window.scroll(0,0)
  }, []) ;

  return (
    <div className='adminHome'>
      <Sidebar/>
      <div className="homeContainer">
        <Navbar/>
        <div className="widgets">
          <Link to="/admin/list/users">
            <Widget type="user"/>
          </Link>
          <Link to="/admin/list/orders">
            <Widget type="order"/>
          </Link>
          {/* <Link to=""> */}
            <Widget type="earnings"/>
          {/* </Link> */}
          {/* <Link to=""> */}
            <Widget type="balance"/>
          {/* </Link> */}
        </div>
        <div className="charts">
          <FeaturedChart/>
          <Chart aspect={2/1} chartTitle='Daily Visits (Coming Soon)'/>
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <TableComponent/>
        </div> */}
      </div>
    </div>
  )
}

export default AdminHome
