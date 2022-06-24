import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import {useNavigate} from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import axios from 'axios'

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  let [img, setImg] = useState(null)

  const onImageSelect = (event) => {

    setImg(event.target.files[0])
    //console.log(event.target.files[0])
    console.log(event)
  }

  const navigate = useNavigate()

  const onFormSubmit = (userObj) => {
    //create formData obj
    let formData = new FormData();
    //append values to it
    formData.append("userObj", JSON.stringify(userObj))

    console.log(userObj)
    axios.post('http://localhost:4000/user/create-user', formData)
    .then(response=>{
      console.log(response)
      alert(response.data.message)
      if (response.data.message === "User created successfully")
        //navigate to login
        navigate('/Login')
    })
    .catch(error=>
      {
        console.log(error)
        alert("Something went wrong in creating user")
      })
  }

  return (
    <div>
      <Form className='mx-auto mt-3 w-50' onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Student Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name"
          {...register("name", {required:true})} />
          {errors.name&&<p className='text-danger'>*required</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username"
              {...register("username", {required:true})} />
              {errors.username&&<p className='text-danger'>Username is required</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
          {...register("password", {required:true})} />
          {errors.password&&<p className='text-danger'>Password is required</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Course</Form.Label>
          <Form.Control type="text" placeholder="Enter course"
          {...register("course", {required:true})} />
          {errors.course&&<p className='text-danger'>Course is required</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          SignUp
        </Button>
      </Form>
    </div>
  )
}

export default Signup