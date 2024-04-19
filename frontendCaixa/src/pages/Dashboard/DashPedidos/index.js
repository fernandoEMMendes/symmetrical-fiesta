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

  const [pedido, setPedido] = useState('')
  const [mesaNumero, setMesaNumero] = useState('');
  const [mesaProds, setMesaProds] = useState([""])
  const [mesaId, setMesaId] = useState("")

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
  }, [pedido]);


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

    const produtos = pedido.filter((palmito) => palmito.mesaID === id)
    setMesaProds(produtos)
    setMesaId(id)

    setModalAberto(true);
  }

  async function fecharPedido() {
    try {
      await apiLocal.delete("/FecharMesa", {
        mesaId
      })
      setModalAberto(false)
      navegacao.navigate("/Dashboard")
    
    } catch (err) {
      console.log(err)
    }
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

      <section id="ListarMesas">
        {mesa.map((lista) => {
          return (
            <div>
              <br />

              <div id="DivMesas">
                <button id="mesa" onClick={() => abrirModal(lista.id_mesa)}>
                  <img src={mesaIcone} alt="icone mesa" />
                  <div id="Desc_Mesas">
                    <h3 id="AgaTres_Mesas">Mesa</h3>
                    <h4 id="Num_Mesas">{lista.numero_mesa}</h4>
                  </div>
                </button>
              </div>

            </div>
          );
        })}

        {mesaProds.map((item) => {
          return (
            <>
              <Modal className="Modalb" isOpen={modalAberto} onRequestClose={() => setModalAberto(false)}>
                <button id="FecharMesasModal" onClick={() => fecharPedido()}>Fechar mesa</button>

                <h1 id="MesasH1">Mesa: {mesaNumero}</h1>

                <table id="tabelaProdutosContainer">

                  <tr id="tableHeader">
                    <th>NOME</th>
                    <th>PREÇO</th>
                    <th>QUANT</th>
                    <th>TOTAL</th>
                  </tr>

                  {mesaProds.map((palmito) => {
                    return (
                      <>
                        {palmito.length === 0 ? (
                          <h2>Carregando. . .</h2>
                        ) : (
                          <tr id="tableDick">
                            <td className="TableDickTD"><p>{palmito.produto.nome}</p></td>
                            <td className="TableDickTD"><p>R$ {palmito.produto.preco}</p></td>
                            <td className="TableDickTD"><p>{palmito.quant}</p></td>
                            <td className="TableDickTD"><p>R$ {palmito.produto.preco * palmito.quant}</p></td>
                          </tr>
                        )}
                      </>
                    )
                  })}

                </table>

              </Modal>
            </>
          )
        })
        }

      </section>
    </section>
  );
}