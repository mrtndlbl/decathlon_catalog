require("sepia");
const server = require("../server.js")

test("Check that getCategories() return the list of categories", () => {
  expect.assertions(1);

  return server.getCategories()
    .then(temp => {
      expect(temp[0]).toEqual(
        {
          id: '9f8d8840-e22c-496f-b865-f5014710e234',
          decathlon_id: 309814,
          label: 'Chaussettes' }
      );
    })

})
