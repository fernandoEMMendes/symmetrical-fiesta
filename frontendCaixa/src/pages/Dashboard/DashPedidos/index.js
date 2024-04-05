import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import mesaIcone from "../../../img/mesa.png";

import apiLocal from "../../../APIs/apiLocal";

export default function DashPedidos() {
  const [mesa, setMesa] = useState([""]);
  const [modalAberto, setModalAberto] = useState(false);
  const [mesaId, setMesaId] = useState(null);

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

  function abrirModal() {
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  return (
    <section>
      <h1>Dashboard Pedidos </h1>
      {mesa.map((lista) => {
        return (
          <>
            <button value={mesa} onClick={(e) => abrirModal(e.target.value)}>
              <img src={mesaIcone} alt="icone mesa" />
              <h4>{lista.numero_mesa}</h4>
            </button>
            <Modal isOpen={modalAberto}>
              <h1>Mesa: {lista.numero_mesa}</h1>
              <button onClick={fecharModal}>Voltar</button>
              <button>Fechar mesa</button>
            </Modal>
          </>
        );
      })}
    </section>
  );
}
