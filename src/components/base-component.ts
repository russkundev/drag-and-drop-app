export abstract class Component<
  TParent extends HTMLElement,
  TChild extends HTMLElement
> {
  templateElement: HTMLTemplateElement;
  hostElement: TParent;
  element: TChild;

  constructor(
    templateId: string,
    hostId: string,
    insertPosition: "beforeend" | "afterbegin",
    elementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId) as TParent;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as TChild;
    if (!!elementId) this.element.id = elementId;

    this.hostElement.insertAdjacentElement(insertPosition, this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
