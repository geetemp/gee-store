import Store from "./main";

test("init state", () => {
  const store = new Store(
    {},
    { company: [{ id: "1", name: "career" }, { id: "2", name: "tencent" }] }
  );
  expect(store.getState()).toEqual({
    company: [{ id: "1", name: "career" }, { id: "2", name: "tencent" }]
  });
});

test("dispatch function", () => {
  const store = new Store(
    {
      company: (company, action) => {
        const { type, payload } = action;
        if (type === "add") {
          return [...company, payload];
        } else if (type === "remove") {
          return company.filter(cm => cm.id !== payload.id);
        }
        return company;
      }
    },
    { company: [{ id: "1", name: "career" }, { id: "2", name: "tencent" }] }
  );

  store.dispatch({ type: "add", payload: { id: "3", name: "wind" } });
  expect(store.getState()).toEqual({
    company: [
      { id: "1", name: "career" },
      { id: "2", name: "tencent" },
      { id: "3", name: "wind" }
    ]
  });

  store.dispatch({ type: "remove", payload: { id: "2" } });
  expect(store.getState()).toEqual({
    company: [{ id: "1", name: "career" }, { id: "3", name: "wind" }]
  });
});

test("subscribe function", () => {
  const store = new Store(
    {
      company: (company, action) => {
        const { type, payload } = action;
        if (type === "add") {
          return [...company, payload];
        } else if (type === "remove") {
          return company.filter(cm => cm.id !== payload.id);
        }
        return company;
      }
    },
    { company: [{ id: "1", name: "career" }, { id: "2", name: "tencent" }] }
  );

  const myMockFn = jest.fn();

  const unSubscribe = store.subscribe(myMockFn);

  store.dispatch({ type: "remove", payload: { id: "2" } });
  store.dispatch({ type: "add", payload: { id: "3", name: "wind" } });

//   expect(store.getState()).toEqual({
//     company: [{ id: "1", name: "career" }, { id: "3", name: "wind" }]
//   });

  expect(myMockFn.mock.calls.length).toBe(3);
});
