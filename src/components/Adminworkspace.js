import { useDispatch, useSelector } from "react-redux";
import { banuser, deletepost, getPost, getallusers, increment, login, searchFilterChange, toadmin } from "../redux/action";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { convertTime } from "./convertTime";
import { Input, Space } from 'antd';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { a11yProps, TabPanel } from "./TabMui";
import { gettoppost } from "./analytic";
import { GrOverview } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
function Adminworkspace() {
    const { Search } = Input;
    const [searchradio, setSearchradio] = useState('title');
    const [searchtext, setSearchtext] = useState('');
    const [tabvalue, setTabvalue] = useState(0);
    const handleChangetab = (event, newValue) => {
        setTabvalue(newValue);
    };
    const onChangeradio = (e) => {
        setSearchradio(e.target.value);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const sortedposts = state.posts.sort((a, b) => b.createdAt - a.createdAt);
    const filterresult = sortedposts.filter(item => {
        return item[searchradio.toLowerCase()].includes(searchtext)
    })
    useEffect(() => {
        dispatch(getPost());
        dispatch(getallusers())
    }, []);




    function reactionclick(emojiname, id, currentcount) {
        dispatch(increment(emojiname, id, currentcount));
    }

    function deletepostclick(id) {
        dispatch(deletepost(id));
    }

    function banuserclick(id) {
        dispatch(banuser(id))
    }

    function toadminclick(id) {
        dispatch(toadmin(id))
    }

    const handleChangetextsearch = (e) => {
        setSearchtext(e.target.value)
        // dispatch(searchFilterChange(e.target.value));
    }
    return (
        <div>
            {state.user != null ?
                <div>
                    <Header />
                    <div className="adminworkspace-wrap">
                        <div className="adminworkspace-posts">
                            <h2>All posts of users</h2>
                            <div className="input-search-wrap">
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text icon-search"><BsSearch /></div>
                                    </div>
                                    <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Input text search" onChange={handleChangetextsearch} />
                                </div>
                                <div className="filter-checkbox-wrap">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={onChangeradio} value="title" checked/>
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Title
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={onChangeradio} value="body"/>
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Body
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onChange={onChangeradio} value="author"/>
                                        <label class="form-check-label" for="flexRadioDefault3">
                                            Author
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="adminworkspace-posts-showsearch">
                                {filterresult.map((item, index) => (
                                    <div className="adminworkspace-posts-wrap">
                                        <div
                                            className="home-body-item"
                                            key={index}
                                        >
                                            <div className="">
                                                <h3>{item.title}</h3>
                                                <p style={{ fontStyle: "italic" }}>{item.body}</p>
                                                <div>
                                                    <Link to="/viewpost" state={item} onClick={() => {
                                                        reactionclick("view", item.id, item.view);
                                                    }
                                                    }>
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
                        <div className="adminworkspace-analytics-users">
                            <h2>All users</h2>
                            <div className="adminworkspace-analytics-users-table-wrap">
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
                                                        <button className="button-login" onClick={() => banuserclick(item.id)}>Ban user</button>
                                                        : <button className="button-disabled">Ban user</button>)
                                                        : <button className="button-disabled">Me</button>}

                                                    {(item.id != state.user.id) ? ((item.role != "admin" && item.id != 1) ?
                                                        <button className="button-login" style={{ marginTop: 10 }} onClick={() => toadminclick(item.id)}>To Admin</button>
                                                        : <button className="button-disabled" style={{ marginTop: 10 }}>To Admin</button>)
                                                        : <button className="button-disabled" style={{ marginTop: 10 }}>Me</button>
                                                    }
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                        <div className="adminworkspace-analytics-reviews">
                            <h2>Analytic Top Reviews</h2>
                            <div className="adminworkspace-analytics-reviews-wrap">
                                <Box
                                    sx={{ flexGrow: 0.5, bgcolor: 'var(--backgroundbody)', display: 'flex', height: "100%", width: "300px", justifyContent: "space-between" }}
                                >
                                    <Tabs
                                        orientation="vertical"
                                        variant="scrollable"
                                        value={tabvalue}
                                        onChange={handleChangetab}
                                        aria-label="Vertical tabs example"
                                        sx={{ borderRight: 1, borderColor: 'divider', width: "100px" }}
                                    >
                                        <Tab label={<GrOverview fontSize={40} />} {...a11yProps(0)} />
                                        <Tab label="👍" {...a11yProps(1)} style={{ color: "white", fontSize: 35 }} />
                                        <Tab label="😮" {...a11yProps(2)} style={{ color: "white", fontSize: 35 }} />
                                        <Tab label="❤️" {...a11yProps(3)} style={{ color: "white", fontSize: 35 }} />
                                        <Tab label="🚀" {...a11yProps(4)} style={{ color: "white", fontSize: 35 }} />
                                        <Tab label="☕" {...a11yProps(5)} style={{ color: "white", fontSize: 35 }} />
                                    </Tabs>
                                    <TabPanel value={tabvalue} index={0}>
                                        {gettoppost(state.posts, "view")[0] != undefined && gettoppost(state.posts, "view").map((item, index) =>
                                            <div className="adminworkspace-posts-wrap">
                                                <div
                                                    className="home-body-item"
                                                    key={index}
                                                >
                                                    <div className="">
                                                        <h3>{item.title}</h3>
                                                        <p style={{ fontStyle: "italic" }}>{item.body}</p>
                                                        <div>
                                                            <Link to="/viewpost" state={item} onClick={() => {
                                                                reactionclick("view", item.id, item.view);
                                                            }
                                                            }>
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
                                            </div>)
                                        }
                                    </TabPanel>
                                    <TabPanel value={tabvalue} index={1}>
                                        {gettoppost(state.posts, "thumbsUp")[0] != undefined && gettoppost(state.posts, "thumbsUp").map((item, index) =>
                                            <div className="adminworkspace-posts-wrap">
                                                <div
                                                    className="home-body-item"
                                                    key={index}
                                                >
                                                    <div className="">
                                                        <h3>{item.title}</h3>
                                                        <p style={{ fontStyle: "italic" }}>{item.body}</p>
                                                        <div>
                                                            <Link to="/viewpost" state={item} onClick={() => {
                                                                reactionclick("view", item.id, item.view);
                                                            }
                                                            }>
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
                                            </div>)
                                        }
                                    </TabPanel>
                                    <TabPanel value={tabvalue} index={2}>
                                        {gettoppost(state.posts, "wow")[0] != undefined && gettoppost(state.posts, "wow").map((item, index) =>
                                            <div className="adminworkspace-posts-wrap">
                                                <div
                                                    className="home-body-item"
                                                    key={index}
                                                >
                                                    <div className="">
                                                        <h3>{item.title}</h3>
                                                        <p style={{ fontStyle: "italic" }}>{item.body}</p>
                                                        <div>
                                                            <Link to="/viewpost" state={item} onClick={() => {
                                                                reactionclick("view", item.id, item.view);
                                                            }
                                                            }>
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
                                            </div>)
                                        }
                                    </TabPanel>
                                    <TabPanel value={tabvalue} index={3}>
                                        {gettoppost(state.posts, "heart")[0] != undefined && gettoppost(state.posts, "heart").map((item, index) =>
                                            <div className="adminworkspace-posts-wrap">
                                                <div
                                                    className="home-body-item"
                                                    key={index}
                                                >
                                                    <div className="">
                                                        <h3>{item.title}</h3>
                                                        <p style={{ fontStyle: "italic" }}>{item.body}</p>
                                                        <div>
                                                            <Link to="/viewpost" state={item} onClick={() => {
                                                                reactionclick("view", item.id, item.view);
                                                            }
                                                            }>
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
                                            </div>)
                                        }
                                    </TabPanel>
                                    <TabPanel value={tabvalue} index={4}>
                                        {gettoppost(state.posts, "rocket")[0] != undefined && gettoppost(state.posts, "rocket").map((item, index) =>
                                            <div className="adminworkspace-posts-wrap">
                                                <div
                                                    className="home-body-item"
                                                    key={index}
                                                >
                                                    <div className="">
                                                        <h3>{item.title}</h3>
                                                        <p style={{ fontStyle: "italic" }}>{item.body}</p>
                                                        <div>
                                                            <Link to="/viewpost" state={item} onClick={() => {
                                                                reactionclick("view", item.id, item.view);
                                                            }
                                                            }>
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
                                            </div>)
                                        }
                                    </TabPanel>
                                    <TabPanel value={tabvalue} index={5}>
                                        {gettoppost(state.posts, "coffee")[0] != undefined && gettoppost(state.posts, "coffee").map((item, index) =>
                                            <div className="adminworkspace-posts-wrap">
                                                <div
                                                    className="home-body-item"
                                                    key={index}
                                                >
                                                    <div className="">
                                                        <h3>{item.title}</h3>
                                                        <p style={{ fontStyle: "italic" }}>{item.body}</p>
                                                        <div>
                                                            <Link to="/viewpost" state={item} onClick={() => {
                                                                reactionclick("view", item.id, item.view);
                                                            }
                                                            }>
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
                                            </div>)
                                        }
                                    </TabPanel>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
                : navigate("/")}
        </div>
    );
}
export default Adminworkspace;
