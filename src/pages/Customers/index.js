import './customers.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import firebase from '../../services/firebaseconnection';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react/cjs/react.development';


export default function Customres(){
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

async function handleSubmit(e){
        e.preventDefault();

        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
            await firebase.firestore().collection('customers')
            .add({
                nomeFantasia:nomeFantasia,
                cnpj:cnpj,
                endereco:endereco,
            })
            .then(()=>{
                setNomeFantasia('');
                setCnpj('');
                setEndereco('');
                alert('Empresa Cadastradas com sucesso');
            })
            .catch((error)=>{
                alert('Ops , ocorreu algum erro' + error)
            })
        }else{
            alert('Todos os campos devem ser preenchidos');
        }
    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25}/>
                </Title>
                <div className="container">
                    <form className="form-profile customers" onSubmit={handleSubmit}>
                        <label>Nome fantasia</label>
                        <input type="text" placeholder="Nome da empresa" value={nomeFantasia} onChange={(e)=> setNomeFantasia(e.target.value)}/>

                        <label>CNPJ</label>
                        <input type="text" placeholder="CNPJ" value={cnpj} onChange={(e)=> setCnpj(e.target.value)}/>

                        <label>Endereço</label>
                        <input type="text" placeholder="Endereço" value={endereco} onChange={(e)=> setEndereco(e.target.value)}/>

                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}