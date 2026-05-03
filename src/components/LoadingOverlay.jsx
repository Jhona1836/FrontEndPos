import CardLoader from './cardLoader'

export default function LoadingOverlay({ loading }) {
    if (!loading) return null

    return (
        <>

            <div className="fixed inset-0 z-40
                            flex items-center justify-center bg-white/80 backdrop-blur-sm">

                <CardLoader
                    size={320}
                    text="Cargando..."
                />
            </div>
        </>
    )
}