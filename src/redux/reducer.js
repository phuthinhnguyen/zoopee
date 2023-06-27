import { useNavigate } from "react-router-dom";
import {
  BAN_USER_SUCCESS,
  FETCH_USER_SUCCESS,
  GET_USERPROFILEONLINE_SUCCESS,
  GET_USERPROFILE_SUCCESS,
  LOGOUT_SUCCESS,
  SEARCH_FILTER_SUCCESS,
  SIGNUP_SUCCESS,
  TO_ADMIN_SUCCESS,
  UPLOAD_AVATAR_SUCCESS
} from "./action";
import {
  ADD_NEW_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  FETCH_POST_SUCCESS,
  UPDATE_EMOJI_SUCCESS,
  UPDATE_POST_SUCCESS
} from "./action";
import { LOGIN_SUCCESS } from "./action";

const initialState = {
  posts: [],
  user: null,
  // allusers: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_SUCCESS:
      return { ...state, posts: action.payload };
    case ADD_NEW_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        user: {
          ...state.user,
          userblogs: [...state.user.userblogs, action.payload]
        }
      };
    case UPDATE_POST_SUCCESS:
      // const cloneuserblogs = state.user;
      // const cloneposts = state.posts;
      // for (let item of cloneuserblogs.userblogs) {
      //   if (item.tokenId == action.payload.tokenId) {
      //     const index = cloneuserblogs.userblogs.indexOf(item);
      //     cloneuserblogs.userblogs.splice(index, 1);
      //     cloneuserblogs.userblogs.push({...item,
      //     createdAt:action.payload.createdAt,
      //     title: action.payload.title,
      //     body: action.payload.body,
      //     author: action.payload.author,
      //   })
      //   }
      // }
      // for (let item of cloneposts) {
      //   if (item.id == action.payload.id) {
      //     const index = cloneposts.indexOf(item);
      //     cloneposts.splice(index, 1);
      //     cloneposts.push({...item,
      //     createdAt:action.payload.createdAt,
      //     title: action.payload.title,
      //     body: action.payload.body,
      //     author: action.payload.author,
      //   })
      //   }
      // }
      return {
        ...state,
        posts: [
          ...state.posts.filter((item) => item.id != action.payload.id),
          action.payload
        ],
        user: {
          ...state.user,
          userblogs: [
            ...state.user.userblogs.filter(
              (item) => item.id != action.payload.id
            ),
            action.payload
          ]
        }
      };
    case DELETE_POST_SUCCESS:
      // const newPosts = [...state.posts];
      // newPosts.filter((item) => item.id != action.payload);
      return {
        ...state,
        posts: [...state.posts.filter((item) => item.id != action.payload)],
        user: {
          ...state.user,
          userblogs: [
            ...state.user.userblogs.filter((item) => item.id != action.payload)
          ]
        }
      };
    case UPDATE_EMOJI_SUCCESS:
      // let clone = [...state.posts];
      // let index = null;
      // let update = () => {
      //   for (var key in clone)
      //     if (clone[key].id == action.payload.id) {
      //       index = clone.indexOf(clone[key]);
      //       return [
      //         {
      //           ...clone[key],
      //           [action.payload.emojiname]: action.payload.currentcount + 1
      //         }
      //       ];
      //     }
      // };
      // let getnewobj = update();
      // clone.splice(index, 1);
      // clone.splice(index, 0, getnewobj[0]);
      return {
        ...state,
        posts: [
          ...state.posts.filter((item) => item.id != action.payload.id),
          action.payload
        ],
        user: { ...state.user, userblogs: [...state.user.userblogs.filter(item => item.id != action.payload.id), state.user.id == action.payload.userId && action.payload] }
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        allusers: action.payload
      };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload };
    case SIGNUP_SUCCESS:
      return { ...state, user: { ...state.user, checktype: action.payload.checktype, result: action.payload.result } }
    case LOGOUT_SUCCESS:
      return { ...state, user: null };
    case GET_USERPROFILE_SUCCESS:
      return { ...state, user: { ...state.user, userblogs: action.payload } };
    case GET_USERPROFILEONLINE_SUCCESS:
      return { ...state, useronline: { ...action.payload[0], userblogs: action.payload[1] } }
    case BAN_USER_SUCCESS:
      return { ...state, allusers: [...state.allusers.filter(item => item.id != action.payload)] };
    case TO_ADMIN_SUCCESS:
      return { ...state, allusers: [...state.allusers.filter(item => item.id != action.payload.id), action.payload] }
    case UPLOAD_AVATAR_SUCCESS:
      return {...state,user:{...state.user,[action.payload[1]]:action.payload[0]}}
    default:
      return state;
  }
};

export default rootReducer;
