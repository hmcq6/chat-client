import Component from '@ember/component';

export default Component.extend({
  socket: null,
  message: '',

  actions: {
    sendMessage() {
      this.get('socket').send(
        JSON.stringify({
          message: this.get('message'),
          sentAt: new Date(Date.now()).toUTCString()
        })
      );
      this.set('message', '')
    }
  }
});
