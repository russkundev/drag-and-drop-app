import { Autobind } from "../decorators/autobind";
import { Draggable } from "../interfaces/drag-drop";
import { Project } from "../models/project";
import { Component } from "./base-component";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  get persons() {
    const { people } = this.project;
    return `${people} ${people > 1 ? "persons" : "person"} assigned`;
  }

  constructor(hostId: string, private project: Project) {
    super("single-project", hostId, "afterbegin", project.id.toString());
    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(event: DragEvent) {
    const { dataTransfer } = event;
    if (!!dataTransfer) {
      dataTransfer.setData("text/plain", this.project.id.toString());
      dataTransfer.effectAllowed = "move";
    }
  }

  @Autobind
  dragEndHandler(event: DragEvent) {
    console.log(event);
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragStartHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
