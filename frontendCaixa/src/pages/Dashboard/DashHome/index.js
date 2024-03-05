import './Dashboard.css'
import {Link} from 'react-router-dom'

import ImgPedidos from '../DashMultimidia/pedidos.png'
import ImgProdutos from '../DashMultimidia/Produtos.png'


export default function Dashboard(){
    return(
        <section id='header_Principal'>
            <header id='dash_Header'>
                    <h1>Dashboard</h1>
                </header>
            <main id='corpo_Principal'>
                
                <article className='corpo_Filho'>
                <Link to='../DashPedidos' ><img className='ImgDash' src={ImgPedidos} alt='dashPedidosImg'/></Link>
                </article>
                
                <article className='corpo_Filho'>
                <Link to='../DashProdutos'><img className='ImgDash' src={ImgProdutos} alt='dashProdutosImg'/></Link>
                </article>

                
            </main>
            <footer id='dashFooter'>
                    <h2 id='dashH2'>Administrativo</h2>
            </footer>
        </section>
    )
}
