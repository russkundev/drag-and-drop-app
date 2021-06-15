import { State } from "./base-state";
import { Project } from "../models/project";
import { ProjectStatus } from "../enums/project-status";

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!!this.instance) return this.instance;
    else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  addProject(title: string, desc: string, noOfPeople: number) {
    const newProj = new Project(
      Math.random(),
      title,
      desc,
      noOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProj);

    this.updateListeners();
  }

  moveProject(id: string, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === +id);
    if (!!project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projState = ProjectState.getInstance();
