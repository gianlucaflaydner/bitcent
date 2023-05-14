import { useContext } from 'react'
import { useRouter } from 'next/router'
import AuthenticationContext from '@/data/contexts/AuthenticationContext'
import Loading from '../template/Loading'

interface ForceAuthenticationProps {
    children: any
}

export default function ForceAuthentication(props: ForceAuthenticationProps) {
    const router = useRouter()
    const { user, loading } = useContext(AuthenticationContext)

    if (loading) {
        return <Loading />
    } else if (user?.email) {
        return props.children
    } else {
        router.push('/')
        return <Loading />
    }
}