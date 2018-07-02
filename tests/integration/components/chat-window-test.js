import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | chat-window', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{chat-window}}`);

    assert.ok(this.$().find('md-list'));
  });

  test('it renders no messages notification', async function(assert) {
    assert.expect(2);

    await render(hbs`{{chat-window user='guest' channel='guest'}}`);

    const componentText = this.element.textContent.trim().split('\n').map((str) => str.trim());

    assert.equal(
      componentText[0],
      'Looks like there\'s no messages on this channel'
    );

    assert.equal(
      componentText[1],
      'Why don\'t you start a conversation?'
    );
  });

  test('it renders outgoing messages with correct class', async function(assert) {
    assert.expect(1);

    this.set('messages', [{
      from: 'guest',
      message: 'test message',
      sentAt: Date.now()
    }]);

    await render(hbs`{{chat-window user='guest' channel='guest' messages=messages}}`);

    assert.ok(this.$('md-list md-list-item .outgoing-message').length);
  });

  test('it renders incoming messages with correct class', async function(assert) {
    assert.expect(1);

    this.set('messages', [{
      from: '!guest',
      message: 'test message',
      sentAt: Date.now()
    }]);

    await render(hbs`{{chat-window user='guest' channel='guest' messages=messages}}`);

    assert.ok(this.$('md-list md-list-item .incoming-message').length);
  });
});
