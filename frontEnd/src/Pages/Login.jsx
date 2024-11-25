import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import logo from '../Image/logonova.png';
import BackgroundImage from '../Components/ImagemTela';
//import { BsSteam } from "react-icons/bs";

function Login() {
    const styleContainer = {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
    const styleDiv = {
        position: 'relative',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#1C1C1C',
        width: '420px',
        height: '490px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor:'#DAA520', 
        borderWidth: '1px',
        borderStyle: 'solid'
    };
    const styleLogin = {
        width: '350px', 
        marginTop: '35px', 
        borderRadius: '15px',
        borderColor:'#DAA520', 
        borderWidth: '2px'
    };
    const stylePassword = {
        width: '350px', 
        borderRadius: '15px', 
        borderColor:'#DAA520', 
        borderWidth: '2px'
    };
    const styleButton = {
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        width: '150px', 
        marginTop: '10px', 
        borderRadius: '15px', 
        backgroundColor: '#1C1C1C', 
        borderColor: '#DAA520',
        color: '#DCDCDC' 
    };

    const imageUrl = '/src/Image/fundo.png';
    return (
        <BackgroundImage imageUrl={imageUrl}>
            <Container style={styleContainer}>
                <div style={styleDiv}>
                    <img src={logo} alt="Logo" 
                    style={{
                        width: '350px',
                        height: '170px'
                    }}/>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail" >
                            <Form.Control 
                                type="login" 
                                placeholder="Usuário"
                                style={styleLogin}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            {<Form.Control 
                                type="password" 
                                placeholder="Senha"
                                style={stylePassword}
                            />}
                        </Form.Group>
                    </Form>
                    <Button style={styleButton} type='button' as={Link} to='/Home'
                        /*Link={}*/>
                        ENTRAR
                    </Button>
                </div>
            </Container>
        </BackgroundImage>
    );
}

export default Login;
