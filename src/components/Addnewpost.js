import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addnewpost } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { getPost } from "../redux/action";

function Addnewpost() {
  const [form, setForm] = useState({ title: "", body: "", author: "" });
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, [user]);
  function submitform(e) {
    e.preventDefault();
    if (form.title != "" && form.body != "" && form.author != "") {
      dispatch(addnewpost(form, user.id));
      setForm({ title: "", body: "", author: "" });
    }
  }
  return (
    <>
      <Header />
      <div className="m-auto col-6 mt-5">
        <h2 className="col-6">Add a New Post</h2>
        <form className="mt-5 row" onSubmit={(e) => submitform(e)}>
          <h6>Post Title</h6>
          <input
            style={{ with: "100%" }}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            value={form.title}
          ></input>
          <h6 style={{ marginTop: 20 }}>Author</h6>
          <input
            style={{ with: "100%" }}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            value={form.author}
          ></input>
          <h6 className="mt-4">Content</h6>
          <textarea
            rows={8}
            style={{ resize: "none" }}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            value={form.body}
          ></textarea>
          <br></br>
          <button
            type="submit"
            className="mt-5 btn"
            style={{ backgroundColor: "purple", color: "white" }}
          >
            Save Post
          </button>
        </form>
      </div>
      <Link
        className="btn btn-primary m-auto mt-5 col-1 d-block"
        to="/home"
        // onClick={() => dispatch(getPost())}
      >
        Back
      </Link>
    </>
  );
}
export default Addnewpost;
