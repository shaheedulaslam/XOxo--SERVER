import twilio from 'twilio';


const accountSid: string = "AC5880123154a811544f35aaea70347b18";
const authToken: string = "7e775d313743becfc1722a2380c47779"
const verifySid: string = "VA738da743eb50a18af746be1f135aee2f";
const client: twilio.Twilio = twilio(accountSid, authToken);
console.log(authToken, verifySid, accountSid);




export const sentOtp = (phonenum: number): void => {
  client.verify.v2.services(verifySid)
    .verifications.create({ to: `+91${phonenum}`, channel: "sms" })
    .then((verification: any) => console.log(phonenum,"otp aychuuu"))
}

export const confirmOtp = async (otpCode: any, number: any) => {
  try{const response = await client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to: `+91${number}`, code: otpCode })
    return response.status
  }catch(error){
    console.log(error,'eeeerrrrrroorrrrrr------')
  }

};


