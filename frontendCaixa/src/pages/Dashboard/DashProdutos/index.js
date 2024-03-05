import {useState} from 'react'
import apiLocal from '../../../APIs/apiLocal'
import { toast } from 'react-toastify'



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

                const resposta = await apiLocal.post('/CriarProduto', data, {

                })
                toast.success(resposta.data.dados)
            }
            catch (err){
                console.log(err)
            }
            setNome('')
            setDescricao('')
            setImagem(null)
            setPreco('')
        } 



    return(
        <section>
            <main>
            <header>
                <h1>Adicionar produtos</h1>
            </header>
            <div>
            <form onSubmit={handleCadastrar}>
                <label>Nome:</label>
                <input
                type='text'
                value={nome}
                onChange={(e)=>setNome(e.target.value)}
                /><br/>

                <label>Descricao:</label>
                <input
                type='text'
                value={descricao}
                onChange={(e)=>setDescricao(e.target.value)}
                /><br/>

                <label>Imagem:</label>
                <input
                type='file'
                accept='image/jpeg, image/png'
                onChange={handleImagem}
                /><br/>
                
                <label>Preço:</label>
                <input
                type='number'
                value={preco}
                onChange={(e)=>setPreco(e.target.value)}
                />
                <br/>
                
                <button
                type='submit'
                >Add Produto</button>

            </form>
            </div>
            </main>
        </section>
    )
}