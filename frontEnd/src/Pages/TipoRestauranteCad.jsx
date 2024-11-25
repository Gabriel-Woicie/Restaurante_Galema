import { Form, Button, Container } from 'react-bootstrap';
import BackgroundImage from '../Components/ImagemTela';

export default function TipoRestauranteCad(){
    const styleButton = {
        margin: '5px'
    }
    const imageUrl = '/src/Image/fundopadrao.png';
    return(
        <BackgroundImage imageUrl={imageUrl}>
            <Container>
                <Form style={{marginTop: '50px'}}>
                    <Form.Group className="mb-3" controlId="inputTipoRestaurante">
                        <Form.Label>Tipo de Restaurantes</Form.Label>
                        <Form.Control type="text" /*value={autor} onChange={e => setAutor(e.target.value)}*//>
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={()=>salvar()} style={styleButton}>Salvar</Button>
                    <Button variant="secondary" type="button" onClick={()=>cancelar()} style={styleButton}>Cancelar</Button>
                    <Button variant="danger" type="button" onClick={()=>excluir()} /*hidden={1}*/ style={styleButton}>Excluir</Button>
                </Form>
            </Container>
        </BackgroundImage>
    )
}
