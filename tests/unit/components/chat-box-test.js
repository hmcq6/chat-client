import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | chat-box', function(hooks) {
  setupTest(hooks);

  test('Should clear message property after sending message', function(assert) {
    assert.expect(1);

    const chatBox = this.owner.lookup('component:chat-box');

    chatBox.set('socket', {
      send() {}
    });
    chatBox.set('message', 'sending new message');
    chatBox.send('sendMessage');

    assert.equal(chatBox.get('message'), '');
  });
});
