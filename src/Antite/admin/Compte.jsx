import React, { useState , useEffect} from 'react';
import '../admin/compte.css'
import NavBarAdmin from './NavBarAdmin';
import { useParams , useNavigate , Link} from 'react-router-dom'
import { onSnapshot } from 'firebase/firestore';
import { collection , db, userCollection , getDocs} from '../../Data/firebaseConfig';


function Compte() {
	const [userInfo , setUserInfo ] = useState({})
	let {id} = useParams();
	console.log('id' , id)

	async function getInfosUser(id){
		try{
			const querySnapshot = await getDocs(userCollection)
			for(const doc of querySnapshot.docs){
				const documentData = doc.data();
                console.log(documentData)
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


    const [allUser , setAllUser] = useState([])

    async function fetchAllUser(e){
        e.preventDefault();
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
    setAllUser((prev) => {
        return [...prev, doc.data()]
    })
  console.log(doc.id, " => ", doc.data());
  console.log(allUser)
});

    }
    useEffect(() =>{
		fetchAllUser()
	}, [])


    return (
        <div className='compteUser'>
            < NavBarAdmin />


            <h1>Utilisateur InvestCop</h1>
        <div className="listUser">

       
       {/* {user && ((user) => {
             
       })} */}


         <button onClick={fetchAllUser}>button</button>

         {allUser.map((doc) => {
            return (
                <>
                <div class="cardUser">
             <div class="card-photo"></div>
             <div class="card-title">{doc.nom}<br />
                 <span>Membre InvestCop</span>
             </div>
             <div class="card-socials">
                 
                 <p>Projet <br /> {doc.nbr_projet}</p>
                 <p>Pays <br /> {doc.pays}</p>
                 <p>Ville <br /> {doc.ville}</p>
             </div>
         </div>
              
                </>
            )
         })}
           




</div>   
        </div>
    );
}

export default Compte;