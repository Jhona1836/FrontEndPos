import { createContext, useContext, useState } from "react";

const LoadingContext = createContext()

export function LoadingProvider ({children}) {

    const [LoadingCount, setLoadingCount] = useState(0)

    const show = () => setLoadingCount(c => c + 1)

    const hide = () => setLoadingCount(c => Math.max(0, c - 1))

    const isLoading = LoadingCount > 0

  return (
        <LoadingContext.Provider value={{ isLoading, show, hide }}>
            {children}
        </LoadingContext.Provider>
    )

}

export function useLoading() {
    return useContext(LoadingContext)

}