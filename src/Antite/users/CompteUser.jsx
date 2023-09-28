import React ,{useState , useEffect} from 'react';
import '../users/compteUser.css';
import NavBarUser from './NavBarUser'
import { useNavigate , useParams , Link} from 'react-router-dom';
import { userCollection , getDocs , doc , updateDoc, collection , db} from '../../Data/firebaseConfig';



function CompteUser() {

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

	console.log(userInfo); 

    useEffect(() => {
        GetInfosUser(id)
    }, [id])

    const [ modal , setModal ] =useState(false)
	const toggleModal = ()=>{
		setModal(!modal)
	}


	const [pwd , setPwd] = useState('');
	console.log(pwd)
	const [montantRetrait , setMontantRetrait ] = useState(0)
	console.log(montantRetrait)

	const [solde , setSolde ] = useState(0)
	async function updateSolde(){
		const userData = doc(db, 'Users', id)
		const newFild = ({solde : userInfo.solde - Number(montantRetrait)})

		await updateDoc(userData , newFild)
		console.log('ok')
	}
	console.log(userInfo.solde)
// 	async function update(){
// 		const docUser = doc(db , "Users" , id)
// 		const newfield = ({nom : newName,
// 		pays : newPays ,  ville : newVille})
// 	await updateDoc(docUser ,  newfield)
// 	console.log('ok')

// 	setModal(!modal)
// }

	const handleSubmitRetrait = (e) => {
		e.preventDefault()
		if(montantRetrait <= 0 || montantRetrait > userInfo.solde){
			alert('Retrait impossible , veuillez verifiez votre solde ou le montant de retrait')
		}else if(montantRetrait <= userInfo.solde && pwd == userInfo.password){
			updateSolde()
				alert('retrait confirmé !!')
		}
		
	}



    return (
        <div>
            <NavBarUser />

            <div className="countUser">
                <div className="count">
                    <div className="info_count">
                        <p>Portefeuille InvestCop</p>
                        <p>Numero de compte : 123456</p>
                    </div>

                    <div className="solde_count">
                        <p>{userInfo.solde} <sup>CFA</sup></p>
                        <p>Solde total</p>
                    </div>

                    <div className="action_count">
                        <button onClick={toggleModal}>Retrait investissement</button>
                    </div>
                </div>
            </div>

            { modal && (
				
				<div className="modal">
				<div className="overlay" onClick={toggleModal}></div>
							<div className="container-projet">
					
					<div className="modal-content container-projet">
						<div className="modal__header">
							<span className="modal__title">Retrait de fond d'investissement</span><button className="button button--icon" onClick={toggleModal}><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
									<path fill="none" d="M0 0h24v24H0V0z"></path>
									<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button>
						</div>
						<div className="modal__body">
							<div className="input">
								<label className="input__label">Montant retrait</label>
								<input className="input__field" type="number" placeholder='######' onChange={(e) => setMontantRetrait(e.target.value)}/>
							</div>

							<div className="input">
								<label className="input__label">Mot de passe ( confirmation de retrait )</label>
								<input className="input__field" type="password"  placeholder='******' onChange={(e) => setPwd(e.target.value)}/> 
								<p className="input__description">Entrez le mot de passe de compte</p>
							</div>
							
						</div>
						
						<div className="modal__footer">
							<button className="button button--primary close-modal" onClick={handleSubmitRetrait}>Rétirer</button>
						</div>
					</div>
				</div>
				</div>
			)}
            
        </div>
    );
}

export default CompteUser;