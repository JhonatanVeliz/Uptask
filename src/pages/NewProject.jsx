import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProject } from "../features/projects/projectsSlice";

// Components
import Nav from "../components/Nav";
import FormTextArea from "../components/FormTextArea";
import MessageError from "../components/MessageError";
import InputText from "../components/InputText";

// Helpers
import { generatorId } from "../helpers/index";

const NewProject = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialStateData = { project : '', description: '' }
  const [ InvalidText, setInvalidText ] = useState({ invalid : false, text : '' });
  const [ data, setData ] = useState(initialStateData);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout( () => {
      setInvalidText({ invalid: false, text: '' });
    }, 5000);

    const dataClean = Object.values(data).map( eachString => eachString.trim());

    if(dataClean.includes('')){
      setInvalidText({ invalid : true, text : 'Todos los campos son obligatorios' });
      return;
    }
    
    const projectData = { ...data, id : generatorId() };
    dispatch(createProject(projectData));
    setData(initialStateData);
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
            name="project"
            value={data.project}
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

export default NewProject