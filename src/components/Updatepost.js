import { useState } from "react";
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
  function submitform(e) {
    e.preventDefault();
    dispatch(updatepost(form));
  }
  function deletepostclick() {
    const userblogs = user.userblogs;
    const blogsindex = userblogs.filter((item) => item.tokenId == form.tokenId);
    dispatch(deletepost(form.id, user.id, blogsindex[0].id));
    navigate("/");
  }
  return (
    <>
      <Header />
      <div className="m-auto col-6 mt-5">
        <h2 className="col-6">Edit Post</h2>
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
          <button type="submit" className="btn mt-5" style={button}>
            Save Post
          </button>
          <button
            className="btn mt-5"
            style={button}
            onClick={() => deletepostclick(form.id)}
          >
            Delete Post
          </button>
        </form>
      </div>
      <Link className="btn btn-primary m-auto mt-5 col-1 d-block" to="/">
        Back
      </Link>
    </>
  );
}
export default Updatepost;
