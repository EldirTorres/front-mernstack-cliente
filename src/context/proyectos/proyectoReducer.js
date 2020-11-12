import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';

/* Funciona igual al de redux, acá se cambian los states */
export default (state, action) => {
    switch(action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTOS:
           // console.log("payload eniviado a obtener proyectos", action.payload);
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false, /* para que se oculte el formulario */
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state, 
                errorformulario: true //Cuando viaja desde el formulario flujo -> componente/state/reducer
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload )
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload ),
                proyecto: null //Para resetear el proyecto
            }
        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}