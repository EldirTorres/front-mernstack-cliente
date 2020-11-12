import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

/* Componente para proteger las rutas -> "component: Component, ...props" componente de orden superior o 
componente que contiene  a otro componente toma una copi de los props -> ...props*/
const RutaPrivada = ({ component: Component, ...props  }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext; //con el atrubuto cargando evitamos el parpadeo al actualizar

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);//en ocaciones pasa que la app se cicla "no deja hacer nada" para eso utilizamos la line 14 -> // eslint-disable-next-line

    /* Cuando el usuario no este autenticado se redirigira al login */
    return ( 
        <Route { ...props } render={ props => !autenticado && !cargando ?  ( /* Validamos con -> render */
            <Redirect to="/" /> /* pagina principal */
        )  : (
            <Component {...props} /> /* si no lo enviamos al componente */
        ) } />

     );
}
 
export default RutaPrivada;