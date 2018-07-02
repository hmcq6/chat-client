import Component from '@ember/component';
import { empty } from '@ember/object/computed';

export default Component.extend({
  user: '',
  messages: null,
  channelHasNoMessages: empty('messages')
});
