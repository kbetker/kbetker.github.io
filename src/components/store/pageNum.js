const SET_PAGE_NUM = "pagenum/SET_PAGE_NUM";

// action creators
export const setPageNum = ( num ) => ({
    type: SET_PAGE_NUM,
    payload: num
})

export const pageNumFunc = (num) => async (dispatch) => {
    dispatch(setPageNum(num))
}


const initialState = {pageNum: ''}
export default function pageNum(state = initialState, action) {
    switch (action.type) {
        case SET_PAGE_NUM:
            return  action.payload
        default:
            return state;
    }
}
