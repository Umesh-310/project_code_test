import { useNavigate } from 'react-router-dom';

const AuthorOnlyRoute = ({user, children}) => {
    const navigate = useNavigate()

    if(user?.is_author){
        return (children);
    }
    else{
        navigate('/auth/login')
    }
}

export default AuthorOnlyRoute
