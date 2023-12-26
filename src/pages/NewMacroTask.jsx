import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMacroTasksState, updateMacroTask, createMacroTask } from "../features/macroTasks/macroTaskSlice";

// Components
import Nav from "../components/Nav";
import FormTextArea from "../components/FormTextArea";
import MessageError from "../components/MessageError";
import InputText from "../components/InputText";

// Helpers
import { clearThisState } from "../utilities";
import { generatorId } from "../helpers";

// FUNCTIONS API
import { createMacroTaskApi, updateMacroTaskApi, getMacroTasks } from "../data/macroTasks";
import { createMicroTask } from "../data/microTasks";
import LoaderApp from "./LoaderApp";

const NewMacroTask = () => {

  const { taskId } = useParams();
  const stateMacroTasks = useSelector(({ macroTasks }) => macroTasks);
  const findMacroTask = stateMacroTasks.find(({ habit }) => habit.id == taskId) || false;
  const macroTaskData = findMacroTask.habit || { name: '', description: '' };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useSelector(({ user }) => user.userData);
  const { token } = useSelector(({ login }) => login);

  const initialStateData = { name: macroTaskData.name, description: macroTaskData.description }
  const [data, setData] = useState(initialStateData);
  const [InvalidText, setInvalidText] = useState({ invalid: false, text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Se utiliza para que el usuario no cree una MacroTask vacia y llena de escpacios vacios
    const dataClean = Object.values(data).map(eachString => eachString.trim());

    if (dataClean.includes('')) {
      setInvalidText({ invalid: true, text: 'Todos los campos son obligatorios' });
      setTimeout(() => setInvalidText({ invalid: false, text: '' }), clearThisState);
      return;
    }

    setIsLoading(true);

    const macroTask = { name: data.name, user_id: id, description: data.description };

    if (!taskId) {

      if (token.includes('root')) {
        dispatch(createMacroTask({ ...macroTask, id: generatorId(), created_at: new Date() }));
        return navigate(`/dashboard`);
      }

      try {
        const macroTaskCreated = await createMacroTaskApi(import.meta.env.VITE_API_URL + `habits`, macroTask, token);
        const tracker = { notes: 'Tarea : 👋 Hola te damos la Bienvenida a upConst esperamos que la app sea de tu agrado 🤗' };
        const { id } = macroTaskCreated;
        const trackerCreated = await createMicroTask(import.meta.env.VITE_API_URL + `habits/${id}/trackers`, tracker, token);
        const macroTasks = await getMacroTasks(import.meta.env.VITE_API_URL + `habits`, token);
        dispatch(createMacroTasksState(macroTasks));
        return navigate('/dashboard');
      }
      catch (error) { console.log(error) }
    }

    if (token.includes('root')) {
      dispatch(updateMacroTask({ ...macroTaskData, name: data.name, description: data.description }));
      return navigate(`/tasks/${taskId}`);
    }

    try {
      const macroTaskUpdated = await updateMacroTaskApi(import.meta.env.VITE_API_URL + `habits/${taskId}`, macroTask, token);
      dispatch(updateMacroTask({ ...macroTaskData, name: data.name, description: data.description }));
      return navigate(`/tasks/${taskId}`);
    }
    catch (error) { console.log(error) }

  }

  const changeData = (value, name) => {
    setData({ ...data, [name]: value });
  }

  return (
    <>
      <Nav />
      { isLoading && <LoaderApp />}

      <div className='section new-proyect'>

        <h1> {taskId ? 'Actualizar Tarea' : 'Crea una Tarea'} </h1>

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
            {taskId ? 'Guardar Cambios' : 'Crear Tarea'}
          </button>

        </form>

      </div>
    </>
  )
}

export default NewMacroTask;