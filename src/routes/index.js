    import { Switch } from 'react-router-dom';
    import Route from './Routes';
    import Profile from '../pages/Profile';
    import SignIn from '../pages/SignIn';
    import SignUp from '../pages/SignUp';
    import Dashboard from '../pages/Dashboard';
    import Customres from '../pages/Customers';
    import New from '../pages/New';

    export default function Routes(){
        return(
            <Switch>
                <Route component={SignIn} path="/" exact/>
                <Route component={SignUp} path="/register" exact/>
                <Route component={Dashboard} path="/dashboard" exact isPrivate  />
                <Route component={Profile} path="/profile" exact isPrivate />
                <Route component={Customres} path="/customers" exact isPrivate/>
                <Route component={New} path="/new" exact isPrivate/>
            </Switch>
        )
    }