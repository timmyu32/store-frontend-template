import './SingleItem.scss'
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import Chart from '../../components/admin/Chart';
import DataTable from '../../components/admin/DataTable';

const SingleItem = () => {
  return (
    <div className="singleItem">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="top">
          <div className="topLeft">
            <div className="editButtom">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/divhtybtltxjtyhhq2i5/sportswear-club-mens-t-shirt-ShrJfX.png" alt="no photo available" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">5086638436</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">300 Babcock Street, Boston MA 02215</span>
                </div>
              </div>
            </div>
          </div>
          <div className="topRight">
            <Chart aspect={3/1} chartTitle='some user data'/>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Recent Transactions</h1>
          <DataTable/>
        </div>
      </div>
    </div>
  )
}

export default SingleItem
