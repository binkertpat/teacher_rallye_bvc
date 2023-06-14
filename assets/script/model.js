class Model {
    constructor(group) {
        this.endpoint = `https://raw.githubusercontent.com/binkertpat/teacher_rallye_bvc/main/assets/data/group_${group}.json`;
    }

    parse(controller) {
        fetch(this.endpoint)
            .then(response => response.text())
            .then((data) => {
                this.parsedData = JSON.parse(data);
            })
            .then(() => {
                this.feedbackSuccessToController(controller)
            });
    }

    feedbackSuccessToController(controller) {
        controller.pushDataToView()
    }

    getAmount() {
        return Object.keys(this.parsedData).length;
    }

    getSolutionById(id) {
        return this.parsedData[id]["solution"];
    }

    getHintById(id) {
        return this.parsedData[id]["hint"];
    }

    getNextStepById(id) {
        return this.parsedData[id]["nextStep"];
    }

}

export {
    Model
}