import { useEffect, useState } from "react";
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


  function abrirModal(id) {
    const mesa1 = (mesa.filter((item) => item.id_mesa === id))
    const numero = Number(mesa1.map((itemN) => itemN.numero_mesa))
    setMesaNumero(numero)
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function Voltar() {
    navegacao('/Dashboard')
  }

  function entrarMesa(id, mesa) {

    console.log("id: ", id, "num_mesa: ", mesa)
    localStorage.setItem("@idMesa", JSON.stringify(id))
    localStorage.setItem("@numMesa", JSON.stringify(mesa))

    /*navigation.navegacao("mesa_id", {
      mesaId: mesa,
    })*/
  }
  //console.log(mesa)


  return (
    <section>
      <header >
        <h1 id="romero"> Dashboard Pedidos </h1>
        <button className="tingas" onClick={Voltar}>Voltar</button>


      </header>
      {mesa.map((lista) => {
        return (
          <>
            <br />
            <button className="mesa" onClick={() => abrirModal(lista.id_mesa)}>
              <img src={mesaIcone} alt="icone mesa" />
              <h4>{lista.numero_mesa}</h4>
            </button>
            <Modal isOpen={modalAberto}>
              <h1>Mesa: {mesaNumero}</h1>
              <button onClick={fecharModal}>Voltar</button>
              <button>Fechar mesa</button>
            </Modal>
          </>
        );
      })}
    </section>
  );
}