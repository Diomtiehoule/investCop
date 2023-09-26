import React , {useState , useRef, useEffect }from 'react';
import '../Components/css/login.css'
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth,getDocs, userCollection , doc} from '../Data/firebaseConfig';
import { Link , useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Login() {


  const navigate = useNavigate()
  const [formLogin , setFormLogin ] = useState({
        email : "",
        password : ""
    });

    const { email , password} = formLogin;

  const handleChange = (e)=>{
    setFormLogin({
        ...formLogin,
        [e.target.name]: e.target.value
    });
};

  const handleLogin = async (e)=>{
    e.preventDefault();

    const userId = await recupereDocumentId(userCollection, formLogin.email, formLogin.password);

    signInWithEmailAndPassword(auth , formLogin.email , formLogin.password)
    .then((userCredential) =>{
        console.log('logged in user ID : ', userId)
        if(formLogin.email === 'abrahamdiomande85@gmail.com' && formLogin.password === '123456789'){
          console.log('connecté en tant que diomande')
        }else{
          navigate(`/profilUser/${userId}`)
        }
       
    })
    .catch((e) =>{
        console.log("vous n'avez pas de compte")
    });
};

  async function recupereDocumentId (userCollection , email , password){
    try {
        const querySnapshot = await getDocs(userCollection);
        for(const doc of querySnapshot.docs){
            const documentData = doc.data()
            const documentId = doc.id;
            if(documentData.mail === email && documentData.password === password){
                console.log(documentId, 'only id')
                return documentId;
            }
        }
        console.log('aucun document trouvé avec les identifiants')
        return null
    } catch(err){
        console.log(err)
        return null
    }
}

return (
        <div>
            <section class="container">
  <header>Connectez-vous </header>
  <form class="form" action="#" onSubmit={handleLogin}>
      <div class="input-box">
          <label>Adresse e-mail</label>
          <input required="" placeholder="Utilisateur@gmail.com" type="email" name='email' value={email} onChange={handleChange}/>
      </div>
      <div class="input-box">
          <label>Mot de passe</label>
          <input required="" placeholder="********" type="password" name='password' onChange={handleChange} value={password}/>
      </div>

      <div className="forgot">
        <p>Mot de passe oublié ?</p>
      </div>

      <button>Connexion</button>
      <div className="or">
        <div className="border1"></div>
        <p>Ou</p>
        <div className="border2"></div>
      </div>

      <div className="sigin">
        <p>Vous n'avez pas de compte ? <Link to='/register'>inscrivez-vous</Link></p>
      </div>
  </form>
</section>
        </div>
    );
}

export default Login;