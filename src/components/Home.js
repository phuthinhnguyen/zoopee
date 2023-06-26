import { useDispatch, useSelector } from "react-redux";
import { getPost, increment, login } from "../redux/action";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { convertTime } from "./convertTime";
import Post from "./Post";
import { useState } from "react";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const [sharethinking,setSharethinking] = useState("")
  // if (state.user == null) {
  //   navigate("/")
  // }

  useEffect(() => {
    dispatch(getPost());
  }, []);

  const sharethinkingonChange = (e)=>{
    setSharethinking(e.target.value)
  }
  console.log(state);
  // useEffect(() => {
  //   dispatch(getPost());
  // }, []);
  // const posts = useSelector((state) => state.posts);
  const sortedposts = state.posts.sort((a, b) => b.createdAt - a.createdAt);

  function reactionclick(emojiname, id, currentcount) {
    dispatch(increment(emojiname, id, currentcount));
  }
  function gotouserprofile(userId){
    navigate("/userprofileonline",{state:userId})
  }
  return (
    <div>
      {state.user != null ?
        <div>
          <Header />
          <div className="home-body">
            <div className="share-thinking">
            <input type="text" className="form-control input-share" id="inlineFormInputGroup" placeholder="Share something about what are you thinking..." onChange={sharethinkingonChange} value={sharethinking}/>
            <Link to="/addnewpost" state={sharethinking} className="button-login share-button">Share</Link>
            </div>
          
            {sortedposts.map((item, index) => (
              <Post item={
                <div
                  className="home-body-item"
                  key={index}
                >
                  <div className="home-body-item-head">
                    <div className="home-body-item-avatar">
                      <img src={item.avatar} alt="Image link not found" className="avatar" onClick={()=>gotouserprofile(item.userId)}></img>
                    </div>
                    <h5 style={{fontSize:16,color:"lightgray"}} onClick={()=>gotouserprofile(item.userId)}>{item.name}</h5>
                  </div>
                  <div className="home-body-item-post">
                    <h3 style={{fontSize:24,marginTop:0}}>{item.title}</h3>
                    <p style={{ fontStyle: "italic",marginTop:15}}>{item.body}</p>
                    <div>
                      <Link state={item} to="/viewpost" onClick={() => {
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
export default Home;
