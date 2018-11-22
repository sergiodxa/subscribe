const hasOnMethod = object => typeof object.on === "function";
const hasAddEventListenerMethod = object =>
  typeof object.addEventListener === "function";

const hasOffMethod = object => typeof object.off === "function";
const hasRemoveEventListenerMethod = object =>
  typeof object.removeEventListener === "function";

function removeListener(object, event, callback) {
  if (hasOffMethod(object)) {
    return object.off(event, callback);
  }
  if (hasRemoveEventListenerMethod(object)) {
    return object.removeEventListener(event, callback);
  }
}

function addListener(object, event, callback) {
  if (hasOnMethod(object)) {
    return object.on(event, callback);
  }
  if (hasAddEventListenerMethod(object)) {
    return object.addEventListener(event, callback);
  }
}

function subscribe(object, event, callback) {
  const unsubscribe = addListener(object, event, callback);
  return () => {
    if (subscribe && typeof unsubscribe === "function") {
      return unsubscribe();
    }
    return removeListener(object, event, callback);
  };
}

module.exports = subscribe;
