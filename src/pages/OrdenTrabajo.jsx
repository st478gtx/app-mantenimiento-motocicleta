import { useState } from "react";
import { zonasMoto } from "../data/zonasMoto";
import { servicios } from "../data/servicio";
import { repuestos } from "../data/repuesto";
import hondaRevel from "../assets/honda-cmx-250-c-rebel-250.webp";
import "./OrdenTrabajo.css";
import { servicioRepuestos } from "../data/servicioRepuesto";
import { formatoMoneda } from "../utils/moneda";

export default function OrdenTrabajo() {
    let zonaTrabajo = zonasMoto;

    let servicio = servicios;

    let repuestosListado = repuestos;

    let [listRespuestoId, setlistRepuestoId] = useState([]);

    const [selected, setSelected] = useState("");

    const [zona, setZona] = useState({});

    const [servicioAgregado, setServicioAgregado] = useState([]);
    const [repuestoAgregado, setRepuestoAgregado] = useState([]);

    //const [repuestoLista, setRepuestoLista] = useState([]);

    const [checkedState, setCheckedState] = useState(
        new Array(servicio.length).fill(false),
    );

    const [checkedStateRepuesto, setCheckedStateRepuesto] = useState(
        new Array(repuestosListado.length).fill(false),
    );

    const manejoCambioServicio = (id) => {
        // const updatedCheckedState = checkedState.map((item, i) =>
        //     i === posicion ? !item : item,
        // );

        // setCheckedState(updatedCheckedState);

        setServicioAgregado((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    const manejoCambioRepuesto = (id) => {
        // const updatedCheckedState = checkedStateRepuesto.map((item, i) =>
        //     i === index ? !item : item,
        // );
        // setCheckedStateRepuesto(updatedCheckedState);
        setRepuestoAgregado((prev) =>
            prev.includes(id) ? prev.filter((x) => x != id) : [...prev, id],
        );
    };

    const selecionZona = (e) => {
        setSelected(e.target.value);
        getZona(e.target.value);
    };

    function getZona(nombre) {
        let zona = zonaTrabajo.find((X) => X.nombre === nombre);

        getRepuestos(zona.id);
        setZona(zona);
    }

    function getRepuestos(zonaId) {
        let servicioZona = servicio
            .filter((x) => x.zonaId == zonaId)
            .map((x) => x.id);

        let repuestoFiltro = servicioRepuestos
            .filter((x) => servicioZona.includes(x.servicioId))
            .map((x) => x.repuestoId);

        //if (repuesto === undefined) return;

        let listRespuesto = repuestos.filter((x) =>
            repuestoFiltro.includes(x.id),
        );

        setlistRepuestoId(
            repuestos
                .filter((x) => repuestoFiltro.includes(x.id))
                .map((x) => x.id),
        );

        return listRespuesto;
    }

    const serviciosSeleccionados = servicio.filter((x) =>
        servicioAgregado.includes(x.id),
    );

    const repuestosSeleccionados = repuestosListado.filter((x) =>
        repuestoAgregado.includes(x.id),
    );

    const totalServicios = serviciosSeleccionados.reduce(
        (total, x) => total + x.precioBase,
        0,
    );

    const totalRepuestos = repuestosSeleccionados.reduce(
        (total, x) => total + x.precioVenta,
        0,
    );

    const total = totalServicios + totalRepuestos;

    function TarjetaServicioAgregada() {
        return (
            <div className="breadcrumb-container">
                {serviciosSeleccionados.map((item) => (
                    <div className="breadcrumb-item" key={item.id}>
                        {item.nombre}
                        <button onClick={() => manejoCambioServicio(item.id)}>
                            X
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    function TarjetaRepuestoAgregada() {
        return (
            <div className="breadcrumb-container">
                {repuestosSeleccionados.map((item) => (
                    <div className="breadcrumb-item" key={item.id}>
                        {item.nombre}
                        <button onClick={() => manejoCambioRepuesto(item.id)}>
                            X
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    const listaCargada = (e) =>
        servicio
            .filter((x) => x.zonaId == e)
            .map((item) => {
                return (
                    <div className="zona-check" key={item.id}>
                        <input
                            type="checkbox"
                            className="checkbox-custom"
                            name={item.nombre}
                            checked={servicioAgregado.includes(item.id)}
                            onChange={() => manejoCambioServicio(item.id)}
                        />
                        <span>{item.nombre}</span>
                    </div>
                );
            });

    const repuestoCargado = () =>
        repuestosListado
            .filter((x) => listRespuestoId.includes(x.id))
            .map((item) => {
                return (
                    <div className="zona-check" key={item.id}>
                        <input
                            type="checkbox"
                            className="checkbox-custom"
                            name={item.nombre}
                            checked={repuestoAgregado.includes(item.id)}
                            onChange={() => manejoCambioRepuesto(item.id)}
                        />
                        <span>{item.nombre}</span>
                    </div>
                );
            });

    return (
        <div className="orden-trabajo-main">
            <div className="orden-container">
                <div className="moto-container">
                    <p>
                        <strong>Seleccione una zona de la motocicleta</strong>
                    </p>
                    <img src={hondaRevel} className="moto-image" />
                    {zonaTrabajo.map((item) => {
                        return (
                            <div
                                key={item.nombre}
                                className="zona"
                                style={{
                                    left: `${item.x}%`,
                                    top: `${item.y}%`,
                                }}
                            >
                                <input
                                    type="radio"
                                    className="radio-custom"
                                    name=""
                                    value={item.nombre}
                                    checked={selected === item.nombre}
                                    onChange={selecionZona}
                                />
                                <span>{item.nombre}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="zona-servicio">
                    <div>
                        <p>
                            <strong>Zona Seleccionada</strong>
                        </p>
                        <div className="zona-titulo">{zona.nombre}</div>
                        <div className="zona-descripcion">
                            {zona.descripcion}
                        </div>
                        <div className="zona-servicio-titulo">
                            Servicios disponibles
                        </div>
                        {listaCargada(zona.id).length > 0 ? (
                            listaCargada(zona.id)
                        ) : (
                            <span>Seleccione servicios</span>
                        )}
                    </div>
                    <div className="zona-servicio-inferior">
                        {repuestoCargado().length > 0 ? (
                            <div>
                                <div className="zona-servicio-titulo">
                                    Repuestos disponibles
                                </div>
                                <div>{repuestoCargado()}</div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="zona-servicio-boton">
                        {/* <button
                            type="button"
                            className="crud-page__primary-button"
                        >
                            Agregar Servicio
                        </button> */}
                    </div>
                </div>
            </div>
            <div className="container-bottom">
                <div className="seleccion-item">
                    <div>
                        <div className="seleccion-servicio-barra">
                            <div>
                                Servicios seleccionados (
                                {serviciosSeleccionados.length})
                            </div>
                            <div className="total-pago-container">
                                Total a pagar
                                <span>
                                    {formatoMoneda(total, "PEN", "es-PE")}
                                </span>
                            </div>
                        </div>
                        {TarjetaServicioAgregada()}
                    </div>
                    <div>
                        <div className="seleccion-servicio-barra">
                            <div>
                                Repuestos seleccionados (
                                {repuestosSeleccionados.length})
                            </div>
                        </div>
                        {TarjetaRepuestoAgregada()}
                    </div>
                </div>
                <div className="botonera">
                    <button type="button" className="crud-page__cancel-button">
                        Cancelar
                    </button>
                    <button type="button" className="crud-page__primary-button">
                        Guardar orden
                    </button>
                </div>
            </div>
        </div>
    );
}
