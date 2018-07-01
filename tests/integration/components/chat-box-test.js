import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | chat-box', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    await render(hbs`{{chat-box}}`);

    assert.ok(this.$('md-input-container').length);
    assert.ok(this.$('button').length);
  });

  test('it sends a message', async function(assert) {
    this.set('socket', {
      send(messageObject) {
        const { message } = JSON.parse(messageObject);
        assert.equal(message, 'sending new message');
      }
    });

    await render(hbs`{{chat-box socket=socket}}`);

    await fillIn('textarea', 'sending new message');
    await click('button');

  });
});
