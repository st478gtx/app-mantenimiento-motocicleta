//import PropTypes from "rop-types";

export default function DetalleModal({
    isOpen,
    eyebrow,
    title,
    modalId,
    onClose,
    children,
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="detalle-modal__overlay"
            role="presentation"
            onClick={onClose}
        >
            <div
                className="detalle-modal__panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby={modalId}
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="detalle-modal__header">
                    <div>
                        <p className="detalle-modal__eyebrow">
                            {eyebrow}
                        </p>

                        <h2
                            id={modalId}
                            className="detalle-modal__title"
                        >
                            {title}
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="detalle-modal__close"
                        onClick={onClose}
                        aria-label="Cerrar modal"
                    >
                        ×
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}

// DetalleModal.propTypes = {
//     isOpen: PropTypes.bool.isRequired,
//     eyebrow: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     modalId: PropTypes.string.isRequired,
//     onClose: PropTypes.func.isRequired,
//     children: PropTypes.node.isRequired,
// };