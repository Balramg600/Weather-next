import {NextRequest, NextResponse} from "next/server";

export async function GET(request:any) {
    const {searchParams}=new URL(request.url);
    const address=searchParams.get("address");
    const lat=searchParams.get("lat");
    const lon=searchParams.get("lon");

    let url="";
    if(address){
        url="https://api.openweathermap.org/data/2.5/weather?q="+address+"&appid="+"2a134b801b24b65a7db9658f455b3326";
    }else{
        url="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+"2a134b801b24b65a7db9658f455b3326";
    }

    const res=await fetch(url);
    const data=await res.json();
    return NextResponse.json({data});
}