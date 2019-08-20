import * as TYPES from './mutation-types';
export default {
    /**
     * Adds a quest item to the player inventory
     * @param state
     * @param ref {string} reference of the quest item
     */
    [TYPES.ADD_QUEST_ITEM]: function(state, {ref}) {
        const qi = state.player.inventory.questItems;
        if (!qi.includes(ref)) {
            qi.push(ref);
        }
    },

    /**
     * Removes a quest item from the player inventory
     * @param state
     * @param ref {string} reference of the quest item
     */
    [TYPES.REMOVE_QUEST_ITEM]: function(state, {ref}) {
        const qi = state.player.inventory.questItems;
        const n = qi.indexOf(ref);
        if (n >= 0) {
            qi.splice(n, 1);
        }
    }
}