import './ModifyProduct.scss'
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import CurrencyInput from 'react-currency-input-field';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const ModifyProduct = () => {
    const [data, setData] = useState([])
    const [dataFetched, setFetched] = useState(false)
    const [rawValue, setRawValue] = useState(' ');
    const [origP, setorigP] = useState(0);
    const [discP, setdiscP] = useState(0);
    const [loading, setLoading] = useState(false);
    const [modified, setModified] = useState(false);


    const titleRef = useRef(null);
    const price1Ref = useRef(null);
    const price2Ref = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() =>{
        getInfoById();
    }, []);
    

    const getInfoById = () => { 
        const productID = window.location.pathname.split('/')[3]
        const res = axios.get(process.env.REACT_APP_API_URL + "/api/product/"+productID).then(
            result => {
                console.log(result.data)
                setData(result.data.product[0]);
                setFetched(true)
            }
        )
    
      }

      const handleClick = async (event) => {
        event.preventDefault();
        setLoading(true)
        const productID = window.location.pathname.split('/')[3]
        const res = await axios.put('http://127.0.0.1:8000/api/product/modify/'+productID, 
        {
            data: {
                title: titleRef.current.value,
                price1: price1Ref.current.value.split('$')[1],
                price2: price2Ref.current.value.split('$')[1],
                desc: descriptionRef.current.value,
            }
        })
        setLoading(false);
        setModified(true);    
      }


      const validateValue1 = (value) => {
        const rawValue = value === undefined ? 'undefined' : value;
        setRawValue(rawValue || ' ');
        if(value!= undefined){setorigP(Number(rawValue))}
            
      }
    
      const validateValue2 = (value) => {
        const rawValue = value === undefined ? 'undefined' : value;
        setRawValue(rawValue || ' ');
        if(value!= undefined){setdiscP(Number(rawValue))}
            
      }
    
    
  
    return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
      {dataFetched &&
      <div className="infoContainer">
        <div className="left">
            <div className="itemDetails">
                <div className="productID">
                    <h3>Product ID: {data.id}</h3>
                </div>
                <img src={data.img[0]} style={{width:'200px', height:'200px'}} alt="Image not found..." />
            </div>
        </div>
        <div className="right">
            
            <div className="rightRight">
                <div className="formContainer">
                    <div className="inputs">
                        <form id='form' onSubmit={handleClick}>
                            
                            <div className="formInput">
                                <label>Title</label>
                                <input  type="text" ref={titleRef} required defaultValue={data.title} />
                            </div>
                            <div className="formInput">
                                <label>Price</label>
                                <CurrencyInput
                                    required
                                    ref={price1Ref}
                                    id="validation-example-2-field"
                                    defaultValue={data.price1}
                                    allowDecimals={true}
                                    onValueChange={validateValue1}
                                    prefix={'$'}
                                    step={10}
                                />
                            </div>
                            <div className="formInput">
                                <label>Sale Price (optional)</label>
                                <CurrencyInput
                                    ref={price2Ref}
                                    id="validation-example-2-field"
                                    defaultValue={data.price2}
                                    allowDecimals={true}
                                    onValueChange={validateValue1}
                                    prefix={'$'}
                                    step={10}
                                />
                            </div>
                            <div className="formInput">
                                <label>Description</label>
                                <textarea defaultValue={data.desc} ref={descriptionRef} required rows={10} cols={50} />
                            </div>
                            
                            {!modified ? 
                            <button>{loading ? 'LOADING...'                                :
                                'UPDATE LISTING'}</button>
                            :
                            <button disabled>LISTING UPDATED</button>

                            }

                        </form>
                    </div>
            </div>
            </div>
        </div>
    </div>
    }
    </div>
  </div>
  )
}

export default ModifyProduct
