import { Component, ContentChild } from "@angular/core";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { SMS } from "@ionic-native/sms/ngx";
import { ToastController } from "@ionic/angular";
import { Contacts,Contact, ContactName, ContactField } from "@ionic-native/contacts/ngx";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  myContacts: Contact[] = [];

  constructor(
    private contacts: Contacts,
    private callNumber: CallNumber,
    private sms: SMS,
    private toastCtrl: ToastController
  ) {}
  /////////////////////////// Load Contacts
  loadContacts() {
    let options = {
      filter: "",
      multiple: true,
      hasPhoneNumber: true,
    };

    this.contacts.find(["*"], options).then((contacts: Contact[]) => {
      this.myContacts = contacts;
      console.log("Contacts: ", contacts);
    });
  }
  /////////////////////////////
  sendSms(contact: Contact) {
    this.sms.send(contact.phoneNumbers[0].value, "this is a test");
  }
  /////////////////////////////
  call(contact: Contact) {
    this.callNumber.callNumber(contact.phoneNumbers[0].value, true);
  }
  /////////////////////////////
  createContact(){
    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null,'lastname','firstname');
    contact.phoneNumbers = [ new ContactField('mobile', '12345678')];
    contact.save().then(
      async () =>{
        let toast = await this.toastCtrl.create({
          message: 'Contact added!'
        });
        toast.present();
      },
      (error:any) => console.log('Error saving contact. ', error)
    )
  }
}
