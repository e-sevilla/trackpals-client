export default function variableSesion() {
    const getUsuarioActual = () => {
        let usuario = sessionStorage.getItem('usuarioActual');
        return (usuario) ? JSON.parse(usuario) : null;
    };

    const setUsuarioActual = (usuario) => {
        sessionStorage.setItem('usuarioActual', JSON.stringify(usuario));
    };

    const clearUsuarioActual = () => {
        sessionStorage.removeItem('usuarioActual');
    };

    return { getUsuarioActual, setUsuarioActual, clearUsuarioActual };
}