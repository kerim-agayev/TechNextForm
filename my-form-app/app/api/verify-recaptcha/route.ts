import { NextResponse } from "next/server";

export async function POST(req:Request){
const body = await req.json();
const {token} = body;
console.log(`token router:${token}`)
const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
const verificationResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
{
    method:"POST"
}
);

console.log(`verificationResponse:${verificationResponse}`)

const verification =  await verificationResponse.json();
//console.log(`verification:${verification}`)
if(verification.success && verification.score > 0.5){
return NextResponse.json({
    success:true, 
    // score:verification.score
})
}else{
    return NextResponse.json({
        success:false, 
        // score:verification.score,
        // errorCodes:verification["error-codes"]
    })
}
}

