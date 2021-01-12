export default function dateReducer(state = { startDate: '', endDate: '' }, action) {
  switch (action.type) {
    case 'UPDATE_DATE':
      console.log('DATE UPDATED!');
      return action.payload;
    default:
      return state;
  }
}