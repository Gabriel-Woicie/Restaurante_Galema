import BackgroundImage from '../Components/ImagemTela';
import { Form, Button } from 'react-bootstrap';

export default function RestauranteCad(){
    const styleButton = {
        margin: '5px'
    }
    const imageUrl = '/src/Image/fundogeral.png';
    return(
        <>
            <BackgroundImage imageUrl={imageUrl}>
                <Form style={{marginTop: '50px'}}>
                    <Form.Group className="mb-3" controlId="inputRestaurante">
                        <Form.Label>Restaurante *</Form.Label>
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={()=>salvar()} style={styleButton}>Salvar</Button>
                    <Button variant="secondary" type="button" onClick={()=>cancelar()} style={styleButton}>Cancelar</Button>
                    <Button variant="danger" type="button" onClick={()=>excluir()} /*hidden={1}*/ style={styleButton}>Excluir</Button>
                </Form> 
            </BackgroundImage>
        </>
    )
}
