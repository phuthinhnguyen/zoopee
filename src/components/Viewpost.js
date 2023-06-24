import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { convertTime } from "./convertTime";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/action";
import { state, useState } from "react";

function Viewpost() {
  const { state } = useLocation();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, []);
  const [iteminfo, setIteminfo] = useState(state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function reactionclick(emojiname, id, currentcount) {
    setIteminfo({ ...iteminfo, [emojiname]: currentcount + 1 });
    dispatch(increment(emojiname, id, currentcount));
  }
  return (
    <>
      {user!=null ? 
       <div>
       <Header />
    <div
      className="home-body"
    >
      <div className="home-body-item">
        <h3>{iteminfo.title}</h3>
        <p style={{ fontStyle: "italic" }}>{iteminfo.body}</p>
        <div>
          {iteminfo.userId == user.id ? (
            <Link to="/updatepost" state={iteminfo}>
              Edit post
            </Link>
          ) : (
            <p style={{ display: "inline", color: "lightgray" }}>Edit post</p>
          )}
          {/* <Link to="/updatepost" state={iteminfo}>Edit post</Link> */}
          <a style={{ marginLeft: 10 }}> by </a>
          <a style={{ fontWeight: 500 }}>{iteminfo.author}</a>
          <a style={{ marginLeft: 10, fontStyle: "italic", fontSize: 14 }}>
            {" "}
            {convertTime(iteminfo.createdAt)}
          </a>
        </div>
        <div className="reaction-wrap">
          <a
            className="reaction"
            onClick={() =>
              reactionclick("thumbsUp", iteminfo.id, iteminfo.thumbsUp)
            }
          >
            👍 {iteminfo.thumbsUp}
          </a>
          <a
            className="reaction"
            onClick={() => reactionclick("wow", iteminfo.id, iteminfo.wow)}
          >
            😮 {iteminfo.wow}
          </a>
          <a
            className="reaction"
            onClick={() =>
              reactionclick("heart", iteminfo.id, iteminfo.heart)
            }
          >
            ❤️ {iteminfo.heart}
          </a>
          <a
            className="reaction"
            onClick={() =>
              reactionclick("rocket", iteminfo.id, iteminfo.rocket)
            }
          >
            🚀 {iteminfo.rocket}
          </a>
          <a
            className="reaction"
            onClick={() =>
              reactionclick("coffee", iteminfo.id, iteminfo.coffee)
            }
          >
            ☕ {iteminfo.coffee}
          </a>
        </div>
      </div>
      <Link
            className="button-back" style={{marginTop:100}}
            to="/home"
          // onClick={() => dispatch(getPost())}
          >
            Back
          </Link>
    </div>

    </div> 
    :navigate("/")}
     
     
    </>
  );
}
export default Viewpost;
