import './Dashboard.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

import ImgPedidos from '../DashMultimidia/pedidos.png'
import ImgProdutos from '../DashMultimidia/Produtos.png'
import { Flip, toast } from 'react-toastify'
import apiLocal from '../../../APIs/apiLocal'


export default function Dashboard() {
    const lucas = useNavigate()

    const [modalAberto, setModalAberto] = useState(false)
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')


    function abrirModal() {
        setModalAberto(true)
    }
    function fecharModal() {
        setModalAberto(false)
    }

    async function CadastroCachorroLoko(e) {
        e.preventDefault()
        if (!nome || !senha) {
            toast.warning('Existe Campos em Branco')
        }
        try {
            await apiLocal.post('/CriarAtendentes', {
                nome,
                senha
            })
            setNome('')
            setSenha('')
            setModalAberto(false)
            toast.success('Cadastrado com sucesso',{
                transition: Flip,
                autoClose:1250,
                closeOnClick:true,
                pauseOnHover:false,
                draggable:false
            })
        } catch (err) {
            
            return
        }
    }


function Sair() {
    localStorage.removeItem("@PJI2024")
    lucas('/')
    toast.info("Logoff realizado com sucesso")
}

    return (
        <section id='header_Principal'>
            <header id='dash_Header'>
                <h1>Dashboard</h1>
                <button onClick={Sair}>
                    Logoff
                </button>
            </header>
            <main id='corpo_Principal'>

                <article className='corpo_Filho'>
                    <Link to='../DashPedidos' ><img className='ImgDash' src={ImgPedidos} alt='dashPedidosImg' /></Link>
                </article>

                <article className='corpo_Filho'>
                    <Link to='../DashProdutos'><img className='ImgDash' src={ImgProdutos} alt='dashProdutosImg' /></Link>
                </article>


            </main>
            <footer>
                <button id='dashFooter' className='dashFooter' onClick={abrirModal}>

                    <h2 id='dashH2'>Funções Administrativas</h2>
                </button>
                <Modal isOpen={modalAberto} >
                    <h2>CADASTRAR FUNCIONÁRIO</h2>
                    <form onSubmit={CadastroCachorroLoko}>
                        <label>Nome:</label>
                        <input type="text"
                            placeholder='Nome Funcionario'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            /><br />
                        <label>Senha:</label>
                        <input type="text"
                            placeholder='Senha Funcionario' 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            /><br />
                        <button type='submit'>Cadastrar</button>






                    </form>

                    <button onClick={fecharModal} >Sair</button>
                </Modal>
            </footer>
        </section>
    )
}
