import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle", // 'idle' | success
  records: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const res = await fetch("http://localhost:5000/posts");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertPost = createAsyncThunk(
  "posts/insertPost",
  async (item, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const state = getState();
    const { auth } = state;
    item.userId = auth.id;
    try {
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (item, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const state = getState();
    const { auth } = state;
    item.userId = auth.id;
    try {
      const res = await fetch(`http://localhost:5000/posts/${item.id}`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchPosts
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "success";
      state.loading = false;
      state.records.push(...action.payload);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //insert post
    builder.addCase(insertPost.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(insertPost.fulfilled, (state, action) => {
      state.loading = false;
      state.records.push(action.payload);
    });
    builder.addCase(insertPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // delete post
    builder.addCase(deletePost.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.records = state.records.filter((el) => el.id !== action.payload);
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // delete post
    builder.addCase(editPost.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.loading = false;
      state.records = state.records.map((el) => {
        if (el.id === action.payload.id) {
          el = action.payload;
        }
        return el;
      });
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const actions = postsSlice.actions;
export default postsSlice.reducer;
