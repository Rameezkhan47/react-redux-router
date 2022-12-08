import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { credentials } from '../App';
import '../App.css';
import { Input } from './Input';
import { Header } from "./Header";
import { useSelector, useDispatch } from 'react-redux';
import { signupActions } from '../store';

// export var id = ''
// export var firstName = ''
// export var lastName = ''
function Login() {
 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    function onchange(e) {
        if (e.target.name === 'username') {
            setUsername(e.target.value)
        }
        else {
            setPassword(e.target.value)
        }
    }

    const users = useSelector(state => state.signup.users)
    const payload = users.find(user=>user.username === username && user.password === password)
    const dispatch = useDispatch()
    function login(e) {
        e.preventDefault();
        console.log(payload)

        if(payload){
            console.log('payload is', payload)
            dispatch(signupActions.info(payload))
            // console.log(dispatch(signupActions.login(username)))
            dispatch(signupActions.login(username))

            navigate('/welcome')
        }
        else{alert('incorrect username or password')}


        // for (let i = 0; i < credentials.length; i++) {
        //     if (credentials[i].username === username && credentials[i].password === password) {
        //         id = username;
        //         firstName = credentials[i].firstname;
        //         lastName = credentials[i].lastname;
        //         navigate('/welcome');
        //         setUsername('');
        //         setPassword('');
        //         return true;
        //     }
        // }
        // id = '';
        // firstName = '';
        // lastName = '';
        // alert('username or password is incorrect');
    }

    return (
        <>
            <Header element2={<Link to='signup'><button>Sign up</button></Link>} />
            <div className="signin">
                <form className='card' >
                    <Input name='username' type="text" label="Username" change={onchange} val={username} />
                    <Input name='password' type="password" label="Password" change={onchange} val={password} />
                    <br/><button onClick={login}>Login</button>
                    <Link to='signup'><button>Sign up</button></Link>
                </form>
            </div>
        </>
    );
}

export default Login;
