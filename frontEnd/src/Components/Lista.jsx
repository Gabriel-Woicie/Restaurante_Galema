import { Alert, Button } from 'react-bootstrap';
import { Link  } from 'react-router-dom';

export default function Lista(props){
    const styleAlert = {
        backgroundColor: '#1C1C1C',
        color: 'LightGoldenrodYellow',
        borderRadius: '30px',
        borderColor: '#FFFF00',
    }
    return (
        <Alert style={styleAlert}>
            <Alert.Heading>{props.titulo}</Alert.Heading>
            <p>{props.descricao}</p>
            <hr />
            <Button as={Link} to={`/${props.rota}`} hidden={!props.rota} style={{backgroundColor: '	#DAA520', borderColor:'#DCDCDC'}}>{props.textoBotao?props.textoBotao:'Adicionar'} </Button>
        </Alert>
    );
}