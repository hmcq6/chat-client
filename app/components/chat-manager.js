import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  websockets: inject(),
  socket: null,

  channel: 'guest',
  user: 'guest',
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
    this.set(
      'messages',
      JSON.parse(data).map(
        (message) => Object.assign(message, {
          sentAt: new Date(message.sentAt).toLocaleTimeString()
        })
      )
    );
  },

  connectionClosed(event) {
  },

  willDestroyElement() {
    this._super(...arguments);

    this.closeSocket();
  },

  actions: {
    submitIfEnter(dialog, value, { code }) {
      if (code === 'Enter') {

        this.send(`close${ dialog.classify() }Dialog`, 'ok', value);
      }
    },
    toggleShowUserDialog() {
      this.toggleProperty('showUserDialog');
    },
    closeUserDialog(status, user) {
      this.set('showUserDialog', false);
      this.set('_user', null);
      if (status === 'ok') {
        this.set('user', user.dasherize());
        this.closeSocket();
        this.updateSocket();
      }
    },
    toggleShowChannelDialog() {
      this.toggleProperty('showChannelDialog');
    },
    closeChannelDialog(status, channel) {
      this.set('showChannelDialog', false);
      if (status === 'ok') {
        this.set('channel', channel.dasherize());
        this.closeSocket();
        this.updateSocket();
      }
    },
  }
});
