import React, { useReducer } from 'react';

import proyectoContext from './proyectoContext';  
import proyectoReducer from './proyectoReducer';
import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';

import clienteAxios from '../../config/axios';

/* Nota: En este archivo se definen las funciones, con esto hacemos lo que se haria con redux
pero mas sencillo este esjecuta los diferentes types*/

const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null, 
        mensaje: null
    }

    // Dispatch para ejecutar las acciones
    //esto retorna el state y las funciones de dispatch
    const [state, dispatch] = useReducer(proyectoReducer, initialState) //useReducer hook funciona igual a reducer de redux

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Obtener los proyectos
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado);
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    } 

    // Selecciona el Proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    // Elimina un proyecto
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`); // si se desea simular el error intentar volver a eliminar un id que no existe EJ: clienteAxios.delete(`/api/proyectos/${1}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }


    return (
        /* Desde acá nacen los datos */
         <proyectoContext.Provider
            value={{
                /* Recomendación -> los states con una palabra EJ: "formulario", 
                las funciones con dos palabras EJ: "errorformulario" */
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario, //funciones
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children} {/* para que se pasen a lo largo de todos los componentes */}
        </proyectoContext.Provider> 
        
    )
}

//ppor buena practica el state debe iniciar en mayusculas si no marcara un error
export default ProyectoState;