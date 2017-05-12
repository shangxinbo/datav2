
const API_PRE = process.env.NODE_ENV == 'production' ? '' : '/api'
export default {
    video_data: API_PRE + '/video_data',
    chord: API_PRE + '/chord',
    map_user: API_PRE + '/map_user',
    total_account: API_PRE + '/total_account',
    area_user:API_PRE + '/area_user'
}