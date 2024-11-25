import { React, useState } from 'react';
import OffCanvas from '../Components/OffCanvas';
import { Button, Table, Container } from 'react-bootstrap';
import BackgroundImage from '../Components/ImagemTela';
import Lista from '../Components/Lista';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Mesa() {
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

    // useEffect(() => {
    //     const carregarDados = async () => {
    //         let res = await getAutores();
    //         setDados(res);
    //     }
        
    //     carregarDados();   
    // }, []);

    const imageUrl = '/src/Image/fundogeral.png';
    return (
        <BackgroundImage imageUrl={imageUrl}>
            <OffCanvas />
            <Container>
                <Lista titulo="MESAS" descricao="Gerencie aqui todas as mesas" rota="MesaCad"/>
                <Table striped hover >
                    <thead>
                        {/* {dados.map((d, i)=>( */}
                            <tr /*key={i}*/>
                                <th></th>
                                <th>Situação</th>
                                <th>Restaurante</th>
                            </tr>
                        {/* ))} */}
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Button as={Link} to={'/MesaCad'} title="Alterar" style={styleButton}> <FaPencilAlt/> </Button>
                            </td>
                            <td>Situação Teste</td>
                            <td>Restaurante Teste</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </BackgroundImage>
    )
}

export default Mesa;