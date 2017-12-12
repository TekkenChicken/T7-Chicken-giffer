const initialState = {
    auth: "",
    links: {},
    isLoading: false,
}

export const gfycat = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_AUTH':
            return Object.assign({}, state, { auth: action.token })
        //return { ...state, auth: action.token }
        case 'CONTAIN_LINK':
            console.log('contain link update', action.link)
            const { link } = action
            return Object.assign({}, state, { links: Object.assign({}, state.links, { [link.linkId]: link}) })
        case 'UPDATE_LINK_SUCCESS':
            const { id } = action
            return Object.assign({}, state, { links: Object.assign({}, state.links, { [id]: Object.assign({}, state.links[id], {status: 'Complete!' }) }) })
        case 'UPDATE_LINK_NOT_FOUND':
            return Object.assign({}, state, { links: Object.assign({}, state.links, { [id]: Object.assign({}, state.links[id], { status: 'Gif Not Found. Wtf?!' }) }) })
        case 'UPDATE_LINK_ERROR':
            return Object.assign({}, state, { links: Object.assign({}, state.links, { [id]: Object.assign({}, state.links[id], {status: 'Error :(' }) }) })
        case 'UPDATE_LINK_DELETED':
            return Object.assign({}, state, { links: Object.assign({}, state.links, { [id]: Object.assign({}, state.links[id], {status: 'Deleted!' }) }) })
            
        default: return state
    }
}