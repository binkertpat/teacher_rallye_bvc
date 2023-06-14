import { Model } from "./model.js";
import { View } from "./view.js";

class Controller {
    LOCAL_STORAGE_ID = "christmas_rallye";
    SEARCH_PARAM_IDENTIFIER = "group";
    GROUP_AMOUNT = 10;

    constructor() {
        this.view = new View();

        if(this.isGroupRequested()) {
            this.model = new Model(this.getRequestedGroup());
            this.initDataFetching();
            this.addEventListener();
            this.view.hideGroupSelection();
        } else {
            this.view.hideForm();
            this.view.showGroups(this.GROUP_AMOUNT);
        }

    }

    initDataFetching() {
        this.model.parse(this);
    }

    addEventListener() {
        this.view.addEventListener(this);
    }

    pushDataToView() {
        this.view.addSelectOptions(this.model);
    }

    checkAnswer(question, insertedSolution) {
        if(insertedSolution.toUpperCase().trim() == this.model.getSolutionById(question).toUpperCase().trim()) {
            this.view.showNextStep(this.model.getNextStepById(question));
        } else {
            this.view.showHint(this.model.getHintById(question));
        }
    }

    isGroupRequested() {
        return this.getSearchParam() == null ? false : true;
    }

    getRequestedGroup() {
        return this.getSearchParam();
    }

    getSearchParam() {
        let urlSearchParam = new URLSearchParams(window.location.search);
        return urlSearchParam.get(this.SEARCH_PARAM_IDENTIFIER);
    }
}

export {
    Controller
}