import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | chat-manager', function(hooks) {
  setupTest(hooks);

  test('Should open WebSocket', function (assert) {
    assert.expect(1);

    const chatManager = this.owner.lookup('component:chat-manager');
    chatManager.updateSocket();

    assert.ok(chatManager.get('socket').socket instanceof WebSocket);
  });

  test('Changing user should open a new socket', function(assert) {
    assert.expect(1);

    const chatManager = this.owner.lookup('component:chat-manager');
    chatManager.updateSocket();

    const oldSocket = chatManager.get('socket').socket;

    chatManager.changeChatProperty('user', 'test');

    assert.notEqual(oldSocket, chatManager.get('socket').socket);
  });

  test('Changing channel should open a new socket', function(assert) {
    assert.expect(1);

    const chatManager = this.owner.lookup('component:chat-manager');
    chatManager.updateSocket();

    const oldSocket = chatManager.get('socket').socket;

    chatManager.changeChatProperty('channel', 'test');

    assert.notEqual(oldSocket, chatManager.get('socket').socket);
  });

  test('User should be dasherized', function (assert) {
    assert.expect(1);

    const chatManager = this.owner.lookup('component:chat-manager');
    chatManager.updateSocket();

    chatManager.changeChatProperty('user', 'test 2');

    assert.equal(chatManager.get('user'), 'test-2');
  });

  test('Channel should be dasherized', function (assert) {
    assert.expect(1);

    const chatManager = this.owner.lookup('component:chat-manager');
    chatManager.updateSocket();

    chatManager.changeChatProperty('channel', 'test 2');

    assert.equal(chatManager.get('channel'), 'test-2');
  });

  test('Closing user dialog with status \'ok\' should change user', function (assert) {
    assert.expect(1);

    const chatManager = this.owner.lookup('component:chat-manager');
    chatManager.updateSocket();

    chatManager.send('closeDialog', 'ok', 'user', 'test');
    assert.equal(chatManager.get('user'), 'test');
  });

  test('Closing channel dialog with status \'ok\' should change channel', function (assert) {
    assert.expect(1);

    const chatManager = this.owner.lookup('component:chat-manager');
    chatManager.updateSocket();

    chatManager.send('closeDialog', 'ok', 'channel', 'test');
    assert.equal(chatManager.get('channel'), 'test');
  });

  test('Messages received from WebSocket should be parsed as JSON', function (assert) {
    assert.expect(1);

    const chatManager = this.owner.lookup('component:chat-manager');
    chatManager.updateSocket();

    chatManager.receivedMessage({
      data: JSON.stringify([
        { from: 'test', message: 'test message' }
      ])
    });

    assert.equal(chatManager.get('messages.length'), 1);
  });
});
