import {useState, useEffect} from 'react'
import apiLocal from '../../../../APIs/apiLocal'

import './DashListarProdutos.css'

export function DashListarProdutos(){
    
    const [listarProdutos, setListarProdutos]=useState([''])

    
        useEffect(()=>{
            async function handleListarProdutos(){
                const respostaListarProdutos = await apiLocal.get("/ListarProduto/files")
                setListarProdutos(respostaListarProdutos.data)
            }handleListarProdutos()
        },[])
    
    return(
        <div>
        <h1 id='h1_ListarProdutos'>Produtos</h1>
        <div>
        {listarProdutos.map((produto)=>{
            return(
                <main id='main_ListarProdutos'>
                    <section id='section_PrincipalListarProdutos'>
                    <article id='artigo_ListarProdutosImg'>
                    <img src={`http://localhost:7600/files/${produto.banner}`} alt={`Imagem de ${produto.nome}`}
                    />
                    </article>

                    <article id='artigo_ListarProdutosTituloDescricao'>
                    <h2 id='h2_ListarProdutos'>{produto.nome}</h2>
                    <p id='p_ListarProdutos'>{produto.descricao}</p>
                    </article>
                    <article id='artigo_ListarProdutosDeletar'>

                    </article>
                    </section>
                </main>
            )
        })}
        </div>
        </div>


    )
}