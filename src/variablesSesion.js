export default function variableSesion() {
    const getUsuarioActual = () => {
        let usuario = localStorage.getItem('usuarioActual');
        return (usuario) ? JSON.parse(usuario) : null;
    };

    const setUsuarioActual = (usuario) => {
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    };

    const clearUsuarioActual = () => {
        localStorage.removeItem('usuarioActual');
    };

    return { getUsuarioActual, setUsuarioActual, clearUsuarioActual };
}