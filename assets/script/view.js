

class View {
    INPUT_SELECTOR = "#choose_question";
    BUTTON_SELECTOR = "#button_check";
    INSERTED_SOLUTION_SELECTOR = "#inserted_solution";
    OUTPUT_SELECTOR = "#feedback";
    DISPLAY_NONE = "hide";
    CLASS_SUCCESS = "alert-success";
    CLASS_WARNING = "alert-warning";
    EMPTY_STRING = "";
    GROUP_SELECTOR = "#groupSelection";
    FORM_SELECTOR = "#form";
    GROUP_CONTAINER_SELECTOR = "#groupSelectionContainer";

    constructor() {}

    addSelectOptions(model) {
        let selectEl = document.querySelector(this.INPUT_SELECTOR);
        for(var i = 1; i <= model.getAmount(); i++) {
            var optionEl = document.createElement("option");
            optionEl.value = String(i);
            optionEl.innerText = `Rätsel ${i}`;
            selectEl.appendChild(optionEl);
        }
    }

    addEventListener(controller) {
        document.addEventListener("DOMContentLoaded", () => {

            document.querySelector(this.BUTTON_SELECTOR).addEventListener("click", () => {
                controller.checkAnswer(
                    this.getSelectedOption(),
                    this.getInsertedSolution()
                );
            });

            let button = document.querySelector(this.BUTTON_SELECTOR);
            document.querySelector(this.INSERTED_SOLUTION_SELECTOR).addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    button.click();
                }
            });

            document.querySelector(this.INPUT_SELECTOR).addEventListener("change", () => {
                let outputEl = document.querySelector(this.OUTPUT_SELECTOR);
                if(!outputEl.classList.contains(this.DISPLAY_NONE)) {
                    outputEl.classList.add(this.DISPLAY_NONE);
                    document.querySelector(this.INSERTED_SOLUTION_SELECTOR).value = this.EMPTY_STRING;
                }    
            });
  
        })
    }

    getSelectedOption() {
        let selectedID = document.querySelector(this.INPUT_SELECTOR).selectedIndex;
        return document.querySelector(this.INPUT_SELECTOR).options[selectedID].value;
    }

    getInsertedSolution() {
        return document.querySelector(this.INSERTED_SOLUTION_SELECTOR).value;
    }

    showHint(hint) {
        let workingEl = document.querySelector(this.OUTPUT_SELECTOR);
        let hintIntro = `<strong> Leider nicht richtig :-( Vielleicht hilft dieser Hinweis:</strong>  <br/> <br/>`;
        workingEl.classList.remove(this.DISPLAY_NONE);
        workingEl.classList.add(this.CLASS_WARNING)
        workingEl.classList.remove(this.CLASS_SUCCESS)
        workingEl.innerHTML = hintIntro + hint;
    }

    showNextStep(nextStep) {
        let workingEl = document.querySelector(this.OUTPUT_SELECTOR);
        let nextStepIntro = `<strong> Sehr gut! :-) Hier ist dein nächstes Ziel:</strong>  <br/> <br/>`;
        workingEl.classList.remove(this.DISPLAY_NONE);
        workingEl.classList.remove(this.CLASS_WARNING);
        workingEl.classList.add(this.CLASS_SUCCESS)
        workingEl.innerHTML = nextStepIntro + nextStep;
    }

    hideGroupSelection() {
        document.querySelector(this.FORM_SELECTOR).classList.remove(this.DISPLAY_NONE);
    }

    hideForm() {
        document.querySelector(this.GROUP_SELECTOR).classList.remove(this.DISPLAY_NONE);
    }

    showGroups(groupCount) {
        for(var i = 1; i <= groupCount; i++) {
            let groupLink = document.createElement("a");
            groupLink.href = `?group=${i}`;
            groupLink.classList.add("text-decoration-none","col-6");
            groupLink.target = "_self";

            let innerDiv = document.createElement("div");
            innerDiv.classList.add("p-3","border","bg-light","text-dark","text-center");

            let p = document.createElement("p");
            p.classList.add("m-0");
            p.innerHTML = `<strong>Gruppe ${i}</strong>`
            innerDiv.appendChild(p);

            groupLink.appendChild(innerDiv);

            document.querySelector(this.GROUP_CONTAINER_SELECTOR).appendChild(groupLink);
        }
    }
}

export {
    View
}