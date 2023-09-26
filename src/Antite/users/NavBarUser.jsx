import React ,{useState , useEffect}from 'react';
import '../users/navbaruser.css'
import { Link , useParams , useNavigate} from 'react-router-dom';
import { userCollection , doc , getDocs } from '../../Data/firebaseConfig';

function NavBarUser() {

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

    return (
        <div className='navUser'>
            <nav>
                <Link to="/"><h1>InvestCop</h1></Link>
                <ul>
                    <li><Link to={`/projetUser/${id}`}>Projet({userInfo.nbr_projet})</Link></li>
                    <li>Activité</li>
                    <li>Notification</li>
                     <li><Link to={`/assistance/${id}`}>Assistance</Link></li>
                </ul>
                <div className="profil">
                   <Link to={`/profilUser/${id}`}> 
                   <div className="user_profil">
                    <p><i class="fa fa-thin fa-circle-user"></i>  {userInfo.nom}</p>
                    </div></Link>
                </div>
            </nav>
        </div>
    );
}

export default NavBarUser;