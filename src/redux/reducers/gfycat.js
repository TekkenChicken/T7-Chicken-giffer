const initialState = {
    auth: "",
    links: [],
    isLoading: false,
}

export const gfycat = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_AUTH':
            return Object.assign({}, state, { auth: action.token })
        //return { ...state, auth: action.token }

        case 'CONTAIN_LINK':
            //return { ...state, links: [...action.link]}
            return Object.assign({}, state, { links: state.links.concat(action.link) })

        case 'UPDATE_LINK_SUCCESS':
                state.links.map((l, k) => {
                    if (l.linkId == action.id) {
                       return Object.assign({}, state, { links: state.links[k].status = 'complete!' })
                    }
                })
                return state;

        case 'UPDATE_LINK_ERROR':
            state.links.map((l, k) => {
                if (l.linkId == action.id) {
                    return Object.assign({}, state, { links: state.links[k].status = 'error!' })
                }
            })
            return state;

        default: return state
    }
}