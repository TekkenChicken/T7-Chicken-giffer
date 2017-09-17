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
            console.log('update link success', action.id)
            const { id } = action
            const linksObj = state.links
            console.log('what the hell is this?', state.links[id])
            return Object.assign({}, state, { links: Object.assign({}, state.links, { [id]: Object.assign({}, state.links[id], {status: 'Complete!'})} ) })
              

        default: return state
    }
}