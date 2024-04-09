import './Dashboard.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import "./atendentes.css";
import ImgPedidos from '../DashMultimidia/pedidos.png'
import ImgProdutos from '../DashMultimidia/Produtos.png'
import { Flip, toast } from 'react-toastify'
import apiLocal from '../../../APIs/apiLocal'


export default function Dashboard() {
    const lucas = useNavigate()

    const [modalAberto, setModalAberto] = useState(false)
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [cpf, setCpf] = useState("")


    function abrirModal() {
        setModalAberto(true)
    }
    function fecharModal() {
        setModalAberto(false)
    }

    async function CadastroCachorroLoko(e) {
        e.preventDefault()
        if (!nome || !senha || !cpf) {
            toast.warning('Existe Campos em Branco')
        }
        try {
            await apiLocal.post('/CriarAtendentes', {
                nome,
                cpf,
                password: senha
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
        <section  id='header_Principal'>
                
            <header id='dash_Header'>
                <h1>Dashboard</h1>
                <button className='logoff' onClick={Sair}>Logoff</button>
              
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
                <Modal  className={'minusdall'} isOpen={modalAberto} >
                    <h2  className='hmodal'>CADASTRAR FUNCIONÁRIO</h2>
                    <form onSubmit={CadastroCachorroLoko}>
                        <div className='brmodal' >
                        <label >Nome:</label>
                        <input className='bmodal' type="text"
                            placeholder='Nome Funcionario'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            /><br />
                        <label>Senha:</label>
                        <input className='bmodal' type="text"
                            placeholder='Senha Funcionario' 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            /><br />
                        <label>CPF:</label>
                        <input className='bmodal' type="text"
                            placeholder='CPF Funcionario' 
                            value={cpf}
                            
                            onChange={(e) => setCpf(e.target.value)}
                            

                               /><br />
                               
                        <button className='bbmodal' type='submit'>Cadastrar</button>







                    <button className='smodal'  onClick={fecharModal} >Sair</button>
                               </div>
                    </form>
                </Modal>
            </footer>
        </section>
    )
}
