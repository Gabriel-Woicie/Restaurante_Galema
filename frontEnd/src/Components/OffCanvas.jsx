import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { BsPeople } from "react-icons/bs";
import { IoIosRestaurant, IoMdPizza } from "react-icons/io"; 
import { MdTableRestaurant, MdFoodBank } from "react-icons/md";
import { TbReportSearch, TbReportMoney, TbReportAnalytics } from "react-icons/tb";
import { Link } from 'react-router-dom';

export default function OffCanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const offcanvasStyle = {
    backgroundColor: '#DAA520',
    color: 'black',
  };
  const stylediv = {
    padding: '25px',
    top: '20px'
  };

  const regularItems = [
    {
      id: 1,
      icon: <MdFoodBank />,
      description: 'Tipo Restaurante',
      link: '/TipoRestaurante',
    },
    {
      id: 2,
      icon: <IoIosRestaurant />,
      description: 'Restaurantes',
      link: '/Restaurante',
    },
    {
      id: 3,
      icon: <MdTableRestaurant />,
      description: 'Mesas',
      link: '/Mesa',
    },
    {
      id: 4,
      icon: <BsPeople />,
      description: 'Funcionários',
      link: '/Funcionario',
    },
    {
      id: 5,
      icon: <IoMdPizza />,
      description: 'Produtos',
      link: '/Produto',
    },
    {
      id: 6,
      description: '',
    },
    {
      id: 7,
      icon: <TbReportMoney  />,
      description: 'Produtos mais vendidos',
      link: '/ProdutoVendido',
    },
    {
      id: 8,
      icon: <TbReportAnalytics  />,
      description: 'Quantidade de Pedidos',
      link: '/QuantidadePedido',
    },
    {
      id: 9,
      icon: <TbReportSearch  />,
      description: 'Itens por funcionários',
      link: '/ItensFuncionario',
    }
  ];

  return (
    <>
      <div style={stylediv}>
        <FaBars variant="success" onClick={handleShow} type='Button' style={{ width: '35px', height: '40px', color: '#B8860B',}} />
      </div>
      
      <Offcanvas show={show} onHide={handleClose} style={offcanvasStyle} className="dark-theme">
        <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ textAlign: 'center', width: '100%', fontWeight: 'bold', fontSize: '30px' }}>
        GALEMA
        </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul style={{ listStyle: 'none', padding: 5 }}>
            {regularItems.map(item => (
              <li key={item.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                {item.icon} <Link to={item.link} style={{ marginLeft: '5px', color: '#ffffff', textDecoration: 'none' }}>{item.description}</Link>
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
        <Button as={Link} to='/' style={{ 
        background: 'transparent', 
        border: '1px solid #FFFF00',
        fontWeight: 'bold', 
        fontFamily: 'Arial, sans-serif', 
        color: '#DCDCDC', 
        padding: '6px', 
        borderRadius: '10px', 
        transition: 'all 0.3s ease-in-out',
        textDecoration: 'none'  
      }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#000000'}  // Cor de fundo ao passar o mouse
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}  // Cor de fundo ao remover o mouse
      >
        Sair
      </Button>
      </Offcanvas>
    </>
  );
}