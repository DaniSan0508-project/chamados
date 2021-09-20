
import { useContext } from 'react/cjs/react.development';
import { AuthContext } from '../../contexts/auth';

export default function Dashboard(){
    const { signOut } = useContext(AuthContext);
    return(
        <div>
            <h1>Tela do dashboard</h1>
            <button onClick={()=> signOut()}>Logout</button>
        </div>
    )
}