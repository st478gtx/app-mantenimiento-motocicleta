export const crearMotocicletaConClienteDTO = (
    motocicletas,
    clientes
) => {
    const cliente = clientes.find(
        x => x.id == motocicletas?.clienteId
    );

    return {
        ...motocicletas,
        clienteNombre: cliente
            ? `${cliente.nombre} ${cliente.apellido}`
            : "",
    }
}