// helper for testing action with expected mutations


export default {
  testAction(action, payload, state, expectedMutations, done) {
    let count = 0;

    // mock commit
    const commit = (type, resultPayload) => {
      const expectedMutation = expectedMutations[count];

      try {
        expect(type).toEqual(expectedMutation.type);
        if (expectedMutation.payload) {
          expect(resultPayload).toEqual(expectedMutation.payload);
        }
      } catch (error) {
        done(error);
      }

      count += 1;

      if (count >= expectedMutations.length) {
        done();
      }
    };

    // call the action with mocked store and arguments
    action({ commit, state, dispatch() {} }, payload);

    // check if no mutations should have been dispatched
    if (expectedMutations.length === 0) {
      expect(count).toEqual(0);
      done();
    }
  },
};
