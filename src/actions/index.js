export const updateDate = (start, end) => dispatch => {
  dispatch({ type: 'UPDATE_DATE', payload: { startDate: start, endDate: end } })
}