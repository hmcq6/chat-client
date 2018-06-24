import Component from '@ember/component';

export default Component.extend({
  socket: null,
  message: '',

  actions: {
    sendMessage() {
      this.get('socket').send(this.get('message'));
      this.set('message', '')
    }
  }
});
