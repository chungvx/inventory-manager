import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isNil } from "lodash";
import AccountService, { RolesResponse } from "services/AccountService";
import { AccountResponse } from "services/AccountService/types";
import { getCookie, removeCookieByPrefix } from "utilities";
import { CookieName } from "utilities/CookieNames";
import { AuthState } from "./types";

const initialState: AuthState = {
  isAuthenticated: true,
  loadingAuth: true,
  sessionHasBeenFetched: false,
  user: {} as AccountResponse,
};
export const login = createAsyncThunk("authenticate/login", async (params, thunkApi) => {
  try {
    if (getCookie("jwt") !== "") {
      let res = await AccountService.getProfiles();
      let user: AccountResponse = res.data.account_response;
      if (user) {
        if (user.roles && user.roles.length) {
          const allPermissions = user.roles.map((role: RolesResponse) => role.code).flat();
          user.authorities = Array.from(new Set(allPermissions));
        }
        return user;
      }
    }
  } catch (error) {
    return thunkApi.rejectWithValue("login error");
  }
});

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState: initialState,
  reducers: {
    updateStatusLoadingAuth: (state, action: PayloadAction<boolean>) => {
      state.loadingAuth = action.payload;
    },
  },
  extraReducers: {
    [`${login.rejected}`]: (state, actions: PayloadAction<any>) => {
      state.sessionHasBeenFetched = true;
      window.location.href = `/login`;
    },
    [`${login.fulfilled}`]: (state, actions: PayloadAction<AccountResponse>) => {
      state.user = actions.payload;
      state.isAuthenticated = true;
      state.sessionHasBeenFetched = true;
    },
  },
});

const { actions, reducer } = authenticateSlice;
export const { updateStatusLoadingAuth } = actions;
export default reducer;
