import React , {useState , useEffect}from 'react';
import { useParams , useNavigate , Link} from 'react-router-dom'
import { userCollection , getDocs , doc } from '../../Data/firebaseConfig';
import './finance.css'
import NavBarAdmin from './NavBarAdmin';

function Finance() {

// DEPOT-TRANSATION //

// const numCompte = document.querySelector('#Id_clients');
const nomClient = document.querySelector('#Nom');
const prenomClient = document.querySelector('#Prenom');
const contactClient = document.querySelector('#Contact');
const sexeClient = document.querySelector('#sexe');
const montantClient = document.querySelector('#Montant');
const btnTrans = document.querySelector('.send-depot-btn');
const form3=document.querySelector('.section5')

// Elements désactivés
const element1 = document.querySelectorAll('.name-content_depot');
const element2 = document.querySelector('.name-content-choix'); //flex
const element3 = document.querySelector('.profit-image_depot'); //flex

let allData = [];
let allDocId=[];



    function numCompte(e){
        if (e.target.value !== "") {
            element1.forEach((element) => {
              element.style.display = 'block';
            });
            element2.style.display = "flex";
            element3.style.display = 'flex';
            printValeur(e.target.value);
            // testCall(e.target.value)
          }else{
           element1.forEach((element) => {
              element.style.display = 'none';
            });
            element2.style.display = "none";
            element3.style.display = 'none';
         }
    ;
    }
  

async function getAllData() {
  try {
    const querySnapshot = await getDocs(userCollection);
    querySnapshot.forEach((doc) => {
      const documentData = doc.data();
      allData.push(documentData);
    });
    console.log(allData); 
    return allData;
  } catch (error) {
    throw new Error("Une erreur s'est produite : " + error);
  }
}


function printValeur(elInput) {
  // Appel de la fonction getAllData() pour récupérer les données
  getAllData().then(() => {
    const result = recupereDataCompte(allData, elInput);
  });

  
}


function recupereDataCompte(tab, elInput) {
  for (let i = 0; i < tab.length; i++) {
    const element = tab[i];
    console.log('item', element.NumCompte);
    if (element.NumCompte === elInput) {
      afficheValueInput(element)
      updateDepot(element)
      return element;
    }
  }
  return null;
}

function afficheValueInput(data){
   nomClient.value=`${userInfo.nom}`
   prenomClient.value=`${userInfo.mail}`
   contactClient.value=`${data.Contact}`
   sexeClient.value=`${data.sexe}`
}

let count = 0;
async function sendElementDepot(data) {
  const depot = {
    nomClient: nomClient.value,
    prenomClient: prenomClient.value,
    contactClient: contactClient.value,
    sexeClient: sexeClient.value,
    montantClient: montantClient.value
  };

  if (depot.montantClient === "") {
    alert('Le montant du dépôt ne peut pas être vide.');
    return;
  }

  try {
    const userRef = doc(userCollection,await recupereDocumentId(userCollection));
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    let soldActuel = userData.soldActuel || 0;

    const nouveauSoldActuel = soldActuel + Number(montantClient.value);
    count++;
    console.log(userRef, 'infos depot');
    console.log('ID utilisateur :',await recupereDocumentId(userCollection));
    console.log('Chemin vers la collection :',await recupereDocumentId(userCollection));

    await updateDoc(userRef, {
     
        soldActuel:nouveauSoldActuel,
        smsDepot:count
      
    });

    alert('Dépôt effectué avec succès !');
  } catch (error) {
    console.error("Une erreur s'est produite lors de la mise à jour du dépôt :", error);
  }

  form3.reset();
}

function updateDepot(data) {
  btnTrans.addEventListener('click', (e) => {
    e.preventDefault();
    sendElementDepot(data);
  });
}

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
            < NavBarAdmin />
            <div className="contenaire-elements4">
                <form className="section5">
                   <div className="name-data">
                       <h3>DEPOT D'ARGENT (Crédit)</h3>
                       <img src="../Ressources/Logo/menu.png" alt="" />
                   </div>
                   <div className="infos-user-trans">
                       <div className="user-trans-block">
                           <div className="name-content1">
                               <label for="Id_clients" >N° de Compte du client client</label>
                               <input type="text" id="Id_clients" className="inputs"  placeholder="#####" onChange={numCompte}/>
                           </div>
                           <div className="name-content_depot">
                               <label for="Nom">Nom</label>
                               <input type="text" id="Nom" className="inputs" />
                           </div>
                           <div className="name-content_depot">
                               <label for="Prenom">Prenom</label>
                               <input type="text" id="Prenom" className="inputs" />
                           </div>
                           <div className="name-content-choix">
                               <div className="content-two1">
                                   <label for="Contact">Contact</label>
                                   <input type="tel" id="Contact" />
                               </div>
                               <div className="content-two">
                                   <label for="Contact">Sexe</label>
                                   <select name="" id="sexe">
                                       <option value="F">F</option>
                                       <option value="M">M</option>
                                   </select>
                               </div>
                           </div>
                           <div className="name-content_depot">
                               <label for="Montant">Montant</label>
                               <input type="text" id="Montant" className="inputs" />
                           </div>
                       </div>
        </div>

        <button className="send-depot-btn" onClick={sendElementDepot}>DEPOSER</button>
        </form>
        </div>
        </div>
    );
}

export default Finance;