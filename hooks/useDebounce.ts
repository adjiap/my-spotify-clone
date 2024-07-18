// Helps for search input, to wait for users to finish typing, before running a search
import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?:number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    // Using "debounce" we will be waiting for (by default) 500 ms before we start searching something
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay || 500);
    
    return () => {
        clearTimeout(timer);        // to prevent overflow
    }
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
