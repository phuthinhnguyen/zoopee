import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { convertTime } from "./convertTime";
import { getUserprofileonline } from "../redux/action";
import { increment } from "../redux/action";
import Post from "./Post";


function Userprofileonline() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const stateselector = useSelector((state) => state);
    const [sharethinking, setSharethinking] = useState("")
    const dispatch = useDispatch();
    useEffect(() => {
        if (stateselector.user == null) {
            navigate("/");
        }
        dispatch(getUserprofileonline(stateselector.posts, state));
    }, []);
    // const blogs = useSelector(stateselector => stateselector.user.userblogs);
    if (stateselector.useronline != null) {
        const blogs = stateselector.useronline.userblogs;
        var sortedposts =
            blogs != undefined && blogs.sort((a, b) => b.createdAt - a.createdAt);
    }
    //   const sharethinkingonChange = (e) => {
    //     setSharethinking(e.target.value)
    //   }

    function reactionclick(emojiname, id, currentcount) {
        dispatch(increment(emojiname, id, currentcount));
    }
    function gotouserprofile(userId){
        navigate("/userprofileonline",{state:userId})
      }
    return (
        <div>
            {stateselector.user != null ?
                <div>
                    <Header />
                    {stateselector.useronline!=undefined &&
                     <div className="home-body userprofile-body">
                     <div className="home-body-coverphoto">
                         <img src={stateselector.useronline.coverphoto} alt="Image link not found" className="coverphoto" ></img>
                     </div>
                     <div className="home-body-avatar">
                         <img src={stateselector.useronline.avatar} alt="Image link not found" className="avatar"></img>
                     </div>
                     <h1 className="home-body-name">{stateselector.useronline.name}</h1>
                     {/* <div className="share-thinking" style={{ marginTop: 80 }}>
           <input type="text" className="form-control input-share" id="inlineFormInputGroup" placeholder="Share something about what are you thinking..." onChange={sharethinkingonChange} value={sharethinking} />
           <Link to="/addnewpost" state={sharethinking} className="button-login share-button">Share</Link>
         </div> */}
                     {stateselector.useronline != null &&
                         sortedposts != false &&
                         sortedposts.map((item, index) => (
                             <Post item={
                                 <div
                                     className="home-body-item"
                                     key={index}
                                 >
                                     <div className="home-body-item-head">
                                         <div className="home-body-item-avatar">
                                             <img src={item.avatar} alt="Image link not found" className="avatar" onClick={()=>gotouserprofile(item.userId)}></img>
                                         </div>
                                         <h5 style={{ fontSize: 16, color: "lightgray" }} onClick={()=>gotouserprofile(item.userId)}>{item.name}</h5>
                                     </div>
                                     <div className="home-body-item-post">
                                         <h3 style={{ fontSize: 24, marginTop: 0 }}>{item.title}</h3>
                                         <p style={{ fontStyle: "italic", marginTop: 15 }}>{item.body}</p>
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
                             } />
                         ))}
                 </div>}
                   
                </div>
                : navigate("/")}
        </div>
    );
}
export default Userprofileonline;
