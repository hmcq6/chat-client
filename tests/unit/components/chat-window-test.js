import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | chat-window', function(hooks) {
  setupTest(hooks);

  test('channelHasNoMessages should be true when message queue is empty', function (assert) {
    assert.expect(1);

    const chatWindow = this.owner.lookup('component:chat-window');

    assert.ok(chatWindow.get('channelHasNoMessages'));
  });

  test('channelHasNoMessages should be true when there are messages in the queue', function(assert) {
    assert.expect(1);

    const chatWindow = this.owner.lookup('component:chat-window');

    chatWindow.set('messages', [{
      from: 'test',
      message: 'test message',
      sentAt: Date.now()
    }]);

    assert.notOk(chatWindow.get('channelHasNoMessages'));
  });
});
