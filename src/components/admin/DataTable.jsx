import './DataTable.scss'
import { DataGrid } from '@mui/x-data-grid'
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Popup from '../Popup';

const DataTable = (props) => {
  const [columnDefs, setColumnDefs] = useState([])
  const [rowData, setrowData] = useState([])
  const [modifyCode, setModifyCode] = useState(false)
  const [discountCode, setCode] = useState(null)

  const [isOpen, setIsOpen] = useState(true)


  const [dataFetched, setDataFetched] = useState(false)
  const [listType, setListType] = useState(null)
  const history = useNavigate()
  




  useEffect(() =>{
    populateDT();
  }, []);

  const viewOrderDetails = (id) => {
    history('/admin/order/'+id);
  }

  const markAsShipped = (id) => {
    history('/admin/add-shipping/'+id);
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);

  }

  const populateDT =  () => {
    const path = window.location.pathname;
    // console.log(path)
    switch (path) {
      case '/admin/list/users':
        
        setListType('USERS')
        const columns1 = [
          { field: 'id', headerName: 'ID', width: 200 },
          { field: 'firstName', headerName: 'First name', width: 130 },
          { field: 'lastName', headerName: 'Last name', width: 130 },
          { field: 'email', headerName: 'Email', width: 250},
        ];
        setColumnDefs(columns1);
        const getUsers =  () => {
          var users = []
          const res =  axios.get(process.env.REACT_APP_API_URL + '/api/users/')
          .then(response => 
          {
            users = response.data.users;
            // console.log(users)
            const rows1 =[]
            users.map(user =>{
              rows1.push(
                {
                  id: user['_id'],
                  firstName: user['firstname'],
                  lastName: user['lastname'],
                  email: user['email'],
                  }
              )
            });
            setrowData(rows1.reverse());
            setDataFetched(true);
          })
          // console.log(users)
        }
        getUsers();
        break;

      case '/admin/list/products':
        setListType('PRODUCTS')

        const clickDelete = async (id) => {
          const result = await window.confirm("Are you sure you want to delete this item?\nID "+id );
          if(result){
            console.log("You click yes!");
            // /api/product/delete/<int:id>
            const res = await axios.post(process.env.REACT_APP_API_URL + '/api/product/delete/'+id);
            window.location.reload()
          return;
        }
        };
        



        const columns2 = [
            { field: 'id', headerName: 'ID', width: 100 },
            { field: 'img', headerName: 'Image', width: 130,
              renderCell: (params) =>
              <img style={{height: 80, width:80}} src={params.value}/>

            },
            { field: 'title', headerName: 'Title', width: 200 },
            { field: 'condition', headerName: 'Condition', width: 200},
            { field: 'OriginalPrice', headerName: 'Original Price', width: 100},
            { field: 'DiscountedPrice', headerName: 'Discounted Price', width: 100},
            { field:'id2', headerName: "Action", width: 200,
                renderCell: (params)=>{
                    return (
                        <div className="cellAction">
                            <div className="viewButton" onClick={() => history('/admin/modify/'+params.value)}>Modify</div>
                            <div className="deleteButton" onClick={() => clickDelete(params.value)}>Delete</div>
  
                        </div>
                    )
                }
            }
          ];
        setColumnDefs(columns2);
        const getProducts =  () => {
          var products = []
          const res4 =  axios.get(process.env.REACT_APP_API_URL + '/api/products/all')
          .then(response => 
          {
            products = response.data.products;
            // console.log(products)
            const rows2 =[]
            products.map(product =>{
              rows2.push(
                {
                  id: product['id'],
                  id2: product['id'],

                  // img: <img style={{height: 80, width:40}} src={product['imgs'][0]}/>,
                  img: product['imgs'][0],
                  title: product['title'],
                  condition: product['condition'],
                  OriginalPrice: product['originalPrice'],
                  DiscountedPrice: product['discountedPrice'],
                }
              )
            });
            setrowData(rows2);
            setDataFetched(true);
          })
          // console.log(products)
        }
        getProducts();
        break;
     
      case '/admin/list/orders':
        setListType('ORDERS')
        const columns3 = [
            { field: 'id', headerName: 'ID', width: 100 },
            { field: 'firstName', headerName: 'First Name', width: 120 },
            { field: 'lastName', headerName: 'Last Name', width: 120},
            { field: 'email', headerName: 'Email', width: 200},
            { field: 'address', headerName: 'Billing Address', width: 150,
            renderCell: (params)=>{
              return (
                  <div >
                      <p>{params.value.line1}</p>
                      <p>{params.value.city}</p>
                      <p>{params.value.postal_code}</p>
                  </div>
              )
          }},  
          { field: 'status', headerName: 'Status', width: 120,
              renderCell: (params)=>{
                return (
                  <>
                    {params.value ? 'Shipped': 'Not Shipped'}
                  </>
                )
            }},
            { field: 'amount', headerName: 'Amount', width: 100,
              renderCell: (params)=>{
                return (
                    <div >
                        <p>{params.value / 100}</p>
                    </div>
                )
            }},
          
            { field:'isShipped', headerName: "Action", width: 140,
                renderCell: (params)=>{
                    return (
                        <div className="cellAction">

                          {params.value.shipped ? 
                          <>
                            <button 
                            className="viewButton" 
                            onClick={() => viewOrderDetails(params.value.id)}>
                              View
                            </button>
                          </>
                        :
                        <>
                          <button className="viewButton" onClick={() => markAsShipped(params.value.id)}>Mark As Shipped</button>
                          <button className="viewButton" onClick={() => viewOrderDetails(params.value.id)}>View</button>
                        </>
                        }
                            
                        </div>
                    )
                }
            }
          ];
        setColumnDefs(columns3);
        const getOrders =  () => {
          var orders = []
          const res3 =  axios.get(process.env.REACT_APP_API_URL + '/api/orders/')
          .then(response => 
          {
            orders = response.data.orders;
            // console.log(orders)
            const rows3 =[]
            // console.log(orders[0].products)
            orders.map(order =>{
              rows3.push(
                {
                  id: order['_id'],
                  // img: <img style={{height: 80, width:40}} src={order['imgs'][0]}/>,
                  firstName: order['firstName'],
                  lastName: order['lastName'],
                  email: order['email'],
                  amount: order['amount'],
                  address: order.billingAddress,
                  isShipped: {shipped: order['isShipped'], id: order['_id']},
                  status: order['isShipped'],
                }
              )
            });
            setrowData(rows3.reverse());
            setDataFetched(true);
          })
          // console.log(orders)
        }
        getOrders();
        break;
      
      case '/admin/list/shipping':
        setListType('SHIPPING')
      const columns4 = [
          { field: 'id', headerName: 'Order ID', width: 100 },
          { field: 'email', headerName: 'Email', width: 200},
          { field: 'address', headerName: 'Billing Address', width: 150,
          renderCell: (params)=>{
            return (
                <div >
                    <p>{params.value.line1}</p>
                    <p>{params.value.city}</p>
                    <p>{params.value.postal_code}</p>
                </div>
            )
        }},
        { field: 'carrier', headerName: 'Carrier', width: 200},
        { field: 'trackingNum', headerName: 'Tracking Number', width: 200},  
        { field: 'date', headerName: 'Date Shipped', width: 120},
        ];
      setColumnDefs(columns4);
      const getShipping =  () => {
        var shipped = []
        const res4 =  axios.get(process.env.REACT_APP_API_URL + '/api/shipping/')
        .then(response => 
        {
          shipped = response.data.shipped;
          console.log(shipped)
          const rows4 =[]
          shipped.map(order =>{
            rows4.push(
              {
                id: order['orderID'],
                email: order['email'],
                address: order.billingAddress,
                carrier: order['carrier'],
                trackingNum: order['trackingNumber'],
                date: order['date'],

              }
            )
          });
          setrowData(rows4.reverse());
          setDataFetched(true);
        })
        // console.log(shipped)
      }
      getShipping();
      break;
      
      case '/admin/discounts':
        setListType('CURRENT ACTIVE CODES')

        const clickDeleteCode = async (code) => {
          const result = await window.confirm("Are you sure you want to delete this discount code?");
          if(result){
            const res = await axios.post(process.env.REACT_APP_API_URL + '/api/code/delete/'+code);
            window.location.reload()
          return;
        }
        };
        



        const columns5 = [
            { field: 'id', headerName: 'ID', width: '100' },
            { field: 'code', headerName: 'Code', width: '250' },
            { field: 'discount', headerName: 'Discount', width: '250',
              renderCell: (params) =>
              <p>{params.value}%</p>

            },
            { field:'code2', headerName: "Action", width: '250',
                renderCell: (params)=>{
                    return (
                        <div className="cellAction">
                            {/* NOTE CREATE VIEW!!!! */}
                            <div className="viewButton" onClick={() => {
                              setModifyCode(true);
                              setCode(params.value);                              
                              }}>Modify</div>
                            <div className="deleteButton" onClick={() => clickDeleteCode(params.value)}>Delete</div>
  
                        </div>
                    )
                }
            }
          ];
        setColumnDefs(columns5);
        const getCodes =  () => {
          var codes = []
          const res4 =  axios.get(process.env.REACT_APP_API_URL + '/api/codes/all')
          .then(response => 
          {
            codes = response.data.codes;
            const rows5 =[]
            codes.map(code =>{
              rows5.push(
                {
                  code: code['code'],
                  code2: code['code'],
                  discount: code['discount'],
                  id: code['id'],
                }
              )
            });
            setrowData(rows5);
            setDataFetched(true);
          })
        }
        getCodes();
        break;
     
      default:
        break;
    }


  }




  return (
    <div className="datatable">
      {modifyCode && isOpen &&
      <Popup isModifyCodeForm={true} code={discountCode} handleClose={() => togglePopup()} content={<>
        <h1>Modify Your Discount Code.</h1>
      </>}/>
      }
      {dataFetched &&
      <>
        <h1>{listType}</h1>
          <DataGrid
          rows={rowData}
          rowHeight={100}
          columns={columnDefs}
          pageSize={9}
        />
      </>
    }
    </div>
  )
}

export default DataTable
