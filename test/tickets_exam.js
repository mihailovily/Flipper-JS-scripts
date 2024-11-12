// import modules
let eventLoop = require("event_loop");
let gui = require("gui");
let submenuView = require("gui/submenu");
let textBoxView = require("gui/text_box");

// declare view instances
let views = {
    answerBilet1: textBoxView.makeWith({
        text: "otvet 1",
    }),
    answerBilet2: textBoxView.makeWith({
        text: "otvet 2",
    }),
    answerBilet3: textBoxView.makeWith({
        text: "otvet 3",
    }),
    demos: submenuView.makeWith({
        header: "Choose a bilet",
        items: [
            "Bilet 1",
            "Bilet 2",
            "Bilet 3",
            "Exit"
        ],
    }),
};

// demo selector
eventLoop.subscribe(views.demos.chosen, function (_sub, index, gui, eventLoop, views) {
    if (index === 0) {
        gui.viewDispatcher.switchTo(views.answerBilet1);
    } else if (index === 1) {
        gui.viewDispatcher.switchTo(views.answerBilet2);
    } else if (index === 2) {
        gui.viewDispatcher.switchTo(views.answerBilet3);
    } else if (index === 3) {
        eventLoop.stop();
    }
}, gui, eventLoop, views);

// go to the demo chooser screen when the back key is pressed
eventLoop.subscribe(gui.viewDispatcher.navigation, function (_sub, _, gui, views, eventLoop) {
    if (gui.viewDispatcher.currentView === views.demos) {
        eventLoop.stop();
        return;
    }
    gui.viewDispatcher.switchTo(views.demos);
}, gui, views, eventLoop);

// run UI
gui.viewDispatcher.switchTo(views.demos);
eventLoop.run();
