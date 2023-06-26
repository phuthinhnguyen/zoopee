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
export const BAN_USER_SUCCESS = "BAN_USER_SUCCESS";
export const TO_ADMIN_SUCCESS = "TO_ADMIN_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
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
      coffee: 0,
      view: 0
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
    const response = await axios.put(`${apiurlblogs}/${id}`, {
      [emojiname]: currentcount + 1
    });
    dispatch({
      type: UPDATE_EMOJI_SUCCESS,
      // payload: { emojiname, id, currentcount }
      payload: response.data
    });
  };
};
export const deletepost = (id) => {
  return async (dispatch) => {
    const response = await axios.delete(`${apiurlblogs}/${id}`);
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: id
    });
  };
};

export const login = (form) => {
  return async (dispatch) => {
    let checkloginresult = ""
    const response = await axios.get(apiurlusers);
    const getusername = response.data.filter(
      (item) => item.username == form.username
    );

    if (getusername.length == 0) {
      // alert("Username is not exists");
      checkloginresult = "Username is not exists"
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { userblogs: [], checktype:"login",result: checkloginresult }
      });
    }
    else if (getusername[0].password != form.password) {
      // alert("Username and password are not matched");
      //   <Alert severity="success" color="info">
      //   This is a success alert — check it out!
      // </Alert>
      checkloginresult = "Username and password are not matched"
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { userblogs: [], checktype:"login",result: checkloginresult }
      });
    }
    else if (getusername[0].password == form.password) {
      checkloginresult = "Login successfully"
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { ...getusername[0], userblogs: [], checktype:"login",result: checkloginresult }
      });
      // dispatch(getPost());
    }

    // for (let item of response.data) {
    // if (item.tokenId) {
    //   posts.push(item);
    // }
    // if (!item.tokenId && item.username) {
    //   allusers.push(item);
    // }
    // }
    // dispatch({
    //   type: FETCH_USER_SUCCESS,
    //   payload: response.data
    // });
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

// export const logout = (id) => {
//   return async (dispatch) => {
//     const response = await axios.put(`${apiurlusers}/${id}`, {
//       loginning: false
//     });
//     dispatch({
//       type: LOGOUT_SUCCESS,
//       payload: response.data
//     });
//   };
// };

export const getUserprofile = (posts, user) => {
  return async (dispatch) => {
    // const response = await axios.get(`${apiurlusers}`);
    const userblogs = posts.filter((item) => item.userId == user.id);
    dispatch({
      type: GET_USERPROFILE_SUCCESS,
      payload: userblogs
    });
  };
};

export const signup = (form) => {
  return async (dispatch) => {
    let checksignupresult = ""
    const responsegetuser = await axios.get(apiurlusers)
    const checkusername = responsegetuser.data.filter(item => item.username == form.username)
    const checkemail = responsegetuser.data.filter(item => item.email == form.email)

    if (checkusername.length != 0) {
      // alert("Username already exists")
      checksignupresult = "Username already exists"
    }
    else if (checkemail.length != 0) {
      // alert("Email already exists")
      checksignupresult = "Email already exists"
    }
    else {
      const response = await axios.post(apiurlusers, {
        name: form.name,
        email: form.email,
        username: form.username,
        password: form.password,
        role: form.role
      })
      checksignupresult = "Sign up successfully"
      // alert("Sign up successfully")
    }
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: {checktype:"signup",result:checksignupresult}
    });
  }
}

export const getallusers = () => {
  return async dispatch => {
    const response = await axios.get(apiurlusers)
    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: response.data
    })
  }
}

export const banuser = (id) => {
  return async dispatch => {
    const response = await axios.delete(`${apiurlusers}/${id}`)
    dispatch({
      type: BAN_USER_SUCCESS,
      payload: id
    })
  }
}

export const toadmin = (id) => {
  return async dispatch => {
    const response = await axios.put(`${apiurlusers}/${id}`, {
      role: "admin"
    })
    dispatch({
      type: TO_ADMIN_SUCCESS,
      payload: response.data
    })
  }
}



