const SET_MY_WORK = "mywork/SET_MY_WORK";

// action creators
export const setMyWork = ( mywork ) => ({
    type: SET_MY_WORK,
    payload: mywork
})

export const myWorkFunc = (mywork) => async (dispatch) => {
    dispatch(setMyWork(mywork))
}


const initialState = {myWork: ''}
export default function myWork(state = initialState, action) {
    switch (action.type) {
        case SET_MY_WORK:
            return  action.payload
        default:
            return state;
    }
}
