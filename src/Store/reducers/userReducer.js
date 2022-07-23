import { ADD_USER, UPDATE_USER } from '../types/user';

const DEFAULT_STATE = {
  userList: [
    {
      id: 1,
      maSV: '123',
      fullName: 'Nguyễn Văn A',
      email: 'ngvanA@gmail.com',
      phoneNumber: '0123456789',
    },
    {
      id: 2,
      maSV: '124',
      fullName: 'Nguyễn Văn B',
      email: 'ngvanB@gmail.com',
      phoneNumber: '0123456789',
    },
  ],
  selectedUser: null,
};

// trong reducer nếu mà cái giá trị bên trong state là 1 mảng hoặc
// object thì cần phải copy ra 1 cải mảng hoặc object mới
export const userReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case ADD_USER: {
      const data = [...state.userList];

      data.push({ ...payload, id: Date.now() });

      state.userList = data;

      return { ...state };
    }

    case UPDATE_USER: {
      // const data = [...state.userList];

      // const idx = data.findIndex((ele) => ele.id === payload.id);

      // if (idx !== -1) {
      //   data[idx] = payload;
      // }

      // state.userList = data;
      state.userList = state.userList.map((ele) =>
        ele.id === payload.id ? payload : ele
      );
      state.selectedUser = null;

      return { ...state };
    }

    case 'SET_SELECTED_USER': {
      // state.selectedUser = payload;

      return { ...state, selectedUser: payload };
    }

    case 'DELETE_USER': {
      // const data = [...state.userList];

      // const idx = data.findIndex((ele) => ele.id === payload);

      // if (idx !== -1) {
      //   data.splice(idx, 1);
      // }

      // state.userList = data;
      state.userList = state.userList.filter((ele) => ele.id !== payload);

      return { ...state };
    }

    default:
      return state;
  }
};
