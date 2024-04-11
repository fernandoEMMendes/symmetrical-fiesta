import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import Modal from "react-modal";
import { Link, Route, useNavigate } from "react-router-dom";
import mesaIcone from "../../../img/mesa.png";
import './pedido.css'
import apiLocal from "../../../APIs/apiLocal";

export default function DashPedidos() {
  const navegacao = useNavigate()
  const [mesa, setMesa] = useState([""]);
  const [modalAberto, setModalAberto] = useState(false);
  const [mesaId, setMesaId] = useState(null);
  const [pedido, setPedido] = useState('')
  const [mesaNumero, setMesaNumero] = useState('');



  useEffect(() => {
    async function verificaToken() {
      const iToken = await localStorage.getItem("@PJI2024");
      const token = await JSON.parse(iToken);

      const resposta = await apiLocal.get("/ListarMesas", {
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      });
      setMesa(resposta.data);

      if (!resposta.data) {

        alert("FAZER NAVEGAÇÃO INICIO");
        return;
      }
    }
    verificaToken();
  }, [mesa]);


  useEffect(() => {

    async function verificaToken() {
      const iToken = await localStorage.getItem("@PJI2024");
      const token = await JSON.parse(iToken);

      const resposta = await apiLocal.get("/ListarPedido", {
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      });
      setPedido(resposta.data);
      console.log(resposta);

      if (!resposta.data) {
        alert("fazer navegação inicio");
        return
      }
    }
    verificaToken();




  }, [pedido]);




  function abrirModal(id) {
    const mesa1 = (mesa.filter((item) => item.id_mesa === id))
    const numero = Number(mesa1.map((itemN) => itemN.numero_mesa))
    setMesaNumero(numero)
    setModalAberto(true);
  }



  function fecharModal() {
    setModalAberto(false);
  }

  function fazerpedido() {

  }


  function Voltar() {
    navegacao('/Dashboard')
  }




  return (
    <section id="main_DashPedidos1">
      
      <header id="romero" >
        
        <h1 id="h1DashPedidos"> Dashboard Pedidos </h1>

        <div >
          <FaHome id="tingas" onClick={Voltar} />
        </div>
      
      </header>
      
      
      {mesa.map((lista) => {
        return (
          <>
            <br />
<<<<<<< HEAD

=======
           
>>>>>>> 6f5c630498d0ed3f67dccc34a19099a9e31e1e39
            <button className="mesa" onClick={() => abrirModal(lista.id_mesa)}>
              <img src={mesaIcone} alt="icone mesa" />
              <h4>{lista.numero_mesa}</h4>
            </button>
<<<<<<< HEAD
=======

            <Modal className="Modalb" isOpen={modalAberto}>
            
            
              <h1>Mesa: {mesaNumero}</h1>
              <button onClick={fecharModal}>Voltar</button>
              <button>Fechar mesa</button>
            </Modal>
          
>>>>>>> 6f5c630498d0ed3f67dccc34a19099a9e31e1e39
          </>
        );
      })}
      {pedido.map((item) => {
        return (
          <>
<Modal className="Modalb" isOpen={modalAberto}>
        <h1>Mesa: {mesaNumero}</h1>
        <section>
          <table>
            <tr>
              <th>Produto</th>
              <th>Valor Unitario</th>
              <th>QTDE</th>
              <th>Subtotal</th>
            </tr>
            <tr>
              <td></td>
              <td>5</td>
              <td>{item.quant}</td>
              <td>5</td>
            </tr>
          </table>
        </section>
        <section className="secaovltotal">
          <table>
            <tr>
              <th>Valor Total</th>
            </tr>
            <tr>
              <td>45</td>
            </tr>
          </table>
        </section>
        <button onClick={fecharModal}>Voltar</button>
        <button>Fechar mesa</button>
      </Modal>
          </>
        )
      })}
      


    </section>
  );
}