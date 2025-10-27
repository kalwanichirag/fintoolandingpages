import { useEffect, useMemo, useState } from "react"

export function useViewCheck(ref) {

    const [isIntersecting, setIntersecting] = useState(false)

  const observer = useMemo(() => {
    if (typeof window === "undefined" || !ref?.current) return null;

    return new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });
  }, [ref]);


    useEffect(() => {
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return isIntersecting
}

export function useViewCheckOnce(ref) {

    const [isIntersecting, setIntersecting] = useState(false)

   const observer = useMemo(() => {
    if (typeof window === "undefined" || !ref?.current) return null;

    return new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.disconnect();
      }
    });
  }, [ref]);


    useEffect(() => {
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return isIntersecting
}