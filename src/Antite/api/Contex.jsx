import React ,{ createContext , useState , useEffect}from 'react';
import {
    signInWithEmailAndPassword , 
    createUserWithEmailAndPassword,
    auth
} from '../../Data/firebaseConfig'

function Contex(props) {

    const [currentUser , setCurrentUser ] = useState();
    const [loading , setLoading ] = useState(true);

    const signUp = (email , pwd) => createUserWithEmailAndPassword(auth , email , password)
    return (
        <div>
            
        </div>
    );
}

export default Contex;