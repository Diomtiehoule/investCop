import React, { useState , useEffect } from 'react';
import '../Components/css/projet.css';
import NavBarUser from '../Antite/users/NavBarUser';
import {set , ref, onValue , remove, update} from 'firebase/database';
import { addDoc, database, getDocs, userCollection , updateDoc , doc , db} from '../Data/firebaseConfig';
import { uid , } from 'uid';
import { useParams } from 'react-router-dom';

function Projet() {

	
	const [allProjet , setAllProjet] = useState([]);
	const [ projet , setProjet ] = useState("");
	const [ description , setDescription ] = useState('')
	const [ cout , setCout] = useState(0);
	const [ isEdit ,  setIsEdit ] = useState(false)
	const [ tempuuid , setTempuuid] = useState('');

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
  
	const handleTodoChange = (e) =>{
	  setProjet(e.target.value)
	}
	const handleCoutChange = (e) =>{
	  setCout(e.target.value)
	}
	const handleDescriptionChange = (e) =>{
	  setDescription(e.target.value)
	}
	
  
	//update
	const handleUpdate = (projet) => {
	  setIsEdit(true);
	  setTempuuid(projet.uuid);
	}
  
	
	const handleSubmitChange = () =>{
	  update(ref(database , `${tempuuid}`) , {
		projet,
		cout,
		description,
		uuid : tempuuid,
	  })
  
	  setProjet('')
	  setCout('')
	  setDescription('')
	  setIsEdit(false)
  
	}
	//delete
	const handleDelete = (projet) =>{
	  remove(ref(database, `/${projet.uuid}`))
	  reduceProjet()
	}

	async function reduceProjet(){
		if(nbr_projet === 0){
			const docUser = doc(db , 'Users' , id)
		    const newFild = ({nbr_projet : userInfo.nbr_projet -= 1})
		    await updateDoc(docUser , newFild)
		}
		 
		 console.log(userInfo.nbr_projet)
	}
	// read
	useEffect(() =>{
	  onValue(ref(database) , snapshot => {
		setAllProjet([]);
		const data = snapshot.val()
		console.log(data)
		if(data !== null){
		  Object.values(data).map(projet =>{
			setAllProjet((oldArray) => [...oldArray , projet])
		  }) 
		
		}
	  })
	}, [])
  
   const [date , setDate ] = useState(Date());
   let jours = new Date()
   
    let nom = userInfo.nom;

	// write
	const writeDatabase = () => {
	  const uuid = uid()
	  set(ref(database , `${uuid}`),{
		projet,
		description,
		cout,
		uuid,
		nom,
		jours,
		date,
	  });
  
	  setProjet('')
	  setCout('')
	  setDescription('')
	  setModal(!modal)

	  updateProjet()
	}

	async function updateProjet(){
		const docUser = doc(db , 'Users', id);
		const newfield = {nbr_projet : userInfo.nbr_projet += 1 }
		await updateDoc(docUser , newfield)
  
		console.log(userInfo.nbr_projet);
	}
  
	const reponse = "j'adore votre projet !";
	const [message , setMessage] = useState('')
  
	function reponseChef(mgs){
	  setMessage(mgs)
	}

	const [ modal , setModal ] =useState(false)
	const toggleModal = ()=>{
		setModal(!modal)
	}

    return (
        <div>
			< NavBarUser />

			<div className="new_projet">
			<div className="no_projet">
			{/* <p>Vous n'avez pas de projet , créer un nouveau projet</p> */}
			<button onClick={toggleModal} className='btn-modal'>Nouveau projet</button>
			</div>
			
			</div>

			{allProjet.map((projet) => (
        <>

		<div className="card">
  <span className="title">Projet : {projet.projet}</span>
  <div className="comments">
    <div className="comment-react">
      
    </div>
    <div className="comment-container">
      <div className="user">
        <div className="user-pic">
          <svg fill="none" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linejoin="round" fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"></path>
            <path stroke-width="2" fill="#707277" stroke="#707277" d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"></path>
          </svg>
        </div>
        <div className="user-info">
          <span>{projet.nom}</span>
          <p>{projet.date}</p>
        </div>
      </div>
      <p className="comment-content">
	  {projet.description}.
      </p>
    </div>
  </div>
  <div className="fonds">
	<p><span>Investissement :</span> {projet.cout} CFA</p>
  </div><br /><br />

 
	<button className="delete_Projet" onClick={()=>handleDelete(projet)}>Suppprimer</button>
  

  <div className="text-box">
    <div className="box-container">
      <textarea placeholder="Reply"></textarea>
      <div>
        <div className="formatting">
          <button type="button">
            <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#707277" d="M5 6C5 4.58579 5 3.87868 5.43934 3.43934C5.87868 3 6.58579 3 8 3H12.5789C15.0206 3 17 5.01472 17 7.5C17 9.98528 15.0206 12 12.5789 12H5V6Z" clip-rule="evenodd" fill-rule="evenodd"></path>
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#707277" d="M12.4286 12H13.6667C16.0599 12 18 14.0147 18 16.5C18 18.9853 16.0599 21 13.6667 21H8C6.58579 21 5.87868 21 5.43934 20.5607C5 20.1213 5 19.4142 5 18V12"></path>
            </svg>
          </button>
          <button type="button">
            <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-width="2.5" stroke="#707277" d="M12 4H19"></path>
              <path stroke-linecap="round" stroke-width="2.5" stroke="#707277" d="M8 20L16 4"></path>
              <path stroke-linecap="round" stroke-width="2.5" stroke="#707277" d="M5 20H12"></path>
            </svg>
          </button>
          <button type="button">
            <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#707277" d="M5.5 3V11.5C5.5 15.0899 8.41015 18 12 18C15.5899 18 18.5 15.0899 18.5 11.5V3"></path>
              <path stroke-linecap="round" stroke-width="2.5" stroke="#707277" d="M3 21H21"></path>
            </svg>
          </button>
          <button type="button">
            <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#707277" d="M4 12H20"></path>
            <path stroke-linecap="round" stroke-width="2.5" stroke="#707277" d="M17.5 7.66667C17.5 5.08934 15.0376 3 12 3C8.96243 3 6.5 5.08934 6.5 7.66667C6.5 8.15279 6.55336 8.59783 6.6668 9M6 16.3333C6 18.9107 8.68629 21 12 21C15.3137 21 18 19.6667 18 16.3333C18 13.9404 16.9693 12.5782 14.9079 12"></path>
            </svg>
          </button>
          <button type="button">
            <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
<circle stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#707277" r="10" cy="12" cx="12"></circle>
<path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#707277" d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15"></path>
<path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="#707277" d="M8.00897 9L8 9M16 9L15.991 9"></path>
</svg>
          </button>
          <button type="submit" className="send" title="Send">
            <svg fill="none" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#ffffff" d="M12 5L12 20"></path>
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#ffffff" d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
          
        </>
      ))}
			
			
			{ modal && (
				
				<div className="modal">
				<div className="overlay" onClick={toggleModal}></div>
							<div className="container-projet">
					
					<div className="modal-content container-projet">
						<div className="modal__header">
							<span className="modal__title">Nouveau Projet</span><button className="button button--icon" onClick={toggleModal}><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
									<path fill="none" d="M0 0h24v24H0V0z"></path>
									<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button>
						</div>
						<div className="modal__body">
							<div className="input">
								<label className="input__label">Nom de Projet</label>
								<input className="input__field" type="text" key={projet.uuid} value={projet} onChange={handleTodoChange}/> 
								<p className="input__description">Le titre ne peut contenir que  32 caractères</p>
							</div>
							<div className="input">
												<label className="input__label">Description</label>
								<textarea className="input__field input__field--textarea" value={description} onChange={handleDescriptionChange}></textarea>
									<p className="input__description">Donnez la description la plus claire possible de votre projet.</p>
							</div>

							<div className="input">
								<label className="input__label">Fond d'investissement</label>
								<input className="input__field" type="number"  placeholder='CFA' value={cout} onChange={handleCoutChange}/> 
								<p className="input__description">Donnez le  fond nécéssaire au projet</p>
							</div>
							
						</div>
						
						<div className="modal__footer">
							<button className="button button--primary close-modal"  onClick={writeDatabase}>Créer le projet</button>
						</div>
					</div>
				</div>
				</div>
			)}
			
      {/* <h2>message client</h2>
      <h3>{message}</h3>
      <input type="text"  key={projet.uuid} value={projet} onChange={handleTodoChange}/>
      <input type="text"  value={description} onChange={handleDescriptionChange}/>
      <input type="number" value={cout} onChange={handleCoutChange}/>
      {isEdit ? (
        <>
          <button onClick={handleSubmitChange}>mettre a jours</button>
          <button onClick={() => setIsEdit(false)}>X</button>
        </>
      ) : (
        <button onClick={writeDatabase}>valider</button>
      )
    } */}

	

    

      


         
        </div>
    );
}

export default Projet;