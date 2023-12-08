import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import Nav from "../components/Nav";
import CardsDashboard from "../components/CardsDashboard";
import Modal from "../components/Modal";
import MessageWelcome from "../components/MessageWelcome";
import MessageSucces from "../components/MessageSucces";

// SLICE
import ShowMessage from "../components/ShowMessage";

// Helpers
import { getApiConst } from "../helpers";
import { getMacroTasks } from "../data/macroTasks";
import { createMacroTasksState } from "../features/macroTasks/macroTaskSlice";
import MessageDelete from "../components/MessageDelete";

const Dashboard = () => {

  const { token } = useSelector( ({ login }) => login );
  const stateMacroTasks = useSelector( ({macroTasks}) => macroTasks);
  const { id } = useSelector( ({ user }) => user.userData );
  const dispatch = useDispatch();

  const initialStateModal = localStorage.getItem('warning') ? false : true;
  const [showModal, setShowModal] = useState( token !== 'root' ? false : initialStateModal );

  useEffect(() => {

    const getDataConst = getApiConst();

    if (token !== 'root') {
      getMacrotasksUser();
    };

    localStorage.setItem('warning', JSON.stringify(true));

    // Agregar un event listener para que al salir el usuario se elimine su registro
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

  }, []);

  const getMacrotasksUser = async () => {

    try {
      const macroTasks = await getMacroTasks(import.meta.env.VITE_API_URL + `habits`, token);
      if(macroTasks.length === stateMacroTasks.length) return;

      dispatch(createMacroTasksState(macroTasks));
    } 
    catch (error) { console.log(error) };

  }

  const handleBeforeUnload = () => {
    localStorage.removeItem('warning');
  }

  return (
    <>

      <Nav />
      <MessageWelcome />
      <MessageSucces title="¡ Exito !" message="Nueva Tarea Creada" id="macroTaskCreated"/>
      <MessageDelete title="¡ Exito !" message="Tarea Eliminada" id="taskDelete"/>

      <section className='section dashboard'>

        <h1>Dashboard</h1>

        <div className="dashboard__container">

          <div className="dashboard__container__btn">
            <NavLink to={`/new-project/${token}`} className='dashboard__container__btn__item'>
              Crear Nueva Tarea
            </NavLink>
          </div>

          {
            stateMacroTasks.length !== 0
              ? stateMacroTasks.map(( { habit } ) => (
                <CardsDashboard
                  key={habit.id}
                  routeTo={`/tasks/${habit.id}`}
                  name={habit.name}
                  description={habit.description}
                  id={habit.id}
                />
              ))
              : <ShowMessage message="listado de proyectos vacío" />
          }
        </div>

        {
          showModal &&
            <Modal 
              title="Advertencia" 
              text="Hola, por ahora estas de visita eso significa que cuando salgas no podremos guardar tus cambios y tareas. Pero puedes crear una cuenta totalmente gratuita para que podamos llevar un seguimiento de tus tareas. ¡ Espero que la aplicación sea de tu agrado !"
            />
        }

      </section>
    </>
  )
}

export default Dashboard