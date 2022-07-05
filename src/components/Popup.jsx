import { useRef, useState } from 'react';
import axios from 'axios';
import './Popup.scss';

const Popup = (props) => {
  const discountRef = useRef(null);
  const [dataFetched, setFetched] = useState(false)
  const [error, setError] = useState(false)



  const handleClick = (event) => {
    event.preventDefault();
    if (discountRef.current.value == null || undefined){
      setError(true);
      return;
    } 

    const res = axios.put(process.env.REACT_APP_API_URL + "/api/code/edit/"+parseInt(discountRef.current.value),

      {
        code: props.code
      }

    ).then(result => {
      setFetched(true);
      window.location.reload()
  }).catch(error => {
    setError(true);
  })
     
  }

  return (
    <div className="popup-box">
      <div className="box">
        <p className="close-icon" onClick={props.handleClose}>x</p>
        {props.content}
        {props.isModifyCodeForm ? <>
        
          <form id='form' onSubmit={handleClick}>
                                    
            <div className="formInput">
                <label>Code</label>
                <input type="text" value={props.code} />
            </div>
            <div className="formInput">
                <label>Savings Percentage</label>
                <input ref={discountRef} type="text" placeholder='Ex. 10' style={{width:'146px'}} />
            </div>
            <div className="button">
                {dataFetched ? <span>Code updated!</span> : <button>UPDATE COUPON DISCOUNT CODE</button>}
                {error ? <span style={{color:'red'}}>Something went wrong...</span> : <></>}
                
            </div>

          </form>
        
          
        
        
        </>:<></>}
      </div>
    </div>
  )
}

export default Popup
