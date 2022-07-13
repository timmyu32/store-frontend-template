import './NewItem.scss'
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import { useEffect, useState, useRef } from 'react'; 
import 'react-multi-email/style.css';
import axios from 'axios';
import CurrencyInput from 'react-currency-input-field';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT7IEEJsd3fviqyZMlvE64XCnpSvQZWNs",
  authDomain: "uihdepop.firebaseapp.com",
  projectId: "uihdepop",
  storageBucket: "uihdepop.appspot.com",
  messagingSenderId: "344853842696",
  appId: "1:344853842696:web:98b399c50a07f32842babd",
  measurementId: "G-VG4Z31704N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
///////////////

const NewItem = () => {
  const noImgURL = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
  const [colours, setColours] = useState([]);
  const [styles, setStyles] = useState([]);
  const [img1, setImg1] = useState(noImgURL);
  const [img2, setImg2] = useState(noImgURL);
  const [img3, setImg3] = useState(noImgURL);
  const [img4, setImg4] = useState(noImgURL);
  const [rawValue, setRawValue] = useState(' ');
  const [origP, setorigP] = useState(0);
  const [discP, setdiscP] = useState(null);
  const [firebaseImgURL1, setFirebaseImgURL1] = useState([])
  const [firebaseImgURL2, setFirebaseImgURL2] = useState([])
  const [firebaseImgURL3, setFirebaseImgURL3] = useState([])
  const [firebaseImgURL4, setFirebaseImgURL4] = useState([])

  const [fileName1, setFileName1] = useState(null);
  const [fileName2, setFileName2] = useState(null);
  const [fileName3, setFileName3] = useState(null);
  const [fileName4, setFileName4] = useState(null);

  const [productLive, setProductLive] = useState(false)
  const [prodID, setID] = useState(null)

  const [uploading, setUploading] = useState(false)


  const [file1, setfile1] = useState(null);
  const [file2, setfile2] = useState(null);
  const [file3, setfile3] = useState(null);
  const [file4, setfile4] = useState(null);

  const [firebasePaths, setFirebasPaths] = useState([])



  const titleRef = useRef(null);
  const conditionRef = useRef(null);
  const brandRef = useRef(null);
  const sizeRef = useRef(null);
  const descriptionRef = useRef(null);

  const onImageChange1 = (e) => {
    const [file] = e.target.files;
    setfile1(file);
    try {
      setImg1(URL.createObjectURL(file));
      setFileName1(new Date().getTime() + file.name)
      

    } catch (error) {
      setImg1(noImgURL)
    }
  };

  const onImageChange2 = (e) => {
    const [file] = e.target.files;
    setfile2(file);

    try {
      setImg2(URL.createObjectURL(file));
      setFileName2(new Date().getTime() + file.name);
    } catch (error) {
      setImg1(noImgURL)
    }
  };

  const onImageChange3 = (e) => {
    const [file] = e.target.files;
    setfile3(file);

    try {
      setImg3(URL.createObjectURL(file));
      setFileName3(new Date().getTime() + file.name)
    } catch (error) {
      setImg1(noImgURL)
    }
  };

  const onImageChange4 = (e) => {
    const [file] = e.target.files;
    setfile4(file);

    try {
      setImg4(URL.createObjectURL(file));
      setFileName4(new Date().getTime() + file.name)
     } catch (error) {
      setImg1(noImgURL)
    }
  };

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



  const handleSubmit =  async (event) => {
    event.preventDefault();
    if(img1 == 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'){
      alert('Please Select at least 1 image');
      return 
    }
    setUploading(true);
    const id = Math.round(Math.random() * 100000000000)
    setID(id);

    const imgs = []

    if(img1 != noImgURL){
      const storage = getStorage(app);
      const storageRef = ref(storage, id + '/P1_' + fileName1);
      setFirebasPaths(firebasePaths.push(id + '/P1_' + fileName1))
      await uploadBytes(storageRef, file1).then(async (snapshot) => {
       await getDownloadURL(snapshot.ref).then(res =>{imgs.push(res)})
      });
    }
    if(img2 != noImgURL){
      const storage = getStorage(app);
      const storageRef = ref(storage, id + '/P2_' +  fileName2);
      setFirebasPaths(firebasePaths.push(id + '/P2_' + fileName2))

      await uploadBytes(storageRef, file2).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(res =>{imgs.push(res)})
      });
    }
    if(img3 != noImgURL){
      const storage = getStorage(app);
      const storageRef = ref(storage, id + '/P3_' + fileName3);
      setFirebasPaths(firebasePaths.push(id + '/P3_' + fileName3))

      await uploadBytes(storageRef, file3).then(async (snapshot)  => {
        await getDownloadURL(snapshot.ref).then(res =>{imgs.push(res)})
      });
    }
    if(img4 != noImgURL){
      const storage = getStorage(app);
      const storageRef = ref(storage, id + '/P4_' + fileName4);
      setFirebasPaths(firebasePaths.push(id + '/P4_' + fileName4))

      await uploadBytes(storageRef, file4).then(async (snapshot) => {
       await getDownloadURL(snapshot.ref).then(res =>{imgs.push(res)})
      });

    }

    
    const data = {
      ID: id.toString(),
      Title: titleRef.current.value.trim(),
      OriginalPrice: origP,
      DiscountedPrice: discP,
      Condition: conditionRef.current.value.trim(),
      Brand: brandRef.current.value.trim(),
      Colour: colours,
      Style: styles,
      Size: sizeRef.current.value.trim(),
      Description: descriptionRef.current.value.substring(0,250).trim(),
      Images: imgs,
      firebasePaths: firebasePaths,
      isSold: false,
      
    }
    const timestamp = new Date().getTime()
    const res = axios.post(process.env.REACT_APP_API_URL + "/api/product/create",
      {ID:id.toString(), data: data, Timestamp: timestamp}
    ).then(result => {
      setUploading(false);
      setProductLive(true);
      }  
    )
  
    
    ///api/product/create

  }


  return (
    <div className="newItem">      
      <Sidebar/>
      <div className="newItemContainer">
      <Navbar/>

        
        <div className="top">
        <h1 className="title">Add New Item</h1>
        </div>
        <div className="bottom">
          <div className="bottomLeft">
            <img src={img1} alt="Error Loading Image" />
            <img src={img2} alt="Error Loading Image" />
            <img src={img3} alt="Error Loading Image" />
            <img src={img4} alt="Error Loading Image" />
            <h3>Choose up to 4 High-Definition square photos</h3>
            <div className="fileInput">
              <span><label>1 </label><input required type="file" onChange={onImageChange1} accept="image/*" /></span>
              <span><label>2 </label><input required type="file" onChange={onImageChange2} accept="image/*" /></span>
              <span><label>3 </label><input type="file" onChange={onImageChange3} accept="image/*" /></span>
              <span><label>4 </label><input type="file" onChange={onImageChange4} accept="image/*" /></span>
            </div>
          </div>
          <div className="bottomRight">
            <form onSubmit={handleSubmit}>
              
              <div className="formInput">
                <label>Title</label>
                <input required ref={titleRef} type="text" />
              </div>

              <div className="formInput">
              <label htmlFor="validation-example-2-field">Price</label>
              <CurrencyInput
                required
                id="validation-example-2-field"
                placeholder="$12.34"
                allowDecimals={true}
                onValueChange={validateValue1}
                prefix={'$'}
                step={10}
              />
              </div>
              <div className="formInput">
              <label htmlFor="validation-example-2-field2">Sale Price (optional)</label>
              <CurrencyInput
                id="validation-example-2-field2"
                placeholder="$12.34"
                allowDecimals={true}
                onValueChange={validateValue2}
                prefix={'$'}
                step={10}
              />
              </div>
              
              <div className="formInput">
                <label>Condition</label>
                <input required ref={conditionRef} type="text" placeholder='Ex. Used, New, Like New...' />
              </div>
              <div className="formInput">
                <label>Brand</label>
                <input required ref={brandRef} type="textbox" placeholder="Ex. Nike, Levi's, Carhart..." />
              </div>
              <div className="formInput">
                <label>Colour(s)</label>
                <>
                <ReactMultiEmail
                  required
                  className='customInput'
                  placeholder="Colours"
                  colours={colours}
                  onChange={(_colours) => {
                    setColours(_colours);
                  }}
                  validateEmail={colour => {
                    return colour.length > 2 && colour != 'undefined'; // return boolean
                  }}
                  getLabel={(
                    colour,
                    index,
                    removeEmail,
                  ) => {
                    return (
                      <div data-tag key={index}>
                        {colour}
                        <span data-tag-handle onClick={() => removeEmail(index)}>
                          x
                        </span>
                      </div>
                    );
                  }}
                />
              </>
              </div>
              <div className="formInput">
                <label>Style(s)</label>
                  <>
                    <ReactMultiEmail
                      required
                      className='customInput'
                      placeholder="Style(s)"
                      styles={styles}
                      onChange={(_styles) => {
                        setStyles(_styles);
                      }}
                      validateEmail={styles => {
                        return styles.length > 2 && styles != 'undefined'; // return boolean
                      }}
                      getLabel={(
                        styles,
                        index,
                        removeEmail,
                      ) => {
                        return (
                          <div data-tag key={index}>
                            {styles}
                            <span data-tag-handle onClick={() => removeEmail(index)}>
                              x
                            </span>
                          </div>
                        );
                      }}
                    />
                  </>
              </div>
              <div className="formInput">
                <label>Size</label>
                <input ref={sizeRef} type="textbox"/>
              </div>
              <div className="formInput">
                <label>Description</label>
                <textarea required ref={descriptionRef} rows={10} cols={50} placeholder='Max 250 characters ' />
              </div>
              {productLive && <h3>Product ID: {prodID}</h3>}
              {productLive? <button disabled style={{cursor:'not-allowed'}}>YOUR ITEM IS LISTED!</button> :<button style={uploading? {cursor:'not-allowed'}: {cursor:'pointer'}} >{uploading ? 'Uploading...':'List Your Item' }</button>}
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewItem
