import React, { useState , useEffect} from 'react';
import '../admin/compte.css'
import NavBarAdmin from './NavBarAdmin';
import { useParams , useNavigate , Link} from 'react-router-dom'
import { onSnapshot } from 'firebase/firestore';
import { userCollection } from '../../Data/firebaseConfig';

function Compte() {
    const [userInfo, setUserInfo] = useState({})
    let {id} = useParams()
    async function GetInfosUser(id){
        try{
            const querySnapshot = await getDocs(userCollection)
        for(const doc of querySnapshot.docs){
            const documentData = doc.data();
            const documentId = doc.id;
            if(id === documentId){
                setUserInfo(documentData)
                consolee.log(userInfo);
            }
        }
        console.log('dashboard');
    }
    catch(err){
        console.log('erreur de recuperation')
    }
        
    }

    useEffect(() => {
        GetInfosUser(id)
    }, [id])

    const [ user , setUser ] = useState([])
    console.log(user)

    useEffect(
         () => 
         onSnapshot(userCollection , (snapshot) =>
            setUser(snapshot.docs.map(doc => doc.data()))
        ),
        []
    );


    return (
        <div className='compteUser'>
            < NavBarAdmin />


            <h1>Utilisateur InvestCop</h1>
        <div className="listUser">

       
       {/* {user && ((user) => {
             
       })} */}

<div class="cardUser">
             <div class="card-photo"></div>
             <div class="card-title">Diom<br />
                 <span>Membre InvestCop</span>
             </div>
             <div class="card-socials">
                 
                 <p>Projet <br /> 20</p>
                 <p>Pays <br /> cote d'ivoire</p>
                 <p>Ville <br /> abidjan</p>
             </div>
         </div>
           




</div>   
        </div>
    );
}

export default Compte;