import { React, useState } from 'react';
import OffCanvas from '../Components/OffCanvas';
import { Button, Table, Container } from 'react-bootstrap';
import BackgroundImage from '../Components/ImagemTela';
import Lista from '../Components/Lista';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Restaurante() {
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
                <Lista titulo="RESTAURANTES" descricao="Gerencie aqui todos os restaurantes" rota="RestauranteCad"/>
                <Table striped hover >
                    <thead>
                        {/* {dados.map((d, i)=>( */}
                            <tr /*key={i}*/>
                                <th></th>
                                <th>Restaurantes</th>
                                <th>Tipo de Restaurante</th>
                            </tr>
                        {/* ))} */}
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Button as={Link} to={'/RestauranteCad'} title="Alterar" style={styleButton}> <FaPencilAlt/> </Button>
                            </td>
                            <td>restaurante teste</td>
                            <td>tipo de restaurante teste</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </BackgroundImage>
    )
}

export default Restaurante;