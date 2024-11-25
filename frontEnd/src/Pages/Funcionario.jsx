import { React, useState } from 'react';
import OffCanvas from '../Components/OffCanvas';
import { Button, Table, Container } from 'react-bootstrap';
import BackgroundImage from '../Components/ImagemTela';
import Lista from '../Components/Lista';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Funcionario() {
    const styleButton = {
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        marginTop: '5px', 
        borderRadius: '20px', 
        backgroundColor: '#DAA520', 
        borderColor: '#DCDCDC',
        color: 'white',
        width: '70px'
    };

    const imageUrl = '/src/Image/fundogeral.png';
    return (
        <BackgroundImage imageUrl={imageUrl}>
            <OffCanvas />
            <Container>
                
                <Lista titulo="FUNCIONÁRIOS" descricao="Gerencie aqui todos os funcionários" rota="FuncionarioCad"/>
                <Table striped hover >
                    <thead>
                        {/* {dados.map((d, i)=>( */}
                            <tr /*key={i}*/>
                                <th></th>
                                <th>Funcionário</th>
                                <th>Sálario</th>
                                <th>Data Contratação</th>
                                <th>Data Demissão</th>
                                <th>Cargo</th>
                                <th>Situação</th>
                                <th>Restaurante</th>
                            </tr>
                        {/* ))} */}
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Button as={Link} to={'/FuncionarioCad'} title="Alterar" style={styleButton}> <FaPencilAlt/> </Button>
                            </td>
                            <td>Funcionário</td>
                            <td>Sálario</td>
                            <td>Data Contratação</td>
                            <td>Data Demissão</td>
                            <td>Cargo</td>
                            <td>Situação</td>
                            <td>Restaurante</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </BackgroundImage>
    )
}

export default Funcionario;