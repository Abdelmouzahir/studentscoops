"use client"
import React, { useState } from 'react'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
export default function MyProfile(){

const [showAlert, setShowAlert] = useState(false)

const handleSearch = () => {
  
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 4000)
 
}
return (
    <div className="flex flex-col min-h-screen">
    <section className='m-10 mt-6 p-10 w-2/3'>
            <h2 className="text-2xl font-bold mb-4">Account</h2>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your name, email, and phone number.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 555-5555" />
                </div>
              </CardContent>
              <CardFooter>
                <Button  onClick={handleSearch} className="transition-transform hover:scale-105">Save Changes</Button>
              </CardFooter>
            </Card>
          </section>
          {showAlert && (
        <div className="fixed p-3 w-30 top-15 right-4 p-2 bg-green-500 text-white rounded-md shadow-md">
          <p>Your Details are saved</p>
        </div>
      )}
          </div>

)
}
