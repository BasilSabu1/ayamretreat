
export const API_URLS = {
  REGISTRATION: {
    POST_REGISTRATION: "api/register/",
    GET_REGISTRATION: "api/register/",
    PATCH_REGISTRATION:(id)=>`api/register/${id}/`

  },

  FIREBASE_REGISTRATION: {
    POST_FIREBASE: "api/phone-number/",
  },

  ADDRESS: {
    POST_ADDRESS: "api/address/",
    GET_ADDRESS: "api/address/",
    PATCH_ADDRESS:(id)=>`api/address/${id}/`,
  
  }
};
