import clienteAxios from './axios';

const tokenAuth = token => {
    if(token) {//Lo añade en los header
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    } else {//si el cliente cerrio sesión o si expiro
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;