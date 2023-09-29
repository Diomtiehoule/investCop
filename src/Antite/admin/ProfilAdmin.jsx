import React, { useEffect , useState} from 'react';
import { Link , useParams , useNavigate } from 'react-router-dom';
import { userCollection , auth , doc , getDocs, updateDoc , db } from '../../Data/firebaseConfig';
import { signOut } from 'firebase/auth';
import NavBarAdmin from './NavBarAdmin';

function ProfilAdmin() {

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

    const [ newName , setNewName ] = useState('')
    const [newPays , setNewPays ] = useState('')
    const [newVille , setNewVille ] = useState('')
    const input = document.querySelector('.input__description')

    async function update(){
            const docUser = doc(db , "Users" , id)
            const newfield = ({nom : newName,
            pays : newPays ,  ville : newVille})
        await updateDoc(docUser ,  newfield)
        console.log('ok')

        setModal(!modal)
    }

    const [modalLogOut , setModalLogOut] = useState(false)
	const [ modal , setModal ] =useState(false)
	const toggleModal = ()=>{
		setModal(!modal)
	}

    const toggleLogOut = () =>{
        setModalLogOut(!modal)
        console.log('ouvert')
    }
    const closeToggle = () =>{
        setModalLogOut(modal)
        console.log('fermé')
    }

    const logOut = async () =>{
        await signOut(auth)
        navigate('/');
        console.log('deconecté !')
    }

    return (
        <>
            <NavBarAdmin />


            {modalLogOut && (
                <div className="overlay">
                    <div class="notifications-container">
                <div class="success">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="succes-svg">
                        <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fill-rule="evenodd"></path>
                      </svg>
                    </div>
                    <div class="success-prompt-wrap">
                      <p class="success-prompt-heading">
                        Vous essayez de vous déconnecter
                      </p>
                      <div class="success-prompt-prompt">
                        <p>En êtes-vous sûre ?</p>
                      </div>
                      <div class="success-button-container">
                        <button class="success-button-main" type="button" onClick={closeToggle}>
                          Retour
                        </button>
                        <button class="success-button-secondary" type="button" onClick={logOut}>
                          Deconnexion
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </div>
                
              
            )}
            
            { modal && (
				<div className="modal">
				<div className="overlay" onClick={toggleModal}></div>
							<div className="container-projet">
					
					<div className="modal-content container-projet">
						<div className="modal__header">
							<span className="modal__title">Modifiez vos informations</span><button className="button button--icon" onClick={toggleModal}><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
									<path fill="none" d="M0 0h24v24H0V0z"></path>
									<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button>
						</div>
						<div className="modal__body">
							<div className="input">
								<label className="input__label">Nom d'utilisateur</label>
								<input className="input__field" type="text" onChange={(e) => setNewName(e.target.value)}/> 
								<p className="input__description"></p>
							</div>
							<div className="input">
												<label className="input__label">Pays</label>
                                                <input className="input__field" type="text" onChange={(e) => setNewPays(e.target.value)}/> 
								<p className="input__description"></p>
							</div>

							<div className="input">
								<label className="input__label">Ville</label>
								<input className="input__field" type="text"  placeholder='' onChange={(e) => setNewVille(e.target.value)}/> 
								<p className="input__description"></p>
							</div>
							
						</div>
						
						<div className="modal__footer">
							<button className="button button--primary close-modal" onClick={update}>Mettre à jours</button>
						</div>
					</div>
				</div>
				</div>
			)}

            <div className='profil_user'>
                
                <div className="icon_user">
                <button onClick={toggleModal} className='edit_icon'>
                <i class="fa-solid fa-pen"></i>
                </button>
                    <div className="icon_profil">
                    <i class="fa-solid fa-circle-user"></i>
                    </div>
                    <div className="information_icon">
                        <p>{userInfo.nom}</p>
                        <p>{userInfo.mail}</p>
                    </div>
                </div>
                
                <h1>Information Personnelle</h1>
                <div className="informations_personnelle">
                    <div className="personnelle">
                        <p>Pays :</p>
                        <p>{userInfo.pays}</p>
                    </div>
                    <div className="personnelle">
                        <p>Ville :</p>
                        <p> {userInfo.ville  }</p>
                    </div> 
                </div>

                <h1>Deconnexion</h1>
                <div className="logOut">
                <i class="fa-solid fa-right-from-bracket" onClick={toggleLogOut}></i>
                </div>
            
        </div>
        </>
    );
}

export default ProfilAdmin;