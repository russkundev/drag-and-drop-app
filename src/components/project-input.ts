import { Autobind } from "../decorators/autobind";
import { Validatable } from "../interfaces/validatable";
import { projState } from "../states/project-state";
import { validate } from "../utils/validate";
import { Component } from "./base-component";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", "afterbegin", "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  renderContent() {}

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projState.addProject(title, desc, people);
      this.resetForm();
    }
  }

  private getUserInput(): [string, string, number] | void {
    const title: Validatable = {
      value: this.titleInputElement.value,
      required: true,
    };
    const desc: Validatable = {
      value: this.descInputElement.value,
      required: true,
      minLength: 5,
    };
    const people: Validatable = {
      value: +this.peopleInputElement.value,
      required: true,
      min: 1,
      max: 5,
    };

    if (validate(title) && validate(desc) && validate(people)) {
      return [title.value.toString(), desc.value.toString(), +people.value];
    } else {
      alert("Please try again!");
    }
  }

  private resetForm() {
    this.titleInputElement.value = "";
    this.descInputElement.value = "";
    this.peopleInputElement.value = "";
  }
}
