import { useNavigate/*, useParams, useState, useEffect*/ } from "react-router-dom";
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import BackgroundImage from '../Components/ImagemTela';

export default function FuncionarioCad(){

    const navigate = useNavigate();

    // const { idfuncionario } = useParams();

    // //Propriedades
    // const [nomefuncionario, setnomefuncionario] = useState('');
    // const [idrestaurante, setidrestaurante]     = useState('');
    // const [salario, setsalario]                 = useState('');
    // const [datacontratacao, setdatacontratacao] = useState('');
    // const [datademissao, setdatademissao]       = useState('');
    // const [cargo, setcargo]                     = useState('');
    // const [situacao, setsituacao]               = useState('');
    // const [login, setlogin]                     = useState('');
    // const [senha, setsenha]                     = useState('');

    // useEffect(() => {    
    //     const selecionar = async () => {
    //         let resposta = await getFuncionario(idfuncionario);
    //         setnomefuncionario(resposta.nomefuncionario);
    //         setidrestaurante(resposta.email);
    //         setsalario(resposta.salario);
    //         setdatacontratacao(resposta.datacontratacao);
    //         setdatademissao(resposta.datademissao);
    //         setcargo(resposta.cargo);
    //         setsituacao(resposta.situacao);
    //     };

    //     if (idfuncionario) {
    //         selecionar(idfuncionario);
    //     };
    // }, [idfuncionario]);

    const salvar = async () => {
        console.log('SALVO')
    };

    const cancelar = async () => {
        navigate('/Funcionario');
    };

    const excluir = async () => {
        console.log('EXCLUIDO')
    };

    const styleButton = {
        margin: '5px'
    }
    
    const styleContainer = {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
    
    const imageUrl = '/src/Image/fundogeral.png';
    return(
        <BackgroundImage imageUrl={imageUrl}>
            <Container style={{styleContainer}}>
                <Form style={{marginTop: '50px'}}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Nome do Funcionário" /*value={nomefuncionario}*//>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRestaurante">
                            <Form.Label >Restaurante</Form.Label>
                            <Form.Select defaultValue="1" /*value={idrestaurante}*/>
                                <option value="1">Gourmet</option>
                                <option value="2">Quiosque</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridSalario">
                            <Form.Label>Salário</Form.Label>
                            <Form.Control type="number" placeholder="Salário" /*value={salario}*//>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridDataContratacao">
                            <Form.Label>Data de Contratação</Form.Label>
                            <Form.Control type="date" /*value={datacontratacao}*//>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridDataDemissao">
                            <Form.Label>Data de Demissão</Form.Label>
                            <Form.Control type="date" /*value={datademissao}*//>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCargo">
                            <Form.Label>Cargo</Form.Label>
                            <Form.Select defaultValue="1" /*value={cargo}*/>
                                <option value="1">GERENTE</option>
                                <option value="2">ATENDENTE</option>
                                <option value="3">COPA</option>
                                <option value="4">COZINHA</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSituacao">
                            <Form.Label>Situação</Form.Label>
                            <Form.Select defaultValue="1" /*value={situacao}*/>
                                <option value="1">ATIVO</option>
                                <option value="2">INATIVO</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridLogin">
                            <Form.Label>Login</Form.Label>
                            <Form.Control type="login" /*value={login}*//>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSituacao">
                        <Form.Label>Senha</Form.Label>
                            <Form.Control type="text" /*value={senha}*//>
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="button" onClick={()=>salvar()} style={styleButton}>Salvar</Button>
                    <Button variant="secondary" type="button" onClick={()=>cancelar()} style={styleButton}>Cancelar</Button>
                    <Button variant="danger" type="button" onClick={()=>excluir()} /*hidden={1}*/ style={styleButton}>Excluir</Button>
                </Form>
            </Container>
        </BackgroundImage>
    )
}
