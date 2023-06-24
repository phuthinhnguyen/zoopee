import { useDispatch, useSelector } from "react-redux";
import { banuser, deletepost, getPost, getallusers, increment, login, toadmin } from "../redux/action";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { convertTime } from "./convertTime";

function Adminworkspace() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state);

    useEffect(() => {
        dispatch(getPost());
        dispatch(getallusers())
    }, []);

    // console.log(state.allusers)
    const sortedposts = state.posts.sort((a, b) => b.createdAt - a.createdAt);

    function reactionclick(emojiname, id, currentcount) {
        dispatch(increment(emojiname, id, currentcount));
    }

    function deletepostclick(id) {
        dispatch(deletepost(id));
    }

    function banuserclick(id) {
        dispatch(banuser(id))
    }

    function toadminclick(id){
        dispatch(toadmin(id))
    }
    return (
        <div>
            {state.user != null ?
                <div>
                    <Header />
                    <div className="adminworkspace-wrap">
                        <div className="adminworkspace-analytics">
                            <div className="adminworkspace-analytics-users">
                                <h2>All users</h2>
                                <table className="table adminworkspace-analytics-users-table">
                                    <thead>
                                        <tr>
                                            <th>UserId</th>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.allusers && state.allusers.map((item, index) =>
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.username}</td>
                                                <td>{item.password}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>
                                                <td>
                                                    {(item.id != state.user.id) ? ((item.role != "admin" || item.id != 1) ?
                                                        <button className="button-login" onClick={()=>banuserclick(item.id)}>Ban user</button>
                                                        : <button className="button-disabled">Ban user</button>)
                                                        : <button className="button-disabled">Me</button>}

                                                    {(item.id != state.user.id) ? ((item.role != "admin" && item.id != 1) ?
                                                        <button className="button-login" style={{ marginTop: 10 }} onClick={()=>toadminclick(item.id)}>To Admin</button>
                                                        : <button className="button-disabled" style={{ marginTop: 10 }}>To Admin</button>)
                                                        : <button className="button-disabled" style={{ marginTop: 10 }}>Me</button>
                                                    }

                                                  
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>

                            </div>
                            <div className="adminworkspace-analytics-filter">
                                <h2>Filter</h2>
                            </div>
                        </div>
                        <div className="adminworkspace-posts">
                            <h2>All posts of users</h2>
                            {sortedposts.map((item, index) => (
                                <div className="adminworkspace-posts-wrap">
                                    <div
                                        className="home-body-item"
                                        key={index}
                                    >
                                        <div className="">
                                            <h3>{item.title}</h3>
                                            <p style={{ fontStyle: "italic" }}>{item.body}</p>
                                            <div>
                                                <Link to="/viewpost" state={item}>
                                                    View Post
                                                </Link>
                                                <a style={{ marginLeft: 10 }}> by </a>
                                                <a style={{ fontWeight: 500 }}>{item.author}</a>
                                                <a
                                                    style={{ marginLeft: 10, fontStyle: "italic", fontSize: 14 }}
                                                >
                                                    {" "}
                                                    {convertTime(item.createdAt)}
                                                </a>
                                            </div>
                                            <div className="reaction-wrap">
                                                <a
                                                    className="reaction"
                                                    onClick={() =>
                                                        reactionclick("thumbsUp", item.id, item.thumbsUp)
                                                    }
                                                >
                                                    👍 {item.thumbsUp}
                                                </a>
                                                <a
                                                    className="reaction"
                                                    onClick={() => reactionclick("wow", item.id, item.wow)}
                                                >
                                                    😮 {item.wow}
                                                </a>
                                                <a
                                                    className="reaction"
                                                    onClick={() => reactionclick("heart", item.id, item.heart)}
                                                >
                                                    ❤️ {item.heart}
                                                </a>
                                                <a
                                                    className="reaction"
                                                    onClick={() => reactionclick("rocket", item.id, item.rocket)}
                                                >
                                                    🚀 {item.rocket}
                                                </a>
                                                <a
                                                    className="reaction"
                                                    onClick={() => reactionclick("coffee", item.id, item.coffee)}
                                                >
                                                    ☕ {item.coffee}
                                                </a>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="adminworkspace-posts-action">
                                        <div><Link to="/updatepost" state={item} className="button-back">
                                            Edit
                                        </Link></div>
                                        <div style={{ marginTop: 20 }}><button className="button-back" onClick={() => deletepostclick(item.id)}>Delete</button></div>
                                    </div>
                                </div>


                            ))}
                        </div>
                    </div>

                </div>
                : navigate("/")}
        </div>
    );
}
export default Adminworkspace;
