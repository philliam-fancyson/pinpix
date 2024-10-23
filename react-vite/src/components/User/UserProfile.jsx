import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../../redux/user";

export default function UserProfile() {
    const dispatch = useDispatch()
    const { username } = useParams();
    const [isUser, setIsUser] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        const fetchUser = dispatch(getUserByUsername(username))
        if (sessionUser.username === username) setIsUser(true)
    }, [username])

    return (
        <div>
        <h1>User Profile</h1>
        </div>
    );
}
