import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import admin from "@/models/admin-data";

export async function POST(req) {
    const { email, password, role } = req.json();
    try{
        await connectDB();
        await admin.create({email, password, role})
        return NextResponse.redirect(`/login}`);
    }
    catch(err){
        console.log(err);
    }
}