import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMacroTask } from "../features/macroTasks/macroTaskSlice";

// Components
import Nav from "../components/Nav";
import FormTextArea from "../components/FormTextArea";
import MessageError from "../components/MessageError";
import InputText from "../components/InputText";

// Helpers
import { clearThisState } from "../utilities";

// FUNCTIONS API
import { createMacroTaskApi } from "../data/macroTasks";

const NewMacroTask = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, name } = useSelector( ({ user }) => user.userData );
  const { token } = useSelector( ({ login }) => login );

  const initialStateData = { name : '', description: '' }
  const [ data, setData ] = useState(initialStateData);
  const [ InvalidText, setInvalidText ] = useState({ invalid : false, text : '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Se utiliza para que el usuario no cree una MacroTask vacia
    const dataClean = Object.values(data).map( eachString => eachString.trim());

    if(dataClean.includes('')){
      setInvalidText({ invalid : true, text : 'Todos los campos son obligatorios' });
      setTimeout( () => setInvalidText({ invalid: false, text: '' }), clearThisState);
      return;
    }
    
    const macroTask = { name : data.name, user_id : id, description : data.description };

    try {
      const macroTaskCreated = await createMacroTaskApi( import.meta.env.VITE_API_URL + `habits`, macroTask, token );
      dispatch(createMacroTask(macroTaskCreated));
    } 
    catch (error) { console.log(error) }
    return navigate('/dashboard');
  }

  const changeData = (value, name) => {
    setData({ ...data, [name]: value });
  }

  return (
    <>
      <Nav />

      <div className='section new-proyect'>

        <h1>Crear un proyecto</h1>

        <form className="new-project__form" onSubmit={handleSubmit}>

          <MessageError invalid={InvalidText.invalid} text={InvalidText.text} />

          <InputText 
            title="Nombre del proyecto" 
            changeData={changeData}
            name="name"
            value={data.name}
          />

          <FormTextArea 
            title="Descripción del proyecto" 
            name="description" 
            changeData={changeData}
            value={data.description}
          />

          <button 
            className="new-project__form__btn"
            type="submit"
          >
            Iniciar proyecto
          </button>

        </form>

      </div>
    </>
  )
}

export default NewMacroTask;