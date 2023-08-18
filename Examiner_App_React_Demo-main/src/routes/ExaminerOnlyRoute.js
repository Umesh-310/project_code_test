import { useNavigate } from 'react-router-dom';

const ExaminerOnlyRoute = ({user, children}) => {
    const navigate = useNavigate()
    
    if(user?.is_examiner){
        return (children);
    }
    else{
        navigate('/auth/login')
    }
}

export default ExaminerOnlyRoute
