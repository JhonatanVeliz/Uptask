import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import Nav from "../components/Nav";
import CardsDashboard from "../components/CardsDashboard";
import Modal from "../components/Modal";
import MessageWelcome from "../components/MessageWelcome";

// SLICE
import ShowMessage from "../components/ShowMessage";

// Helpers
import { getApiConst } from "../helpers";
import { getMacroTasks } from "../data/macroTasks";
import { createMacroTasksState } from "../features/macroTasks/macroTaskSlice";

const Dashboard = () => {

  const { token } = useSelector( ({ login }) => login );
  const stateMacroTasks = useSelector( ({macroTasks}) => macroTasks);
  const { id } = useSelector( ({ user }) => user.userData );
  const dispatch = useDispatch();

  // const [ listMacroTasks, setListMacroTasks ] = useState( [] );

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
      const macroTasks = await getMacroTasks(import.meta.env.VITE_API_URL + `habits`);
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

      <section className='section dashboard'>

        <h1>Dashboard</h1>

        <div className="dashboard__container">

          <div className="dashboard__container__btn">
            <NavLink to={`/new-project/${token}`} className='dashboard__container__btn__item'>
              Crear Nuevo Proyecto
            </NavLink>
          </div>

          {
            stateMacroTasks.length !== 0
              ? stateMacroTasks.map(( {id, name, description} ) => (
                <CardsDashboard
                  key={id}
                  routeTo={`/tasks/${id}`}
                  name={name}
                  description={description}
                  id={id}
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