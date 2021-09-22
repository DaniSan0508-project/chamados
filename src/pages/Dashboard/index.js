import firebase from '../../services/firebaseconnection';
import './dashboard.css';
import Title from '../../components/Title';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';

import Header from '../../components/Header';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';

const listRef = firebase.firestore().collection('chamados').orderBy('created','desc')

export default function Dashboard(){
    const [chamados, setChamados] = useState([]);
    const [loading,setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    useEffect(()=>{
        loadChamados();
        return()=>{

        }
    },[])

    async function loadChamados(){
        await listRef.limit(5)
        .get()
        .then((snapshot)=>{
            const isCollectionEmpty = snapshot.size === 0
                if(!isCollectionEmpty){
                    let lista = []

                    snapshot.forEach((doc)=>{
                        lista.push({
                            id:doc.id,
                            assunto:doc.data().assunto,
                            cliente:doc.data().cliente,
                            clienteId:doc.data().clienteId,
                            created:doc.data().created,
                            createdFormated: format(doc.data().created.toDate(),'dd/MM/yyyyy'),
                            status:doc.data().status,
                            complemento:doc.data().complemento,
                        })
                    })

                    const lastDoc = snapshot.docs[snapshot.docs.length -1]// Pegando ultimo documento buscado

                    setChamados(chamados => [...chamados, ...lista]);
                    setLastDocs(lastDoc)
                }else{
                    setIsEmpty(true)
                }

                setLoadingMore(false);
        })
        .catch((error)=>{
            console.log(error)
            setLoadingMore(false)
        })

        setLoading(false)
    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Atendimentos">
                    <FiMessageSquare size={25}/>
                </Title>
                {
                    chamados.length === 0 ?
                    (
                    <div className="container dashboard">
                        <span>Nenhum chamado registrado...</span>

                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#fff"/>
                            Novo Chamado
                        </Link>
                    </div>
                    )
                    :
                    (
                    <>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#fff"/>
                            Novo Chamado
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Cliente">Sujeito</td>
                                    <td data-label="Cliente">Suporte</td>
                                    <td data-label="Status">
                                        <span className="badge" style={{backgroundColor: '#5cb85c'}}>Em Aberto</span>
                                    </td>
                                    <td data-label="Cadastrado">20/06/2021</td>
                                    <td data-label="#">
                                        <button className="action" style={{backgroundColor: '#3583f6'}}>
                                            <FiSearch color="#fff" size={17}/>
                                        </button>
                                        <button className="action" style={{backgroundColor: '#F6a935'}}>
                                            <FiEdit2 color="#fff" size={17}/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                    )
                }

             

            </div>
        </div>
    )
}