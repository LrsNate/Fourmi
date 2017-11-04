import { loginType } from "../actions/user";

export default (state = {}, action) => {
  switch (action.type) {
    case loginType:
      return { username: action.username };
  }
  return state;
};
