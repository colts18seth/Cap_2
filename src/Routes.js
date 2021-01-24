import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import BlogList from './BlogList';
import Blog from './Blog';
import Post from './Post';
import NewBlogForm from './NewBlogForm';
import NewPostForm from './NewPostForm';
import NewPostTitle from './NewPostTitle';
import EditPost from './EditPost';
import { upVoteCreator, downVoteCreator } from './actionCreators';

function Routes() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(s => (s.loggedIn));
    const currentUsername = useSelector(s => {
        if (s.currentUser) {
            return s.currentUser.username
        }
    });
    const blogTitle = useSelector(s => {
        if (s.blogDetails.blog) {
            return s.blogDetails.blog.title
        }
    });
    const author = useSelector(s => {
        if (s.blogDetails.blog) {
            return s.blogDetails.blog.username
        }
    });

    const upVote = (id, route) => {
        dispatch(upVoteCreator(id, route))
    }

    const downVote = (id, route) => {
        dispatch(downVoteCreator(id, route))
    }

    return (
        <div>
            <Switch>
                <Route exact path='/login'>
                    <Login />
                </Route>

                <Route exact path='/newBlog'>
                    {loggedIn ?
                        <NewBlogForm /> :
                        <Redirect to='/login' />
                    }
                </Route>

                <Route exact path='/newPost'>
                    {blogTitle !== undefined ?
                        <NewPostForm blogTitle={blogTitle} /> :
                        <Redirect to='/' />
                    }
                </Route>

                <Route exact path='/postTitle'>
                    <NewPostTitle />
                </Route>

                <Route exact path='/post/:title/edit'>
                    {author === currentUsername ?
                        <EditPost /> :
                        <Redirect to='/' />
                    }
                </Route>

                <Route exact path='/post/:title'>
                    <Post />
                </Route>

                <Route exact path='/blog/:title'>
                    <Blog currentUsername={currentUsername} upVote={upVote} downVote={downVote} />
                </Route>

                <Route exact path='/'>
                    <BlogList upVote={upVote} downVote={downVote} />
                </Route>

                <Redirect to='/' />
            </Switch>
        </div>
    );
}

export default Routes;