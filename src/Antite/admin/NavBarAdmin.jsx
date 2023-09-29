import React from 'react';
import { useNavigate , useParams , Link} from 'react-router-dom'
import '../admin/navbaradmin.css';
import { useState , useEffect } from 'react';
import { userCollection , getDocs , doc } from '../../Data/firebaseConfig';


function NavBarAdmin() {
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
                    <li><Link to={`/projetAdmin/${id}`}>Projet</Link></li>
                    <li><Link to={`/notificationAdmin/${id}`}>Notification</Link></li>
                     <li><Link to={`/finance/${id}`}>financement</Link></li>
                </ul>
                <div className="profil">
                   <Link to={`/profilAdmin/${id}`}> 
                   <div className="user_profil">
                    <i class="fa fa-thin fa-circle-user"></i> <p>{userInfo.nom}</p>
                    </div></Link>
                </div>
            </nav>
        </div>
    );
}

export default NavBarAdmin;