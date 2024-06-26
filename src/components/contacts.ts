import { IEvents } from './base/events';
import { Form } from './common/form';


export interface IContacts {
  phone: string;
  email: string;
}

export class Contacts extends Form<IContacts> {
  constructor(
    container: HTMLFormElement,
    events: IEvents
  ) {
    super(container, events);
  }

  public get phone(): string {
    return this.phone
  }


  public set phone(newPhone: string) {
    this.phone = newPhone;
  }

  public get email(): string {
    return this.email
  }


  public set email(newEmail: string) {
    this.phone = newEmail;
  }

}