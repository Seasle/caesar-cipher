export default class Tabs {
  public list: HTMLDivElement | null;
  public buttons: Map<string | undefined, HTMLButtonElement>;
  public containers: Map<string | undefined, HTMLDivElement>;
  private salt: string;
  private current: number;
  public active: number | null;

  constructor(public element: HTMLElement) {
    this.list = element.querySelector<HTMLDivElement>('[data-list]');
    this.buttons = new Map(
      [...element.querySelectorAll<HTMLButtonElement>('[data-target]')].map((entry) => [
        entry.dataset.target,
        entry,
      ])
    );
    this.containers = new Map(
      [...element.querySelectorAll<HTMLDivElement>('[data-tab]')].map((entry) => [
        entry.dataset.tab,
        entry,
      ])
    );
    this.salt = Math.random().toString(36).slice(2);
    this.current = 0;
    this.active = null;

    this.init();
  }

  public select(name: string): void {
    const keys = [...this.buttons.keys()];

    for (const [key, button] of this.buttons.entries()) {
      button.setAttribute('aria-selected', (key === name).toString());
    }

    for (const [key, container] of this.containers.entries()) {
      if (key === name) {
        container.removeAttribute('hidden');
      } else {
        container.setAttribute('hidden', 'true');
      }
    }

    this.active = keys.indexOf(name);
  }

  private init() {
    const keys = [...this.buttons.keys()];

    this.list?.setAttribute('role', 'tablist');

    this.list?.addEventListener('keydown', (event) => {
      if (event.code === 'Home') {
        event.preventDefault();

        this.buttons.get(keys[0])?.focus();
      }

      if (event.code === 'End') {
        event.preventDefault();

        this.buttons.get(keys[keys.length - 1])?.focus();
      }

      if (event.code === 'ArrowLeft') {
        event.preventDefault();

        this.buttons.get(keys[Math.max(0, this.current - 1)])?.focus();
      }

      if (event.code === 'ArrowRight') {
        event.preventDefault();

        this.buttons.get(keys[Math.min(keys.length - 1, this.current + 1)])?.focus();
      }
    });

    for (const [key, button] of this.buttons.entries()) {
      if (key === undefined) {
        continue;
      }

      button.setAttribute('tabindex', '0');
      button.setAttribute('id', `button_${this.salt}_${key}`);
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', `container_${this.salt}_${key}`);

      button.addEventListener('click', (event) => {
        event.preventDefault();

        this.select(key);
      });

      button.addEventListener('focus', () => {
        this.current = keys.indexOf(key);
      });

      button.addEventListener('keypress', (event) => {
        if (event.code === 'Enter' || event.code === 'Space') {
          event.preventDefault();

          this.select(key);
        }
      });
    }

    for (const [key, container] of this.containers.entries()) {
      container.setAttribute('id', `container_${this.salt}_${key}`);
      container.setAttribute('role', 'tabpanel');
      container.setAttribute('aria-labelledby', `button_${this.salt}_${key}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.select(keys[0]!);
  }

  public static create(element: HTMLElement): Tabs {
    return new Tabs(element);
  }
}
