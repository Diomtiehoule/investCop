import React , { useEffect, useState } from 'react';
import { database } from './Data/firebaseConfig';
import { uid } from 'uid';
import { set , ref, onValue , remove, update} from 'firebase/database'
import './App.css'
import Invest from './Components/Invest';
import Home from './Components/Home';
import Service from './Components/Service';
import NavBarHome from './Components/NavBarHome';
import Login from './Components/Login';
import Register from './Components/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Projet from './Components/Projet';
import Footer from './Components/Footer';
import NavBarUser from './Antite/users/NavBarUser';
import Profil from './Antite/users/Profil';
// import Activite from './Antite/admin/Activite';
import ProjetUser from './Antite/users/ProjetUser';
import ProjetAdmin from './Antite/admin/ProjetAdmin';
import Finance from './Antite/admin/Finance';
import Compte from './Antite/admin/Compte'
import NotificationAdmin from './Antite/admin/NotificationAdmin';
import Assistance from './Antite/users/Assistance';
import CompteUser from './Antite/users/CompteUser';

function App() {

  const [allProjet , setAllProjet] = useState([]);
  const [ projet , setProjet ] = useState("");
  const [ description , setDescription ] = useState('')
  const [ cout , setCout] = useState(0);
  const [ isEdit ,  setIsEdit ] = useState(false)
  const [ tempuuid , setTempuuid] = useState('');


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

 
  // write
  const writeDatabase = () => {
    const uuid = uid()
    set(ref(database , `${uuid}`),{
      projet,
      description,
      cout,
      uuid,
    });SVGUseElement

    setProjet('')
    setCout('')
    setDescription('')
  }

  const reponse = "j'adore votre projet !";
  const [message , setMessage] = useState('')

  function reponseChef(mgs){
    setMessage(mgs)
  }
  return (
    
    <>

    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Home />} />
      <Route path='/service' element={<Service />} />
       <Route path='/navbar' element={<NavBarUser />} /> 
       <Route path='/register' element={<Register />} /> 
       <Route path='/login' element={<Login />} />
       {/* partie user */}
       <Route path='/profil/:id' element={<Projet/>} /> 
       <Route path='/notification/:id' element={<Notification/>} />
       <Route path='/projetUser/:id' element={<Projet/>} />
       <Route path='/profilUser/:id' element={<Profil />} />
       <Route path='/assistance/:id' element={<Assistance />} />
       <Route path='/CompteUser/:id' element={<CompteUser/>} />
       {/* partie Administrateur */}
       <Route path='/projetAdmin/:id' element={<ProjetAdmin />} />
       <Route path='/compte/:id' element={<Compte />} />
       <Route path='/finance/:id' element={< Finance />} />
       <Route path='/notificationAdmin/:id' element={< NotificationAdmin />} />
    </Routes>
    </BrowserRouter>
    </>
  )   
}



export default App;
