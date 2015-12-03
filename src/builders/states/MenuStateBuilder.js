let debug = require('debug')('game:builders/states/MenuStateBuilder');

import MenuState from '../../game/states/menu/MenuState';
import MenuRenderView from '../../game/states/menu/MenuRenderView';
import ViewContainer from '../../engine/views/ViewContainer';
import BackgroundView from '../../engine/views/BackgroundView';
import Menu from '../../engine/menu/Menu';
import MenuInput from '../../game/input/menu/MenuInput';

import MenuItemsView from '../../game/views/menu/MenuItemsView';
import LogoView from '../../game/views/menu/LogoView';

import MenuAudio from '../../game/audio/MenuAudio';

let _createMenus = function (engine, state) {
    let mainMenu = new Menu();

    mainMenu.addMenuItem('Create game', function () {
        engine.changeState('play');
    });

    mainMenu.addMenuItem('Options', function () {
        state.currentMenu = 'options';
    });

    mainMenu.addMenuItem('Exit', function () {
        debug('not implemented');
    });

    let optionsMenu = new Menu();

    optionsMenu.addMenuItem('Name', function () {
        debug('not implemented');
    });

    optionsMenu.addMenuItem('- back', function () {
        state.currentMenu = 'main';
    });

    state.addMenu('main', mainMenu);
    state.addMenu('options', optionsMenu);
    state.currentMenu = 'main';

    let menuView = new MenuRenderView(state);

    let mainMenuViewContainer = new ViewContainer();

    mainMenuViewContainer.addDynamicView(new MenuItemsView(mainMenu), { x: 500, y: 100, z: 0 });
    mainMenuViewContainer.addStaticView(new LogoView('logo', 'ui'), { x: 300, y: 300, z: 0 });

    let background1 = new BackgroundView('normandy', 'ui');

    background1.lightness = 0.5;

    mainMenuViewContainer.backgroundView = background1;

    let optionsMenuViewContainer = new ViewContainer();

    optionsMenuViewContainer.addDynamicView(new MenuItemsView(optionsMenu), { x: 500, y: 100, z: 0 });

    let background2 = new BackgroundView('iwo_jima', 'ui');

    background2.lightness = 0.5;
    optionsMenuViewContainer.backgroundView = background2;

    menuView.addViewContainer('main', mainMenuViewContainer);
    menuView.addViewContainer('options', optionsMenuViewContainer);
    menuView.currentViewContainer = 'main';

    state.addView(menuView);
};

let MenuStateBuilder = {
    create (engine) {
        let state = new MenuState();

        _createMenus(engine, state);

        let menuInput = new MenuInput(state);

        state.inputs.add(menuInput);

        state.audio = new MenuAudio(state, 'menu_effects', 'background');

        return state;
    }
};

export default MenuStateBuilder;
