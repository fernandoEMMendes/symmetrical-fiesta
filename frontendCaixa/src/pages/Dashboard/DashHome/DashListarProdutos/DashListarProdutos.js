import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import apiLocal from '../../../../APIs/apiLocal'
import { FiTrash2 } from "react-icons/fi";

import './DashListarProdutos.css'

export function DashListarProdutos(){
    
    const [listarProdutos, setListarProdutos]=useState([''])
    
        useEffect(()=>{
            async function handleListarProdutos(){
                const respostaListarProdutos = await apiLocal.get("/ListarProduto/files")
                setListarProdutos(respostaListarProdutos.data)
            }handleListarProdutos()
        },[listarProdutos])

        // /ApagarProduto

        
        async function handleApagarProduto(id){
            const iToken = await localStorage.getItem("@PJI2024");
            const token = await JSON.parse(iToken);

            const resultado = window.confirm("Deseja mesmo apagar esse produto?")
            if(resultado){
           const resposta= await apiLocal.delete('/ApagarProduto',{
                headers:{
                Authorization: 'Bearer ' + `${token}`
                 },
                    data:{
                    produtoId:id
                }
            })
            toast.success(resposta.data.dados)
        }}
       

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
                    <div id='Preco_ListarProduto'>
                       <p id='Real_ListarProduto'>R$ </p> {produto.preco}</div>    
                    </article>
                    <FiTrash2 id='Apagar_ListarProduto' onClick={()=>handleApagarProduto(produto.id)}/>

                    </section>
                </main>
            )
        })}
        </div>
        </div>


    )
}