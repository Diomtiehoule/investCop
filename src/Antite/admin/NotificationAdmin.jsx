import React , {useState , useEffect} from 'react';
import { useParams , useNavigate , Link } from 'react-router-dom';
import { userCollection , getDocs , doc } from '../../Data/firebaseConfig';
import NavBarAdmin from './NavBarAdmin';

function NotificationAdmin() {
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
        <div>
            <NavBarAdmin />
            
        </div>
    );
}

export default NotificationAdmin;