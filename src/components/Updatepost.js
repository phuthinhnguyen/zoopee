import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deletepost, updatepost } from "../redux/action";
import Header from "./Header";

const button = {
  backgroundColor: "purple",
  color: "white"
};
function Updatepost() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [form, setForm] = useState(state);
  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, []);
  function submitform(e) {
    e.preventDefault();
    dispatch(updatepost(form));
  }
  function deletepostclick() {
    dispatch(deletepost(form.id));
    navigate("/home");
  }
  return (
    <>
      {user != null ?
        <div>
          <Header />
          <div className="addnewpost-body">
            <h2>Edit Post</h2>
            <form className="addnewpost-body-form" onSubmit={(e) => submitform(e)}>
              <h6>Post Title</h6>
              <input
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                value={form.title}
              ></input>
              <h6>Author</h6>
              <input
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                value={form.author}
              ></input>
              <h6>Content</h6>
              <textarea
                rows={8}
                style={{ resize: "none" }}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                value={form.body}
              ></textarea>
              <br></br>
              <div className="button-wrap">
                <button type="submit" className="button-login">
                  Save Post
                </button>
                <button
                  className="button-login"
                  onClick={() => deletepostclick(form.id)}
                >
                  Delete Post
                </button>
              </div>

            </form>
            <Link
              className="button-back"
              to="/home"
            // onClick={() => dispatch(getPost())}
            >
              Back
            </Link>
          </div>
        </div>
        : navigate("/")}


    </>
  );
}
export default Updatepost;
