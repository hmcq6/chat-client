import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  websockets: inject(),
  socket: null,

  channel: 'guest',
  user: 'guest',
  messages: null,

  showUserDialog: false,
  showChannelDialog: false,

  didInsertElement() {
    this._super(...arguments);

    this.updateSocket();
  },

  updateSocket() {
    const { user, channel } = this.getProperties('user', 'channel'),
          socket = this.get('websockets').socketFor(`ws://localhost:7611/${ channel }/${ user }`);

    socket.on('open', this.connectionOpened, this);
    socket.on('message', this.receivedMessage, this);
    socket.on('close', this.connectionClosed, this);

    this.set('socket', socket);
  },

  closeSocket() {
    const { user, channel, socket } = this.getProperties('user', 'channel', 'socket');

    socket.off('open', this.connectionOpened);
    socket.off('message', this.receivedMessage);
    socket.off('close', this.connectionClosed);

    this.get('websockets').closeSocketFor(`ws://localhost:7611/${ channel }/${ user }`);
  },

  connectionOpened(_event) {
  },

  receivedMessage({ data }) {
    this.set(
      'messages',
      JSON.parse(data).map(
        (message) => Object.assign(message, {
          sentAt: new Date(message.sentAt).toLocaleTimeString()
        })
      )
    );
  },

  connectionClosed(_event) {
  },

  changeChatProperty(property, value) {
    this.set(property, value.dasherize());
    this.closeSocket();
    this.updateSocket();
  },

  willDestroyElement() {
    this._super(...arguments);

    this.closeSocket();
  },

  actions: {
    submitIfEnter(property, value, { code }) {
      if (code === 'Enter' && value) {
        this.send('closeDialog', 'ok', property, value);
      }
    },
    toggleDialog(dialog) {
      this.toggleProperty(`show${ dialog.classify() }Dialog`);
    },
    closeDialog(status, property, value) {
      this.set(`show${ property.classify() }Dialog`, false);
      if (status === 'ok') {
        this.changeChatProperty(property, value);
      }
    }
  }
});
