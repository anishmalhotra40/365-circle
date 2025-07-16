"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/dropdown-menu"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import Image from "next/image"

const dummyConnections = [
  { id: 1, name: "Johnathan Doe", title: "AI Researcher", status: "Published", dateAdded: "2023-10-26" },
  { id: 2, name: "Jane Smith", title: "UX Designer", status: "Published", dateAdded: "2023-10-25" },
  { id: 3, name: "Sam Wilson", title: "Growth Hacker", status: "Draft", dateAdded: "2023-10-24" },
  { id: 4, name: "Emily White", title: "Data Scientist", status: "Published", dateAdded: "2023-10-22" },
];

const dummyEvents = [
  { id: 1, name: "Virtual Networking Meetup", date: "2023-11-15", location: "Online", status: "Upcoming" },
  { id: 2, name: "Creative Session: Design Thinking", date: "2023-12-05", location: "New York, NY", status: "Upcoming" },
  { id: 3, name: "Tech Industry Mixer", date: "2023-09-20", location: "San Francisco, CA", status: "Completed" },
];

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-blue-50/50 font-sans text-blue-900">
      <header className="bg-blue-300 border-b border-blue-100 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="The 365 Circle Logo" width={40} height={40} className="h-10 w-auto" />
            <span className="font-bold text-blue-800 text-xl">Admin Portal</span>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid gap-8">
          <Card className="border-blue-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Manage Connections</CardTitle>
                <CardDescription className="text-blue-800/80">Add, edit, or remove featured professionals.</CardDescription>
              </div>
              <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700 text-white">
                <PlusCircle className="h-4 w-4" />
                Add Connection
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date Added</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyConnections.map((conn) => (
                    <TableRow key={conn.id}>
                      <TableCell className="font-medium">{conn.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{conn.title}</TableCell>
                      <TableCell>
                        <Badge variant={conn.status === 'Published' ? 'default' : 'secondary'} className={conn.status === 'Published' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>{conn.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{conn.dateAdded}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border-blue-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Manage Events</CardTitle>
                <CardDescription className="text-blue-800/80">Create and manage networking events.</CardDescription>
              </div>
              <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700 text-white">
                <PlusCircle className="h-4 w-4" />
                Add Event
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{event.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{event.location}</TableCell>
                      <TableCell>
                        <Badge variant={event.status === 'Upcoming' ? 'default' : 'secondary'} className={event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>{event.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}