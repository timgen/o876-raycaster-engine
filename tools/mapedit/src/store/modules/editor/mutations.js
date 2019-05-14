import * as MUTATION from './mutation-types';

export default {

    [MUTATION.BLOCKBROWSER_SET_SELECTED]: (state, {value}) => state.models.blockBrowser.selected = value,

    [MUTATION.SOMETHING_HAS_CHANGED]: (state, {value}) => state.somethingHasChanged = value,

    [MUTATION.SELECT_REGION]: (state, {x1, y1, x2, y2}) => {
        state.models.levelGrid.selectedRegion.x1 = Math.min(x1, x2);
        state.models.levelGrid.selectedRegion.y1 = Math.min(y1, y2);
        state.models.levelGrid.selectedRegion.x2 = Math.max(x1, x2);
        state.models.levelGrid.selectedRegion.y2 = Math.max(y1, y2);
    },

    [MUTATION.SET_LEVEL_LIST]: (state, {list}) => {
        state.levelList = list;
    },

    [MUTATION.SET_STATUSBAR_TEXT]: (state, {text}) => {
        state.statusBar.content = text;
    },

    [MUTATION.PUSH_UNDO]: (state, {undo}) => {
        const u = state.models.levelGrid.undo;
        u.push(undo);
        while (u.length > 16) {
            u.shift();
        }
    },

    [MUTATION.POP_UNDO]: state => {
        state.models.levelGrid.undo.pop();
    },

    [MUTATION.SET_LEVEL_NAME]: (state, {name}) => state.levelName = name,

    [MUTATION.SET_HIGHLIGHTED_TAGS]: (state, {tags}) => state.models.levelGrid.hltags = tags,
    [MUTATION.REMOVE_HIGHLIGHTED_TAG]: (state, {tag}) => {
        const tags = state.models.levelGrid.hltags;
        const iTag = tags.indexOf(tag);
        if (iTag >= 0) {
            tags.splice(iTag, 1);
        }
    },
    [MUTATION.ADD_HIGHLIGHTED_TAG]: (state, {tag}) => {
        const tags = state.models.levelGrid.hltags;
        const iTag = tags.indexOf(tag);
        if (iTag < 0) {
            tags.push(tag);
        }
    },
}