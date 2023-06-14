import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon  } from '../assets/svg/keyboardArrowRightIcon.svg'
import VisibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { db } from '../firebase.config'
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import OAuth from '../components/OAuth'


function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:''
  })

  const {email,password,name} = formData
  const navigate = useNavigate()

  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) =>{
    e.preventDefault()
    try{
      const auth = getAuth()
      const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
      const user = userCredentials.user


      updateProfile(auth.currentUser,{
        displayName:name
      })

      // Adding Data To Firestore
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db,'users',user.uid),formDataCopy)

      navigate('/')
    }catch(error){
      console.log(error);
      toast.error('Something Went Wrong')
    }
  }



  return (
    <>
      <div className="pageContainer">
        <header>
          <p className='pageHeader'>
            Welcome
          </p>
        </header>
        
          <form onSubmit={onSubmit}>
          <input 
            type="name" 
            className='nameInput' 
            placeholder='Name' 
            id='name' 
            value={name}
            onChange={onChange}
            />
            <input 
            type="email" 
            className='emailInput' 
            placeholder='Email' 
            id='email' 
            value={email}
            onChange={onChange}
            />
            {/*Password Input Field */}
            <div className="passwordInputDiv">
              <input 
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
              />

              <img 
              src={VisibilityIcon}
              className='showPassword'
              alt='Show Password'
              onClick={()=>
              setShowPassword((prevState)=> !prevState)
              }
              />
            </div>
            <Link 
            to='/forgot-password' 
            className='forgotPasswordLink'>
              Forgot Password
            </Link>
            <div className="signUpBar">
              <p className='signUpText'>
                Sign Up
              </p>
              <button className='signUpButton'>
                <ArrowRightIcon fill='#ffffff' 
                width='34px'
                height='34px'  />
              </button>
            </div>
          </form>
          <Link to='/sign-in' className='registerUpLink'>
          Sign In  Instead
          </Link>
          <OAuth/>
        
        
      </div>
    </>
  )
}

export default SignUp