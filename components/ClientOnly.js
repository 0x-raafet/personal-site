import { useEffect, useState } from 'react'

export default function ClientOnly(props) {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) return null
  return <>{props.children}</>
}
