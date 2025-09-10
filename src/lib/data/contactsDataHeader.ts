import { IContactsDataHeader } from "@/types";

/**
 * @description
 * hrefMailTo - mailto params for email link "mailto:someEmail@some.com
 * hrefTel - params for telephone link "tel:......"
 * telAriaLabel -
 */
export const contactsDataHeader: IContactsDataHeader = {
  hrefMailTo: "mailto:agl@ag-landscape.com",
  hrefTelTo: "tel:+13034679619",
  telLabel: "303-467-9619",
  telAriaLabel: "make a call to the master",
  email: "agl@ag-landscape.com",
  addressItems: ["4310 Youngfield St.", "Wheat Ridge, CO"],
} as const;
