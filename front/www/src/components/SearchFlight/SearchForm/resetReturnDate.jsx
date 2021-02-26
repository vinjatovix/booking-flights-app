import * as A from '../../../context/flight/Flight.actions';

export function resetReturnDate(dispatch, oneWay) {
  return () => {
    dispatch(A.switchBoolean({ name: 'oneWay', value: oneWay }));
    dispatch(A.setString({ name: 'returnDate', value: '' }));
  };
}
