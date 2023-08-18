import { useSelector } from 'react-redux';

const AttendeeOnlyRoute = ({children}) => {
    const user = useSelector(state => state.auth.user)
    if(user?.is_attendee){
        return (children);
    }
    return (children)
}

export default AttendeeOnlyRoute
