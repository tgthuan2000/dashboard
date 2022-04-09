import { DependencyList, useCallback, useEffect, useRef } from 'react'

const useDebounce = (callback: Function | undefined, delay: number, dependencies: DependencyList | undefined = []) => {
    const { reset, clear } = useTimeout(callback, delay)
    useEffect(reset, [...dependencies, reset])
    useEffect(clear, [])
}

export default useDebounce

const useTimeout = (callback: Function | undefined, delay: number) => {
    const callbackRef = useRef(callback)
    const timeoutRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            callbackRef.current?.()
        }, delay)
    }, [])

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current)
    }, [])

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])

    useEffect(() => {
        set()
        return clear
    }, [delay, set, clear])

    return { reset, clear }
}
