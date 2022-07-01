import './OrderDetails.scss';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid'

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field:'action',
        headerName: "Action",
        width: 200,
        renderCell: ()=>{
            return (
                <div className="cellAction">
                    <div className="viewButton">View</div>
                    <div className="deleteButton">Delete</div>
                </div>
            )
        }
    }
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];


const OrderDetails = () => {
  const [dataFetched, setFetched] = useState(false)
  const [data, setData] = useState([])
  const [columnDefs, setColumnDefs] = useState([])
  const [rowData, setrowData] = useState([])


    useEffect(() =>{
        getOrderDetails();
    }, []);


    const getOrderDetails = () => {
        const orderID = window.location.pathname.split('/')[3]
        console.log(orderID)
        const res = axios.get(process.env.REACT_APP_API_URL + "/api/order/"+orderID).then(
        result => {
            setData(result.data.order);
            const columns1 = [
                { field: 'id', headerName: 'PRODUCT ID', width: 200 },
                { field: 'img', headerName: 'Image', width: 130,
                    renderCell: (params) =>
                    <img style={{height: 80, width:80}} src={params.value}/>

                },
                { field: 'title', headerName: 'Title', width: 600 },
              ]
            setColumnDefs(columns1)
            const rows2 =[]
            console.log(result.data.order.products)
            result.data.order.products.map(product =>{
                rows2.push(
                        {
                        id: product['id'],
                        img: product['img'],
                        title: product['title'],
                        }
                    )
                }   
            );
            setrowData(rows2);
            setFetched(true);


        }
    )

    }



  return (
    <div className='oderDetails'>
      <Sidebar/>
      <div className="container">
        <Navbar/>
        <div className="datatable">
      {dataFetched &&
      <><h1>ORDER ID: {data['_id']}</h1>
            <DataGrid
            rows={rowData}
            rowHeight={100}
            columns={columnDefs}
            pageSize={9}
        />
      </>
     } 
    </div>
        </div>
    </div>
  )
}

export default OrderDetails
