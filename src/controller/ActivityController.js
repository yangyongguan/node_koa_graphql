import FetchTool from '../utils/fetchTool'
export default {
  queryActivityInfoById (id) {
    return FetchTool.$get('/frontend/live/info', {
      activityId: id
    })
  }
}
