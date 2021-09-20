import './signin.css';
import { useState } from 'react';
import { useContext } from 'react/cjs/react.development';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';


export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext)

    //logando usuário já cadastrado
    function handleSubmit(e){
        e.preventDefault();
        if(email !== '' && password !== ''){
            signIn(email,password)
        }

    }



    return(
        <div className="container-center">
            <div className="login">
                <div className="logo-area">
                    <img src={logo} alt="Sistema Logo"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="email" placeholder="email@email.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="******" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit">{loadingAuth ? 'Carregando...':'Acessar'}</button>
                </form>

                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    )
}