import { Autobind } from "../decorators/autobind";
import { ProjectStatus } from "../enums/project-status";
import { DragTarget } from "../interfaces/drag-drop";
import { Project } from "../models/project";
import { projState } from "../states/project-state";
import { Component } from "./base-component";
import { ProjectItem } from "./project-item";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", "beforeend", `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    const { dataTransfer } = event;
    if (!!dataTransfer && dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listElement = this.element.querySelector("ul") as HTMLUListElement;
      listElement.classList.add("droppable");
    }
  }

  @Autobind
  dropHandler(event: DragEvent) {
    const { dataTransfer } = event;
    if (!!dataTransfer) {
      const id = dataTransfer.getData("text/plain");
      const newStatus =
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished;
      projState.moveProject(id, newStatus);
    }
  }

  @Autobind
  dragLeaveHandler(_event: DragEvent) {
    const listElement = this.element.querySelector("ul") as HTMLUListElement;
    listElement.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);

    projState.addListener((projects: Project[]) => {
      if (this.type === "active")
        this.assignedProjects = projects.filter(
          (proj) => proj.status === ProjectStatus.Active
        );

      if (this.type === "finished")
        this.assignedProjects = projects.filter(
          (proj) => proj.status === ProjectStatus.Finished
        );

      this.renderProject();
    });
  }

  renderContent() {
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    this.element.querySelector("ul")!.id = `${this.type}-project-list`;
  }

  private renderProject() {
    const ulElement: HTMLUListElement = document.getElementById(
      `${this.type}-project-list`
    ) as HTMLUListElement;

    ulElement.innerHTML = "";
    for (const proj of this.assignedProjects) {
      new ProjectItem(ulElement.id, proj);
    }
  }
}
