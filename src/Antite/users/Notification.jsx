import React , {useState , useEffect}from 'react';
import '../users/notification.css'
import NavBarUser from './NavBarUser';
import { useParams , Link , useNavigate } from 'react-router-dom';
import { userCollection , collection , db , getDocs } from '../../Data/firebaseConfig';

function Notification() {

    let navigate = useNavigate()
    const [userInfo , setUserInfo] = useState({})
    let {id} = useParams()

    function validRencontre(){
        swal("Confirmé!", "", "success")
    }

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

const [allNotificattion , setAllNotification] = useState([])

async function fetchAllUser(e){
    e.preventDefault();
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
setAllNotification((prev) => {
    return [...prev, doc.data()]
})
console.log(doc.id, " => ", doc.data());
console.log(allNotificattion)
});

}

    useEffect(()=>{
        GetInfosUser(id)
        fetchAllUser()
    },[id]);

    return (
        <div>
            < NavBarUser />

            <div className="list_notification">
                <button onClick={fetchAllUser}>voir  vos reponse</button>
            </div>
            
            {allNotificattion.map((doc) =>{
                return (
                    <>
                    <div class="cookie-card">
    <span class="title">Reponse Projet</span>
    <p class="description">{doc.avis_admin}</p><br />
    <p class="description">{doc.recontre_admin}</p>
    <div class="actions">
        
        <button class="accept" onClick={validRencontre}>
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

export default Notification;