    import { Switch } from 'react-router-dom';
    import Route from './Routes';

    import SignIn from '../pages/SignIn';
    import SignUp from '../pages/SignUp';
    import Dashboard from '../pages/Dashboard';

    export default function Routes(){
        return(
            <Switch>
                <Route component={SignIn} path="/" exact/>
                <Route component={SignUp} path="/register" exact/>
                <Route component={Dashboard} path="/dashboard" exact isPrivate  />
            </Switch>
        )
    }