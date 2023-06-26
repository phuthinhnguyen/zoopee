import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { convertTime } from "./convertTime";
import { getUserprofile } from "../redux/action";
import { increment } from "../redux/action";
import Post from "./Post";


function Userprofile() {
  const navigate = useNavigate();
  const stateselector = useSelector((state) => state);
  const [sharethinking, setSharethinking] = useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    if (stateselector.user == null) {
      navigate("/");
    }
  }, []);
  // const blogs = useSelector(stateselector => stateselector.user.userblogs);
  if (stateselector.user != null) {
    const blogs = stateselector.user.userblogs;
    var sortedposts =
      blogs != undefined && blogs.sort((a, b) => b.createdAt - a.createdAt);
  }

  const sharethinkingonChange = (e) => {
    setSharethinking(e.target.value)
  }

  function reactionclick(emojiname, id, currentcount) {
    dispatch(increment(emojiname, id, currentcount));
  }
  return (
    <div>
      {stateselector.user != null ?
        <div>
          <Header />
          <div className="home-body userprofile-body">
            <div className="home-body-coverphoto">
              <img src={stateselector.user.coverphoto} alt="Image link not found" className="coverphoto"></img>
            </div>
            <div className="home-body-avatar">
              <img src={stateselector.user.avatar} alt="Image link not found" className="avatar"></img>
            </div>
            <h1 className="home-body-name">{stateselector.user.name}</h1>
            <div className="share-thinking" style={{ marginTop: 80 }}>
              <input type="text" className="form-control input-share" id="inlineFormInputGroup" placeholder="Share something about what are you thinking..." onChange={sharethinkingonChange} value={sharethinking} />
              <Link to="/addnewpost" state={sharethinking} className="button-login share-button">Share</Link>
            </div>
            {stateselector.user != null &&
              sortedposts != false &&
              sortedposts.map((item, index) => (
                <Post item={
                  <div
                    className="home-body-item"
                    key={index}
                  >
                    <div className="home-body-item-head">
                      <div className="home-body-item-avatar">
                        <img src={item.avatar} alt="Image link not found" className="avatar"></img>
                      </div>
                      <h5 style={{ fontSize: 16, color: "lightgray" }}>{item.name}</h5>
                    </div>
                    <div className="home-body-item-post">
                      <h3 style={{ fontSize: 24, marginTop: 0 }}>{item.title}</h3>
                      <p style={{ fontStyle: "italic", marginTop: 15 }}>{item.body}</p>
                      <div>
                        <Link to="/viewpost" stateselector={item} onClick={() => {
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
                } />
              ))}
          </div>
        </div>
        : navigate("/")}
    </div>
  );
}
export default Userprofile;
