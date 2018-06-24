import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  websockets: inject(),
  socket: null,

  channel: 'groupchat',
  user: 'hmcq6',
  messages: [],

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

  connectionOpened(event) {
  },

  receivedMessage({ data }) {
    this.set('messages', JSON.parse(data));
  },

  connectionClosed(event) {
  },

  willDestroyElement() {
    this._super(...arguments);

    this.closeSocket();
  },

  actions: {
    toggleShowUserDialog() {
      this.toggleProperty('showUserDialog');
    },
    closeUserDialog(status, user) {
      user = user.dasherize();
      this.set('showUserDialog', false);
      if (status === 'ok') {
        this.set('user', user);
        this.closeSocket();
        this.updateSocket();
      }
    },
    toggleShowChannelDialog() {
      this.toggleProperty('showChannelDialog');
    },
    closeChannelDialog(status, channel) {
      channel = channel.dasherize()
      this.set('showChannelDialog', false);
      if (status === 'ok') {
        this.set('channel', channel);
        this.closeSocket();
        this.updateSocket();
      }
    },
  }
});
