import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { LoginService } from '../../ApiServices/AuthService/loginService';

const SignIn = () => {


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    //Call API Login 
    const { loginResponse, loginIsLoading, loginError, callLoginRefetch } = LoginService();

    useEffect(() => {
        if (loginResponse) {
            if (loginResponse.success) {
                localStorage.setItem('admin', loginResponse.data.admin);
                localStorage.setItem('email', loginResponse.data.email);
                localStorage.setItem('iduser', loginResponse.data.id);
                localStorage.setItem('userName', loginResponse.data.userName);
                localStorage.setItem('role', loginResponse.data.role);
                localStorage.setItem('token', loginResponse.data.matKhau);
                navigate('/user');
            }
            else {
                alert(loginResponse.message);
            }
        }

    }, [loginResponse])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        callLoginRefetch(formData);

    }
    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <div className='background-Login'>
            <div className='signin-layout'>
                <Form onSubmit={handleOnSubmit}>
                    <h3>Đăng nhập Fiverr</h3>
                    <Form.Group className="mb-3" >
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={handleChange} name='username' type="text" placeholder="Nhập Username" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control onChange={handleChange} name='password' type="password" placeholder="Mật khẩu" />
                    </Form.Group>
                    <Form.Label><a style={{color:'white'}} href='/QuenMatKhau'>Quên Mật khẩu</a></Form.Label>
                    <Button type='submit' variant='success' className='SignIn--btn' size='md' block='true'>Đăng nhập</Button>
                </Form>
            </div>
        </div>
    )
}

export default SignIn;