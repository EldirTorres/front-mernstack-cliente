import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ListadoProyectos = () => {

    // Extrar proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // Obtener proyectos cuando carga el componente
    //Antes del useEffect no puede haber un return
    useEffect(() => {
        // si hay un error
        if(mensaje) {
           mostrarAlerta(mensaje.msg, mensaje.categoria); //se pasa "mensaje.msg, mensaje.categoria" porque en el state se envia de esta manera -> EJ: proyectostate line 111
        }

        obtenerProyectos();
        //Con esto eliminamos la advertencia, en este caso porque sabemos que esta bien y no tenemos dependencia faltante
        // eslint-disable-next-line
    }, [mensaje]);//la pasamos como dependencia, para poder acceder al valor

    // revisar si proyectos tiene contenido
    if(proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p>;

    return ( 

        <ul className="listado-proyectos">
            
        
            { alerta   ? ( <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>  ) : null  }


            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;