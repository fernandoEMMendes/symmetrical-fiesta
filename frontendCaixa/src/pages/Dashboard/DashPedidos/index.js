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
  }, []);


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
              <Modal className="Modalb" isOpen={modalAberto}>
                {item.length === 0 ? (
                  <h2>Carregando. . .</h2>
                ) : (
                  <>

                    <button onClick={fecharModal} style={{ backgroundColor: "white", float: "left" }}>{"❌"}</button>
                    <button style={{ backgroundColor: "white", float: "right" }}>Fechar mesa</button>

                    <h1>Mesa: {mesaNumero}</h1>
                    <section id="secaoTabela">
                      <table id='tabelaProdutosContainer'>
                        <tr id='tabelaProdutos'>
                          <th>Produto</th>
                          <th>Valor Unitario</th>
                          <th>QTDE</th>
                          <th>Subtotal</th>
                        </tr>
                        <tr>
                          <td>{item.produto.nome}</td>
                          <td>{item.produto.preco}</td>
                          <td>{item.quant}</td>
                          <td>{item.produto.preco * item.quant}</td>
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
                  </>
                )}
              </Modal>
            </>
          )
        })
        }

      </section>
    </section>
  );
}