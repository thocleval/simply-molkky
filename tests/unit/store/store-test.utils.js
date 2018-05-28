// helper for testing action with expected mutations


export default {
  testAction(action, payload, state, expectedMutations, done) {
    let count = 0;

    // mock commit
    const commit = (type, subPayload) => {
      const mutation = expectedMutations[count];

      try {
        expect(type).toEqual(mutation.type);
        if (payload) {
          expect(subPayload).toEqual(mutation.payload);
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
    action({ commit, state }, payload);

    // check if no mutations should have been dispatched
    if (expectedMutations.length === 0) {
      expect(count).toEqual(0);
      done();
    }
  },
};
