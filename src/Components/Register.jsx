import React ,{useState , useEffect , useRef}from 'react';
import '../Components/css/registrer.css'
import { Link , useNavigate} from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  auth,
  addDoc,
  userCollection,
  getDocs,
  doc
} from '../Data/firebaseConfig'



function Register() {

  

  const navigate = useNavigate();

  const [currentUser , setCurrentUser ] = useState();
  const [loading , setLoading ] = useState(true);

  const signUp = (email , password) => createUserWithEmailAndPassword(auth , email , password)
  console.log(signUp)

  const inputs = useRef([])
  const addInputs = el => {
    if(el && !inputs.current.includes(el)){
      inputs.current.push(el)
    }
  }
  const formRef = useRef()

  const handleForm = async (e) =>{
    e.preventDefault()
    console.log(inputs)

    try {
      const cred = await signUp (
        inputs.current[1].value,
        inputs.current[2].value
      )
      formRef.current.reset()
      console.log(cred)

      console.log('inscription validé !')
    } catch (err) {
      console.log(err)
    }
  }

  const [userName , setUserName] = useState('')
  const [email , setEmail] = useState('')
  const [pwd , setPdw] = useState('')
  const [country , setCountry] = useState('')
  const [ville , setVille] = useState('')
  const [projet , setProjet ] = useState(0)

  const userData = async()=>{
    addDoc(userCollection , {
      nom : userName,
      mail : email,
      password : pwd,
      pays : country,
      ville : ville,
      nbr_projet : projet,
      smg_requete : ''
    })
    console.log(addDoc)
  }

  const [user , setUser] = useState('');
  
useEffect(()=>{
  const getUsers = async () => {
    const data = await getDocs(userCollection);
    setUser(data.docs.map(()=>({...doc.data(), id : doc.id})));
    console.log(data)
  };
  getUsers()
}, []);

    return (
        <div>
            <section class="container">
  <header>Enregistrez-vous </header>
  <form class="form" action="#" onSubmit={handleForm} ref={formRef}>
      <div class="input-box">
          <label>Nom utilisateur</label>
          <input required="" placeholder="utilisateur" type="text" ref={addInputs} onChange={(e) =>setUserName(e.target.value)}/>
      </div>
      <div class="input-box">
          <label>Adress email</label>
          <input required="" placeholder="utilisateur@gmail.com" type="email" ref={addInputs} onChange={(e) =>setEmail(e.target.value)}/>
      </div>
      <div class="input-box">
          <label>Mot de passe</label>
          <input required="" placeholder="********" type="password" ref={addInputs} onChange={(e) =>setPdw(e.target.value)}/>
      </div>
      
      <div class="input-box address">
        <label>Addresse</label>
        <div class="column">
          <div class="select-box">
            <select onClick={(e) =>setCountry(e.target.value)}>
              <option hidden="">Pays</option>
              <option>Côte d'ivoire</option>
              <option>Sénegal</option>
              <option>Mali</option>
              <option>Maroc</option>
            </select>
          </div>
        <input required="" placeholder="Ville" type="text" onChange={(e) =>setVille(e.target.value)}/>;
        </div>
      </div>
      <button onClick={userData}>Enregistrer</button>

      <div className="sigin">
        <p>Vous avez déjà un compte ? <Link to='/login'>Connectez-vous</Link></p>
      </div>
  </form>
</section>
        </div>
    );
}

export default Register;