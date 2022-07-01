import './Redirect.scss'
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const Redirect = () => {
    const {listType} = useParams();
    const history = useNavigate();

    useEffect(() =>{
        history('/admin/list/'+listType);
      }, []) ;


  return (
    <div className="redirect">
      <Sidebar/>
      <div className="container">
        <Navbar/>
        <div className="loader">
        
        </div>
      </div>
    </div>
  )
}

export default Redirect
