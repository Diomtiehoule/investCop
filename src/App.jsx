import React , { useEffect, useState } from 'react';
import { database } from './Data/firebaseConfig';
import { uid } from 'uid';
import { set , ref, onValue , remove, update} from 'firebase/database'
import './App.css'
import Invest from './Components/Invest';
import Home from './Components/Home';
import Service from './Components/Service';
import NavBarHome from './Components/NavBarHome';

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
    });

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
    < NavBarHome /> 
    < Home />
      < Invest message = {reponse} reponse ={reponseChef}/>
      <h2>message client</h2>
      <h3>{message}</h3>
      <input type="text"  key={projet.uuid} value={projet} onChange={handleTodoChange}/>
      <input type="text"  value={description} onChange={handleDescriptionChange}/>
      <input type="number" value={cout} onChange={handleCoutChange}/>
      {isEdit ? (
        <>
          <button onClick={handleSubmitChange}>mettre a jours</button>
          <button onClick={() => setIsEdit(false)} >X</button>;
        </>
      ) : (
        <button onClick={writeDatabase}>valider</button>
      )
    }

    

      {allProjet.map((projet) => (
        <>
        <div className="projet">
        <h1>{projet.projet}</h1>
          <p>{projet.description}</p>
          <p>{projet.cout}</p>
          <button onClick={() => handleUpdate(projet)}>mise a jour</button>
          <button onClick={()=>handleDelete(projet)}>supprimer</button>
        </div>
          
        </>
      ))}
    </>
  )   
}



export default App;
