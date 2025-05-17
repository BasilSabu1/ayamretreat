
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
  
  },

  MEMBERSHIP:{
    GET_MEMBERSHIP:"/api/subscription/list/"
  },

   RESORTS:{
    GET_RESORTS:"/api/resorts/"
  },

  PLACES:{
    GET_PLACES:"/api/place/"
  },

   PAYMENT:{
    POST_CREATE_ORDER:"api/create-order/",
    GET_PAYMENT:"/api/payments/"
  },

  
   POINTS:{
    GET_POINTS:"api/points/"
  },

  REFFERALS:{
    POST_REFFERALS:"/api/referrals/create/",
    GET_REFFERALS:"/api/referrals/"

  },


  VERIFY_PAYMENT:{
    POST_VERIFY_PAYMENT:"api/verify-payment"
  }
};
