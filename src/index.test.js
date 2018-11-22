const { EventEmitter } = require("events");
const subscribe = require("./");

describe("subscribe", () => {
  it("should subscribe to an event emitter", () => {
    const emitter = new EventEmitter();

    const unsubscribe = subscribe(emitter, "test", value => {
      expect(value).toBe("test");
      unsubscribe();
    });

    emitter.emit("test", "test");
  });
});
