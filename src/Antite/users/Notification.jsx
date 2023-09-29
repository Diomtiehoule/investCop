import React , {useState , useEffect}from 'react';
import '../users/notification.css'
import NavBarUser from './NavBarUser';
import { useParams , Link , useNavigate } from 'react-router-dom';
import { userCollection , collection , db ,  } from '../../Data/firebaseConfig';

function Notification() {

    let navigate = useNavigate()
    const [userInfo , setUserInfo] = useState({})
    let {id} = useParams()

    async function GetInfosUser(id){
        try{
            const querySnapshot =  await getDocs(userCollection)
            for(const doc of querySnapshot.docs){
                const documentData = doc.data();
                const documentId = doc.id;
                if(id === documentId) {
                    setUserInfo(documentData);
                    console.log(userInfo)
                }
            }
            console.log('dashboard')
        }
        catch(err){
        console.log('erreur de recuperation')
    }
}

    useEffect(()=>{
        GetInfosUser(id)
    },[id]);

    return (
        <div>
            < NavBarUser />
            
        </div>
    );
}

export default Notification;