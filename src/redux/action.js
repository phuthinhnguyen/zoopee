import axios, { all } from "axios";
import { v4 as uuidv4 } from "uuid";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const ADD_NEW_POST_SUCCESS = "ADD_NEW_POST_SUCCESS";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const UPDATE_EMOJI_SUCCESS = "UPDATE_EMOJI_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const GET_USERPROFILE_SUCCESS = "GET_USERPROFILE_SUCCESS";

// const apiurl = "https://648e53e52de8d0ea11e8ab7f.mockapi.io/blogs"
const apiurlusers = "https://649117572f2c7ee6c2c7b99a.mockapi.io/users";
const apiurlblogs = "https://649117572f2c7ee6c2c7b99a.mockapi.io/blogs";
export const getPost = () => {
  return async (dispatch) => {
    const response = await axios.get(apiurlblogs);
    // let posts = []
    // for (let item of response.data){
    //   if (item.tokenId) {
    //     posts.push(item);
    //   }
    // }
    dispatch({
      type: FETCH_POST_SUCCESS,
      payload: response.data
    });
  };
};

export const addnewpost = (form, userid) => {
  // const newpost = {
  //   createdAt: Date.now(),
  //   userId: userid,
  //   tokenId: tokenid,
  //   title: form.title,
  //   body: form.body,
  //   author: form.author,
  //   thumbsUp: 0,
  //   wow: 0,
  //   heart: 0,
  //   rocket: 0,
  //   coffee: 0
  // };
  return async (dispatch) => {
    const response = await axios.post(`${apiurlblogs}`, {
      createdAt: Date.now(),
      userId: userid,
      title: form.title,
      body: form.body,
      author: form.author,
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    });
    dispatch({
      type: ADD_NEW_POST_SUCCESS,
      payload: response.data
    });
  };
};

export const updatepost = (form) => {
  return async (dispatch) => {
    const response = await axios.put(`${apiurlblogs}/${form.id}`, {
      title: form.title,
      body: form.body,
      author: form.author,
      createdAt: Date.now()
    });
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: response.data
    });
  };
};

export const increment = (emojiname, id, currentcount) => {
  return async (dispatch) => {
    const response = await axios.put(`${apiurl}/${id}`, {
      [emojiname]: currentcount + 1
    });
    dispatch({
      type: UPDATE_EMOJI_SUCCESS,
      payload: { emojiname, id, currentcount }
    });
  };
};
export const deletepost = (id) => {
  return async (dispatch) => {
    const response = await axios.delete(
      `${apiurlblogs}/${id}`
    );
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: id
    });
  };
};

export const login = () => {
  return async (dispatch) => {
    // let allusers = [];
    // let posts = [];
    const response = await axios.get(apiurlusers);
    // for (let item of response.data) {
      // if (item.tokenId) {
      //   posts.push(item);
      // } 
      // if (!item.tokenId && item.username) {
      //   allusers.push(item);
      // }
    // }
    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: response.data
    });
    // const getusername = response.data.filter(
    //   (item) => item.username == form.username
    // );
    // if (getusername.length == 0) {
    //   alert("Username is not exists");
    // } else if (getusername[0].password == form.password) {
    //   dispatch({
    //     type: LOGIN_SUCCESS,
    //     payload: response.data
    //   });
    // } else if (getusername[0].password != form.password) {
    //   alert("Username and password are not matched");
    // }
  };
};

export const logout = (id) => {
  return async (dispatch) => {
    const response = await axios.put(`${apiurlusers}/${id}`, {
      loginning: false
    });
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: response.data
    });
  };
};

export const getUserprofile = (posts,user) => {
  return async (dispatch) => {
    // const response = await axios.get(`${apiurlusers}`);
      const userblogs = posts.filter(
        (item) => item.userId == user.id
      );
    dispatch({
      type: GET_USERPROFILE_SUCCESS,
      payload: userblogs
    });
  };
};
