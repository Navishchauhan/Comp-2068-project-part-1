import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { Container, Form, ToastHeader } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Toast, toast } from 'react-toastify';

const Login = ({setUser}) => {
    const [inputs, setInputs] = useState({
        email: '',
        password:''
    });

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();

        try{
        const resp = await Axios.post('/api/authenticate', inputs);

        if (resp.status === 200) {
            setUser(resp.data.user);
            toast('you have logged in successfully', {
                type: toast.TYPE.SUCCESS
            });
            setRedirect(true);
        } else {
            toast('there was an error logging in. Please check your credentials', {
                type: toast.TYPE.ERROR
                });
            }
        } catch (error) {
            toast("There was an issue logging you in. Please check your credentials.", {
              type: toast.TYPE.ERROR
            });
          }
        };

    const handleInputChange = event => {
        event.persist();

    const {name, value} = event.target;
    
    setInputs(inputs => ({...inputs, [name]: value }));
    console.log(inputs);
    };

    if(redirect) {
        return (<Redirect to="/books"/>);
    }

    return(
    <Container className="my-5">
            <header>
                <h1>Login</h1>
            </header>
        <hr/>

            <Form onSubmit={handleSubmit}>
        <Form.Group>
            <label htmlFor="email">Email:</label>
            <Form.Control type="email" name="email" onChange={handleInputChange} value={inputs.email}/>
        </Form.Group>

        <Form.Group>
            <label htmlFor="password">Password:</label>
            <Form.Control type="password" name="password" onChange={handleInputChange} value={inputs.password}/>
        </Form.Group>

        <Form.Group>
            <button className="btn btn-primary">Login</button>
        </Form.Group>
            </Form>
    </Container>
    );
};

export default Login; 