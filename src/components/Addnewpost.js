import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addnewpost } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { getPost } from "../redux/action";
import "../App.css";
function Addnewpost() {
  const [form, setForm] = useState({ title: "", body: "", author: "" });
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, []);
  function submitform(e) {
    e.preventDefault();
    if (form.title != "" && form.body != "" && form.author != "") {
      dispatch(addnewpost(form, user.id));
      setForm({ title: "", body: "", author: "" });
    }
  }
  return (
    <>
      {user != null ?
        <div>
          <Header />
          <div className="addnewpost-body">
            <h2>Add a New Post</h2>
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
              <button
                type="submit"
                className="button-login"
                // style={{ backgroundColor: "purple", color: "white" }}
              >
                Save Post
              </button>
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
export default Addnewpost;
