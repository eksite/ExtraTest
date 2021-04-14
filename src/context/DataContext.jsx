import React, { useReducer, useContext, createContext } from "react";
const DataStateContext = createContext();
const DataDispatchContext = createContext();

let dataId = 0;

const initialState = {
  tasks: [],
};

const createRow = () => {};

const editField = (data, field, value) => {
  data[field] = value;
  return data;
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW": {
      return state;
    }

    case "REMOVE_ROW": {
      return state;
    }
    case "ADD_FROM_JSON": {
      return state;
    }
    default:
      return state;
  }
};

const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const addData = () => {
    dispatch({ type: "ADD_TASK" });
  };
  const removeData = () => {
    dispatch({ type: "REMOVE_TASK" });
  };

  const editData = () => {
    dispatch({ type: "EDIT_TASK" });
  };

  const addFromJson = () => {
    dispatch({ type: "ADD_FROM_JSON" });
  };

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider
        value={{
          dispatch,
          addData,
          removeData,
          editData,
          addFromJson,
        }}
      >
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
};

const useDataDispatch = () => {
  const context = useContext(DataDispatchContext);
  if (context === undefined) {
    throw new Error("forget about provider");
  }
  return context;
};

const useDataState = () => {
  const context = useContext(DataStateContext);
  if (context === undefined) {
    throw new Error("forget about provider");
  }
  return context;
};

export { TasksProvider, useDataState, useDataDispatch };
