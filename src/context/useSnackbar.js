import { useContext } from 'react'
import { SnackbarContext } from './SnackbarContext'

export function useSnackbar() {
    const context = useContext(SnackbarContext)

    if (!context) {
        throw new Error (
            'useSnackbar debe utilizarse dentro de SnacjbarProvider'
        )
    }

    return context
}