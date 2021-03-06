import firebase from '../../services/firebaseconnection';
import { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import './new.css'

import { FiPlusCircle } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';

export default function New(){

    const [customers,setCustomers] = useState([]);
    const [loadCustomers,setLoadCustomers] = useState(true);

    const [assunto,setAssunto] = useState('Suporte');
    const [status,setStatus] = useState('Aberto');
    const [complemento,setComplemento] = useState('');
    const [customerSelected, setCustomerSelected] = useState(0);

    const { user } = useContext(AuthContext);


    //busca todas as listas de clientes cadastrados
    useEffect(()=>{
        async function loadCustomers(){
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot)=>{
                let lista = [];

                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })

                if(lista.length === 0){
                    console.log('Nenhuma empresa encontrada')
                    setCustomers([{id:1, nomeFantasia:''}])
                    setLoadCustomers(false)
                    return;
                }

                setCustomers(lista)
                setLoadCustomers(false)
            })
            .catch((error)=>{
                console.log(error)
                setLoadCustomers(false)
                setCustomers([{id:1, nomeFantasia:''}])
            })
        }
        loadCustomers();
    },[])

//depois de pegar todos os dados tratados abaixo, criar novo chamado 
    async function handleRegister(e){
        e.preventDefault();
      await firebase.firestore().collection('chamados')
      .add({
          created: new Date(),
          cliente: customers[customerSelected].nomeFantasia,
          clienteId: customers[customerSelected].id,
          assunto: assunto,
          status:status,
          complemento: complemento,
          userId: user.uid,
      })
      .then(()=>{
        alert('Chamado criado com sucesso!')
        setComplemento('')
        setCustomerSelected(0)
      })
      .catch((error)=>{
          alert('Ops, erro ao registrar, tente mais tarde...')
        console.log(error)
      })
    }
//chama qnd troca assunto
    function handleChangeSelect(e){
        setAssunto(e.target.value)
    }
//chama qnd troca status
    function handleOptionChange(e){
        setStatus(e.target.value)
    }
//chamado qnd troca de cliente
    function handleChangeCustomers(e){
        //console.log('INDEX DO CLIENTE SELECIONADO', e.target.value)
        //console.log('Cliente Selecionado', customers[e.target.value])
        setCustomerSelected(e.target.value)
    }
    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="content">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>

                        <label>Clientes</label>
                        {loadCustomers ? (
                            <input type="text" disabled={true} value="Carregando clientes...."/>
                        ) : (

                            <select value={customerSelected} onChange={handleChangeCustomers}>
                            {customers.map((item,index)=>{
                                return(
                                    <option key={item.id} value={index}>
                                        {item.nomeFantasia}
                                    </option>
                                )
                            })}
                        </select>
                        )
                    
                    }
                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input 
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>Em Aberto</span>
                            <input 
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'}
                            />
                             <span>Progresso</span>
                            <input 
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type="text"
                            placeholder="Descreva seu problema (opcional)"
                            onChange={(e)=>setComplemento(e.target.value)}
                        />

                        <button type="submit">Registrar</button>

                    </form>
                </div>
            </div>
        </div>
    )
}