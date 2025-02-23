const initialState = {
  files: [],
  loading: false,
  error: null,
  uploadError: null,
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_FILE_REQUEST':
      return {
        ...state,
        loading: true,
        uploadError: null,
      };
    case 'FETCH_FILES_REQUEST':
    case 'DELETE_FILE_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'UPLOAD_FILE_SUCCESS':
      return {
        ...state,
        files: state.files.some(file => file.filename === action.payload.filename)
          ? state.files.map(file =>
              file.filename === action.payload.filename ? action.payload : file
            )
          : [...state.files, action.payload],
        loading: false,
        uploadError: null,
      };
    case 'FETCH_FILES_SUCCESS':
      return {
        ...state,
        files: action.payload,
        loading: false,
        error: null,
      };
    case 'DELETE_FILE_SUCCESS':
      return {
        ...state,
        files: state.files.filter(file => file.id !== action.payload),
        loading: false,
      };
    case 'UPLOAD_FILE_FAILURE':
      return {
        ...state,
        uploadError: action.error,
        loading: false,
      };
      case 'UPLOAD_FILE_FAILURE_2':
        return {
          ...state,
          loading: false,
        };
    case 'FETCH_FILES_FAILURE':
    case 'DELETE_FILE_FAILURE':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case 'CLEAR_UPLOAD_ERROR':
      return {
        ...state,
        uploadError: null,
      };
    default:
      return state;
  }
};

export default fileReducer;
