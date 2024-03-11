import {useState} from 'react'
import apiLocal from '../../../APIs/apiLocal'
import { toast } from 'react-toastify'
import { DashListarProdutos } from '../DashHome/DashListarProdutos/DashListarProdutos'
import Modal from 'react-modal'
import './DashProdutos.css'



export default function CriarProdutos(){

    const [ nome, setNome]= useState('')
    const [ descricao, setDescricao]= useState('')
    const [ preco, setPreco]= useState('')
    const [ imagem, setImagem]= useState(null)



    function handleImagem(e){
        if(!e.target.files){
            return
        }
        const image = e.target.files[0]
        if(image.type === 'image/png' || image.type === 'image/jpeg'){
            setImagem(image)
        }
    }

        async function handleCadastrar(e){
            try {
                e.preventDefault()
                const data = new FormData()

                data.append('nome',nome)
                data.append('descricao',descricao)
                data.append('file', imagem)
                data.append('preco',preco)

                await apiLocal.post('/CriarProduto', data, {

                })
                toast.success("Produto Cadastrados com sucesso")
            }
            catch (err){
                toast.error('Campos em brancos!')
            }
            setNome('')
            setDescricao('')
            setImagem(null)
            setPreco('')
        } 

        const [ modalAberto, setModalAberto ] = useState(false)

        function abrirModal(){
            setModalAberto(true)
        }

        function fecharModal(){
            setModalAberto(false)
        }   



    return(
        <section>
            <header id='dash_Produtos'>
                    <h1>Dashboard</h1>
                    <button onClick={abrirModal}>Adicionar Produto</button>
            </header>
            <div className='containerApp'>
            <Modal
            className='Modal'
            overlayClassName='overlay'
            isOpen={modalAberto}
            >
            <main id='main_Modal'>
            <div id='header_Modal_AddProdutos'>
                <h1>Adicionar produtos</h1>
            </div>
            <div>
            <form id='form_Modal_AddProduto'onSubmit={handleCadastrar}>
                <div>
                <label className='label_Modal_AddProduto'>Nome:</label><br/>

                <label className='label_Modal_AddProduto'>Descricao:</label><br/>

                </div>
                
                
                
                <div>
                <input className='input_Modal_AddProduto'
                type='text'
                value={nome}
                onChange={(e)=>setNome(e.target.value)}
                /><br/>

                <input className='input_Modal_AddProduto'
                type='text'
                value={descricao}
                onChange={(e)=>setDescricao(e.target.value)}
                /><br/>
                </div>
                

                
                
                
                <label className='label_Modal_AddProduto'>Preço:</label>
                <input className='input_Modal_AddProduto'
                type='number'
                value={preco}
                onChange={(e)=>setPreco(e.target.value)}
                />
                <br/>
                
                <label className='label_Modal_AddProduto'>Imagem:</label>
                <input className='input_Modal_AddProduto'
                type='file'
                accept='image/jpeg, image/png'
                onChange={handleImagem}
                /><br/>
                
                <button
                type='submit'
                >Add Produto</button>

            </form>
            <button onClick={fecharModal}>Cancelar</button>
            </div>
            </main>
            </Modal>
            </div>
            <div>
                <DashListarProdutos/>
            </div>
            
        </section>
    )
}