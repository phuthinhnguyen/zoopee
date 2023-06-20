import { useNavigate } from "react-router-dom";
import { LOGOUT_SUCCESS } from "./action";
import { ADD_NEW_POST_SUCCESS, DELETE_POST_SUCCESS, FETCH_POST_SUCCESS, UPDATE_EMOJI_SUCCESS, UPDATE_POST_SUCCESS } from "./action";
import { LOGIN_SUCCESS } from "./action";

const initialState = {
  posts: [],
  user:null
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_SUCCESS:
      return { ...state, posts: action.payload };
    case ADD_NEW_POST_SUCCESS:
      return {
        ...state, posts: [{
          ...state.posts,
          id: Math.floor(Math.random() * 1000),
          title: action.payload.title,
          body: action.payload.body,
          createdAt: action.payload.createdAt,
          thumbsUp: action.payload.thumbsUp,
          wow: action.payload.wow,
          heart: action.payload.heart,
          rocket: action.payload.rocket,
          coffee: action.payload.coffee
        }]
      }
    case UPDATE_POST_SUCCESS:
      return { ...state, posts: [{ ...state.posts, id: action.payload.id, title: action.payload.title, body: action.payload.body, createdAt: action.payload.createdAt }] }
    case DELETE_POST_SUCCESS:
      const newPosts = [...state.posts];
      newPosts.filter(item => item.id != action.payload)
      return { ...state, posts: newPosts }
    case UPDATE_EMOJI_SUCCESS:
      let clone = [...state.posts]
      let index = null
      let update = () => {
        for (var key in clone)
          if (clone[key].id == action.payload.id) {
            index = clone.indexOf(clone[key])
            return [{ ...clone[key], [action.payload.emojiname]: action.payload.currentcount + 1 }]
          }
      }
      let getnewobj = update()
      clone.splice(index, 1)
      clone.splice(index, 0, getnewobj[0])
      return { ...state, posts: clone }
    case LOGIN_SUCCESS:
      console.log(action.payload)
      return {...state,user:action.payload}
    case LOGOUT_SUCCESS:
      return {...state,user:{...state.user,loginning:false}}
    default:
      return state;
  }

};

export default rootReducer;