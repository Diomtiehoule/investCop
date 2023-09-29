import React , {useState , useEffect} from 'react';
import { useParams , useNavigate , Link } from 'react-router-dom';
import { userCollection , getDocs , doc , collection , db} from '../../Data/firebaseConfig';
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

    const [allRequete , setAllRequete] = useState([])

async function fetchAllUser(e){
    e.preventDefault();
    const querySnapshot = await getDocs(collection(db, "Users" ,'SF'));
    querySnapshot.forEach((doc) => {
setAllRequete((prev) => {
    return [...prev, doc.data()]
})
console.log(doc.id, " => ", doc.data());
console.log(allRequete);
});

}


    return (
        <div>
            <NavBarAdmin />

            <div className="list_notification">
                <button onClick={fetchAllUser}>voir  vos reponse</button>
            </div>
            
            {allRequete.map((doc) =>{
                return (
                    <>
                    <div class="cookie-card">
    <span class="title">Reponse Projet</span>
    <p class="description">{doc.smg_requete}</p>
    <div class="actions">
        
        <button class="accept">
            Accepter
        </button>
    </div>
</div>
                    </>
                )
            })}
            
        </div>
    );
}

export default NotificationAdmin;