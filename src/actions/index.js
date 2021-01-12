export const updateDate = (startDate, endDate) => dispatch => {
  dispatch({ type: 'UPDATE_DATE', payload: { startDate, endDate } })
}