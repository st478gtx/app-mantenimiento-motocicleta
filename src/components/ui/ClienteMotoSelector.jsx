import { useMemo } from "react";

export default function ClienteMotoSelector({
    clientes,
    motocicletas,
    clienteId,
    motocicletaId,
    onClienteChange,
    onMotocicletaChange,
}) {
    const motocicletasDelCliente = useMemo(() => {
        if (!clienteId) return [];

        return motocicletas.filter(
            (moto) => String(moto.clienteId) === String(clienteId),
        );
    }, [motocicletas, clienteId]);
    return (
        <>
            <label className="crud-modal__field">
                <span>Cliente</span>

                <select
                    value={clienteId}
                    onChange={(event) => onClienteChange(event.target.value)}
                    required
                >
                    <option value="">Seleccionar cliente...</option>

                    {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nombre} {cliente.apellido}
                        </option>
                    ))}
                </select>
            </label>

            <label className="crud-modal__field">
                <span>Motocicleta</span>

                <select
                    value={motocicletaId}
                    onChange={(event) =>
                        onMotocicletaChange(event.target.value)
                    }
                    disabled={!clienteId || motocicletasDelCliente.length === 0}
                    required
                >
                    <option value="">
                        {!clienteId
                            ? "Selecciona primero un cliente..."
                            : motocicletasDelCliente.length === 0
                              ? "El cliente no tiene motocicletas"
                              : "Seleccionar motocicleta..."}
                    </option>

                    {motocicletasDelCliente.map((moto) => (
                        <option key={moto.id} value={moto.id}>
                            {moto.placa} - {moto.marca} {moto.modelo}
                        </option>
                    ))}
                </select>
            </label>
        </>
    );
}
