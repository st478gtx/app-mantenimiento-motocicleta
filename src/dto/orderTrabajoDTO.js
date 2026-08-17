export const crearOrdenTrabajoDTO = (
    orden,
    motocicletas,
    clientes
) => {
    
    const motocicleta = motocicletas.find(
        x => x.id == orden.motocicletaId
    );

    const cliente = clientes.find(
        x => x.id == motocicleta?.clienteId
    );

    return {
        ...orden,

        motocicletaNombre: motocicleta
            ? `${motocicleta.marca} ${motocicleta.modelo}`
            : "",

        motocicletaPlaca : motocicleta?.placa ?? "",

        clienteNombre: cliente
            ? `${cliente.nombre} ${cliente.apellido}`
            : "",
    };
};

const obtenerMotocicleta = (id) =>
    motocicletas.find(x => x.id === id);

const obtenerCliente = (id) =>
    clientes.find(x => x.id === id);