
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';


export default function SignIn(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    function handleSubmit(e){
        e.preventDefault();
        alert('Clicou')
    }



    return(
        <div className="container-center">
            <div className="login">
                <div className="logo-area">
                    <img src={logo} alt="Sistema Logo"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastre uma conta</h1>
                    <input type="text" placeholder="Nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                    <input type="email" placeholder="email@email.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="******" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit">Cadastrar</button>
                </form>

                <Link to="/">Já possui uma conta ? Entre</Link>
            </div>
        </div>
    )
}