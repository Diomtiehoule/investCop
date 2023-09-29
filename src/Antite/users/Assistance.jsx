import React , {useState , useEffect} from 'react';
import {useParams , useNavigate , Link} from 'react-router-dom'
import { userCollection , auth , doc , getDocs, updateDoc , db} from '../../Data/firebaseConfig';
import './assistance.css'
import NavBarUser from './NavBarUser';

function Assistance() {

    const [userInfo , setUserInfo ] = useState({})
	let {id} = useParams();
	console.log('id' , id)

	async function getInfosUser(id){
		try{
			const querySnapshot = await getDocs(userCollection)
			for(const doc of querySnapshot.docs){
				const documentData = doc.data();
			const documentId = doc.id;
			if(id === documentId){
				setUserInfo(documentData)
				console.log(userInfo)
			}
		}
			console.log('dashboard')
		} catch(err){
			console.err("une erreur s'est produite lors de la recuperation des documents")
		}
		
	}

	useEffect(() =>{
		getInfosUser(id)
	}, [id])

	console.log(userInfo)

    const [requete , setRequete] = useState('')
    console.log(requete)

    async function update(e){

        e.preventDefault()
        const docUser = doc(db , "Users" , id)
        const newfield = ({smg_requete : requete})
    await updateDoc(docUser ,  newfield)
    console.log('ok')
}
        
    


    return (
        <div>
            < NavBarUser />
            <div className="assistance_body">
            <h1>Vous rencontrez des problème ou avez une préoccupation <br />
            Notre assistance est à votre porté</h1>

            <p>Envoyez-nous votre requête et nous vous repondrons au plus vite</p>

            <form class="form">
    <div class="title">Votre requête</div>
    <textarea placeholder="Votre message" onChange={(e) => { setRequete(e.target.value)}}></textarea>
     
    <button onClick={update}>envoyer</button>
</form>
            </div>
       
            
        </div>
    );
}

export default Assistance;