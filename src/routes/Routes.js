import { useContext } from 'react';
import { Route, Redirect} from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

//passando pelas props um componente, se é privada ou não e o resto do react-router
export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}){
    const { signed, loading } = useContext(AuthContext);


    if(loading){
        return(
            <div></div>
        )
    }

//se nao está logado e a página for privada , retorna para raiz
    if(!signed && isPrivate){
        return(
            <Redirect to="/"/>
        )
    }

//se está logado e a página não for privada, envia para o dashboard
    if(signed && !isPrivate){
        return <Redirect to="/dashboard"/>
    }

    return(
        <Route
            {...rest}
            render={props => (
                <Component {...props}/>
            )}
        />
    )
}