import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/actionCreators';
import "./Nav.css";

function Nav() {
    const loggedIn = useSelector(s => s.loggedIn);
    const dispatch = useDispatch();

    return (
        <nav className="bg-light text-dark d-flex justify-content-between align-items-center mt-3">

            <div className="ps-3">
                <Link className="text-decoration-none" to="/">
                    All Blogs
                </Link>
            </div>

            <div>
                <Link className="text-decoration-none" to="/newBlog">
                    Start a New Blog
                </Link>
            </div>

            <div className="pe-3">
                {!loggedIn ?
                    <Link className="text-end text-decoration-none" to="/login">
                        Login
                    </Link> :
                    <Link className="text-end text-decoration-none" to="/" onClick={() => dispatch(logout())}>
                        Logout
                    </Link>
                }
            </div>

        </nav>
    );
}

export default Nav;