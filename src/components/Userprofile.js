import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { convertTime } from "./convertTime";
import { getUserprofile } from "../redux/action";
import { increment } from "../redux/action";

function Userprofile() {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (state.user == null) {
      navigate("/");
    }
  }, []);
  // const blogs = useSelector(state => state.user.userblogs);
  if (state.user != null) {
    const blogs = state.user.userblogs;
    var sortedposts =
      blogs != undefined && blogs.sort((a, b) => b.createdAt - a.createdAt);
  }

  // }

  function reactionclick(emojiname, id, currentcount) {
    dispatch(increment(emojiname, id, currentcount));
  }
  return (
    <div>
      {state.user != null ?
        <div>
          <Header />
          <div>
            {state.user != null &&
              sortedposts != false &&
              sortedposts.map((item, index) => (
                <div
                  className="mt-5 col-6 m-auto row"
                  key={index}
                  style={{
                    border: "1px solid black",
                    borderRadius: 10,
                    padding: 20
                  }}
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
                        style={{
                          marginLeft: 10,
                          fontStyle: "italic",
                          fontSize: 14
                        }}
                      >
                        {" "}
                        {convertTime(item.createdAt)}
                      </a>
                    </div>
                    <div className="mt-4" style={{ userSelect: "none" }}>
                      <a
                        style={{ marginRight: 10, cursor: "pointer" }}
                        onClick={() =>
                          reactionclick("thumbsUp", item.id, item.thumbsUp)
                        }
                      >
                        👍 {item.thumbsUp}
                      </a>
                      <a
                        style={{ marginRight: 10, cursor: "pointer" }}
                        onClick={() => reactionclick("wow", item.id, item.wow)}
                      >
                        😮 {item.wow}
                      </a>
                      <a
                        style={{ marginRight: 10, cursor: "pointer" }}
                        onClick={() => reactionclick("heart", item.id, item.heart)}
                      >
                        ❤️ {item.heart}
                      </a>
                      <a
                        style={{ marginRight: 10, cursor: "pointer" }}
                        onClick={() =>
                          reactionclick("rocket", item.id, item.rocket)
                        }
                      >
                        🚀 {item.rocket}
                      </a>
                      <a
                        style={{ marginRight: 10, cursor: "pointer" }}
                        onClick={() =>
                          reactionclick("coffee", item.id, item.coffee)
                        }
                      >
                        ☕ {item.coffee}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        : navigate("/")}
    </div>
  );
}
export default Userprofile;
