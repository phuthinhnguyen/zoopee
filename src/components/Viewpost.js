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
      className="mt-5 col-6 m-auto row"
      style={{ border: "1px solid black", borderRadius: 10, padding: 20 }}
    >
      <div className="">
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
        <div className="mt-4" style={{ userSelect: "none" }}>
          <a
            style={{ marginRight: 10, cursor: "pointer" }}
            onClick={() =>
              reactionclick("thumbsUp", iteminfo.id, iteminfo.thumbsUp)
            }
          >
            👍 {iteminfo.thumbsUp}
          </a>
          <a
            style={{ marginRight: 10, cursor: "pointer" }}
            onClick={() => reactionclick("wow", iteminfo.id, iteminfo.wow)}
          >
            😮 {iteminfo.wow}
          </a>
          <a
            style={{ marginRight: 10, cursor: "pointer" }}
            onClick={() =>
              reactionclick("heart", iteminfo.id, iteminfo.heart)
            }
          >
            ❤️ {iteminfo.heart}
          </a>
          <a
            style={{ marginRight: 10, cursor: "pointer" }}
            onClick={() =>
              reactionclick("rocket", iteminfo.id, iteminfo.rocket)
            }
          >
            🚀 {iteminfo.rocket}
          </a>
          <a
            style={{ marginRight: 10, cursor: "pointer" }}
            onClick={() =>
              reactionclick("coffee", iteminfo.id, iteminfo.coffee)
            }
          >
            ☕ {iteminfo.coffee}
          </a>
        </div>
      </div>
    </div>
    <Link className="btn btn-primary m-auto mt-5 col-1 d-block" to="/home">
      Back
    </Link>
    </div> 
    :navigate("/")}
     
     
    </>
  );
}
export default Viewpost;
