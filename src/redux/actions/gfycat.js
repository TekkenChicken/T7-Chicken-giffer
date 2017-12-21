//fetch authenticatoin token from node server
export const getAuth = () => dispatch => {
    fetch('/getAuth', {
        method: 'GET',
    })
    .then((response) => {
        return response.ok ? response.json() : console.log('fail')
    })
    .then((data) => {
        //pass token to getAuthToken dispatch to update the auth state
        dispatch(getAuthToken(data.access_token))
    })
}

//cut gif from youtube video
export const cutGif = (url, title, startMinutes, startSeconds, length, charName, auth) => dispatch => {
    fetch('/cut', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
        },
        body: JSON.stringify({
            fetchUrl: url,
            title,
            fetchMinutes: startMinutes,
            fetchSeconds: startSeconds,
            fetchLength: length,
            charName,
            auth,
        })
    })
    .then((response) => {
        return response.json()
    })
    .then((data => {
        //get the gif name and send it to containLink action
        dispatch(containLink(data.gfyname, title, startMinutes+':'+startSeconds))
    }))
}

//get statuses

const getFetchStatus = (url, params, id) => dispatch => {
    return new Promise((resolve, reject) => {
        fetch(url, params, id)
        .then(response => response.json())
        .then(data => { 
            if(data.task == 'encoding') {   
                console.log('still encoding') 
                setTimeout(() => dispatch(getFetchStatus(url, params, id), 3000))
            } else if(data.task == 'complete') {
                console.log('finished making the gif!')
                return dispatch({
                    type: 'UPDATE_LINK_SUCCESS',
                    id
                })
            } else if(data.task == 'NotFoundo') {
                return dispatch({
                    type: 'UPDATE_LINK_NOT_FOUND',
                    id
                })
            } else if(data.task == 'error') {
                console.log('an error has occured');
                return dispatch({
                    type: 'UPDATE_LINK_ERROR',
                    id
                })
            }
        })
        .catch(err => reject(err))
    });
}

const deleteGifHandler = (url, params, id) => dispatch => {
    console.log('delete gif handler', url, id)
    return (
        fetch(url, params, id)
        .then(response => {
            console.log('what is response', response);
            return response.ok ? response.json() : null
        })
        .then(data => {
            console.log('data from deletion', data)
            return dispatch({
                type: 'UPDATE_LINK_DELETED',
                id
            })
        })
        .catch(err => console.log('something went wrong', err))
    )
}

export const deleteGif = (linkId, auth) => dispatch => {
    dispatch(
        deleteGifHandler(`/delete/${linkId}`, 
          {
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth}` },
            body: JSON.stringify({ 'Authorization': `Bearer ${auth}`})
          },
          linkId)
        )
    }

export const checkStatuses = links => dispatch => {
    const incompleteGifs = []

    Object.keys(links).forEach(l => {
        if (links[l].status == 'loading') {
            incompleteGifs.push(links[l])
        } else {
            null
        }
    })

    incompleteGifs.forEach(l => {
        dispatch(
            getFetchStatus(`/checkStatuses/${l.linkId}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } }, l.linkId)
        )
    })
}

//update state with acquired token
export const getAuthToken = (token) => dispatch => {
    return dispatch ({
        type: 'GET_AUTH',
        token
    })
}

//add link to an array to be rendered as a list
export const containLink = (linkName, title, startTime) => dispatch => {
    return dispatch({
        type: 'CONTAIN_LINK',
        link: {
            title,
            linkId: linkName,
            linkName: `https://gfycat.com/${linkName}`,
            status: 'loading',
            startTime
        }
    })
}

