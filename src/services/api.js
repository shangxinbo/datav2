
const API_PRE = process.env.NODE_ENV == 'production' ? '' : '/api'
export default {
    video_data: API_PRE + '/video_data',
    chord: API_PRE + '/chord',
    map_user: API_PRE + '/map_user',
}