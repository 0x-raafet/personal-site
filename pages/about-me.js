import dynamic from 'next/dynamic'
const Jebaited = dynamic(() => import('components/Jebaited'), { ssr: false })

export default function AboutMe() {
  return <Jebaited />
}
