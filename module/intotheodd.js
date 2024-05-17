// Import Modules
import { LiminalHorrorActor } from "./actor/actor.js";
import { LiminalHorrorActorSheet } from "./actor/actor-sheet.js";
import { LiminalHorrorItem } from "./item/item.js";
import { LiminalHorrorItemSheet } from "./item/item-sheet.js";

Hooks.once('ready', async function() {
  if (game.user.isGM && game.settings.get('liminalhorror', 'showInitiativeHelp') === true) {
    alert(
      'To the GM from the game-system developer:\n\n' +

      'In order to use group initiative as written in Into the Odd, use the two macros ' +
      'in the included compendium (see the compendium tab)' +
      'to set which side goes first in combat.\n\n' +

      'This message will only appear once (but can be reset in system settings).'
    )
    game.settings.set('liminalhorror', 'showInitiativeHelp', false)
  }
});

Hooks.once('init', async function() {

  game.liminalhorror = {
    LiminalHorrorActor,
    LiminalHorrorItem
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "@dex - 1d20",
    decimals: 1
  };

  // Define custom Entity classes
  CONFIG.Actor.documentClass = LiminalHorrorActor;
  CONFIG.Item.documentClass = LiminalHorrorItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("liminalhorror", LiminalHorrorActorSheet, { types: ["character"], makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("liminalhorror", LiminalHorrorItemSheet, { types: ["item"], makeDefault: true });

  game.settings.register('liminalhorror', 'showInitiativeHelp', {
    name: 'Show initiative helptext on next startup',
    hint: 'This option only exists so the helptext won\'t appear on every startup.\n' +
    'When the message appears, this option will uncheck itself.',
    scope: 'system',
    config: true,
    type: Boolean,
    default: true
  })

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper('toUpperCase', function(str) {
    return str.toUpperCase();
  });

  Handlebars.registerHelper('boldIf', function(cond, options) {
    return (cond) ? '<b>' + options.fn(this) + '</b>' : options.fn(this);
  });

});

