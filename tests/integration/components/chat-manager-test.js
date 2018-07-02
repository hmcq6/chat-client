import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

module('Integration | Component | chat-manager', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`{{chat-manager}}`);

    assert.ok(this.$('md-card'));
  });

  test('it displays the current channel', async function(assert) {
    assert.expect(2);

    await render(hbs`{{chat-manager}}`);

    assert.equal(this.$('md-card > md-toolbar h2').text().trim(), 'Messages in channel: guest', 'displays default channel name');

    await click('md-menu button');
    await click($('md-menu-content md-menu-item button md-icon[md-font-icon="swap_calls"]').parent()[0]);
    await fillIn('md-dialog-content input', 'test');
    await click('md-dialog button.md-raised');

    assert.equal(this.$('md-card > md-toolbar h2').text().trim(), 'Messages in channel: test', 'it updates the channel name');
  });

  test('it changes user', async function(assert) {
    assert.expect(2);

    this.set('changeChatProperty', function(property, value) {
      assert.equal(value, 'test', 'it updates the user property');
    });

    await render(hbs`{{chat-manager changeChatProperty=changeChatProperty}}`);

    await click('md-menu button');
    await click($('md-menu-content md-menu-item button md-icon[md-font-icon="portrait"]').parent()[0]);

    assert.ok($('md-dialog').length, 'it renders the dialog');

    await fillIn('md-dialog-content input', 'test');
    await click('md-dialog button.md-raised');
  });

  test('it changes channel', async function(assert) {
    assert.expect(2);

    this.set('changeChatProperty', function(property, value) {
      assert.equal(value, 'test', 'it updates the channel property');
    });

    await render(hbs`{{chat-manager changeChatProperty=changeChatProperty}}`);

    await click('md-menu button');
    await click($('md-menu-content md-menu-item button md-icon[md-font-icon="swap_calls"]').parent()[0]);

    assert.ok($('md-dialog').length, 'it renders the dialog');

    await fillIn('md-dialog-content input', 'test');
    await click('md-dialog button.md-raised');
  });
});
