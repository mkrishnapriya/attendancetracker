import React, { useEffect } from 'react'
import {useForm} from "react-hook-form"
import { Form, Button } from "react-bootstrap"
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {userLogin} from '../../slices/userSlice'
import { useNavigate } from 'react-router'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  let {userObj, isError, isLoading, isSuccess, errMsg}=useSelector(state=>state.user)
  let dispatch = useDispatch();
  
  //get navigate function to navigate programatically
  let navigate = useNavigate();
  
  const onFormSubmit = (userCredObj) => {
    //console.log(userCredObj)
    dispatch(userLogin(userCredObj))
  }

  useEffect(()=>{
    if (isSuccess){
      navigate("/StudentHome")
    }
  }, [isSuccess, isError])

  return (
    <div>
       <div>
      <Form className='mx-auto mt-3 w-50' onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username"
              {...register("username", {required:true})} />
              {errors.usernme&&<p className='text-danger'>Username is required</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
          {...register("password", {required:true})} />
          {errors.password&&<p className='text-danger'>Password is required</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
    </div>
  )
}

export default Login