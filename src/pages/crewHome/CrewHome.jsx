import { useNavigate } from 'react-router-dom'

const CrewHome = () => {
    const navigate = useNavigate()

    return (
        <button onClick={() => navigate('/dashboard')}>ir al dashboard</button>
    )
}

export default CrewHome