import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import api from './api';
import {watcherSaga} from "./sagas";
import {reducer} from "./redux";

const response = {
    data: {
        "status": "success",
        "message": "https:\/\/images.dog.ceo\/breeds\/spaniel-japanese\/n02085782_698.jpg"
    }
};
const dog = "https:\/\/images.dog.ceo\/breeds\/spaniel-japanese\/n02085782_698.jpg";

describe('Fetch Dogs', () => {
    it('should take `API_CALL_REQUEST` action request', () => {
        return expectSaga(watcherSaga)
            .provide([
                [matchers.call.fn(api.fetchDog), response]
            ])
            .dispatch({
                type: 'API_CALL_REQUEST'
            })

            .put({
                type: 'API_CALL_SUCCESS',
                dog
            })

            // Start the test.
            .run();
    });

    it('handles reducers and store state', () => {
        return expectSaga(watcherSaga)
            .provide([
                [matchers.call.fn(api.fetchDog), response]
            ])
            .withReducer(reducer)
            .hasFinalState({
                fetching: false,
                dog: dog,
                error: null
            })
            .dispatch({
                type: 'API_CALL_REQUEST'
            })
            .run();
    });
});
