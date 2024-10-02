import * as types from "./types";
import * as api from "../api/index";




export const adminLogin = () => async (dispatch) => {
    try {
        const { data } = await api.login();
        dispatch({
            type: types.ADMIN_LOGIN,
            payload: data
        });
    } catch (error) {
        console.log('error : ' , error)
    }
};


export const fetchLinktree = () => async (dispatch) => {
    try {
        const { data } = await api.fetchLinktree();
        dispatch({
            type: types.FETCH_LINKTREES,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const createLinktree = (linktree) => async  (dispatch) => {
    try {
        const { data } = await api.createLinktree(linktree);
        dispatch({
            type: types.CREATE_LINKTREE,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateLinktree = (id, linktree) => async  (dispatch) => {
    try {
        const { data } = await api.updateLinktree(id, linktree);
        dispatch({
            type: types.UPDATE_LINKTREE,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const fetchSingleLinktree = (id) => async  (dispatch) => {
    try {
        const { data } = await api.fetchSingleLinktree(id);
        dispatch({
            type: types.FETCH_SINGLE_LINKTREE,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteLinktree = (id) => async  (dispatch) => {
    try {
        const { data } = await api.deleteLinktree(id);
        dispatch({
            type: types.DELETE_LINKTREE,
            payload: data._id
        })
    } catch (error) {
        console.log(error)
    }
}

export const adminLogout = () => async (dispatch) => {
    try {
        const { data } = await api.logout();
        dispatch({
            type: types.ADMIN_LOGOUT,
            payload: data
        });
    } catch (error) {
        console.log('error : ', error);
    }
};
