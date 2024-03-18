class Events {
  callbacks = []
  nextId = 0

  emit(eventName, value) {
    this.callbacks
      .filter((stored) => stored.eventName === eventName)
      .forEach((stored) => stored.callback(value))
  }

  on(eventName, caller, callback) {
    this.nextId++
    this.callbacks.push({ id: this.nextId, eventName, caller, callback })
    return this.nextId
  }

  off(id) {
    this.callbacks = this.callbacks.filter((stored) => stored.id !== id)
  }

  unsubscribe(caller) {
    this.callbacks = this.callbacks.filter((stored) => stored.caller !== caller)
  }
}

export default new Events()
