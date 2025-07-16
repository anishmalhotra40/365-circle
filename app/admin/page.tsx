"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, PlusCircle, Edit, Trash2, Upload, Download } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const dummyEvents = [
  { id: 1, name: "Virtual Networking Meetup", date: "2023-11-15", location: "Online", status: "Upcoming" },
  { id: 2, name: "Creative Session: Design Thinking", date: "2023-12-05", location: "New York, NY", status: "Upcoming" },
  { id: 3, name: "Tech Industry Mixer", date: "2023-09-20", location: "San Francisco, CA", status: "Completed" },
];

interface Connection {
  id: number;
  s_no?: number;
  name: string;
  organization_name?: string;
  organization_type?: string;
  industry?: string;
  sub_sector?: string;
  connect_type?: string;
  designation: string;
  designation_level?: string;
  phone_number?: string;
  email_id?: string;
  linkedin_url?: string;
  featured: boolean;
  post_url?: string;
  created_at?: string;
}

const initialConnectionData: Omit<Connection, 'id'> = {
  name: '',
  organization_name: '',
  organization_type: '',
  industry: '',
  sub_sector: '',
  connect_type: '',
  designation: '',
  designation_level: '',
  phone_number: '',
  email_id: '',
  linkedin_url: '',
  featured: false,
  post_url: ''
};

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()
  const [connections, setConnections] = useState<Connection[]>([])
  const [isConnectionDialogOpen, setIsConnectionDialogOpen] = useState(false)
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null)
  const [connectionForm, setConnectionForm] = useState(initialConnectionData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchConnections()
  }, [])

  const fetchConnections = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Fetching connections...')
      
      const { data, error } = await supabase
        .from('365circle')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('Supabase response:', { data, error })

      if (error) {
        console.error('Supabase error:', error)
        setError(`Database error: ${error.message}`)
        throw error
      }
      
      console.log('Fetched connections:', data)
      setConnections(data || [])
    } catch (error) {
      console.error('Error fetching connections:', error)
      setError('Failed to fetch connections. Please check console for details.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddConnection = async () => {
    try {
      const { error } = await supabase
        .from('365circle')
        .insert([connectionForm])

      if (error) throw error
      
      await fetchConnections()
      setIsConnectionDialogOpen(false)
      setConnectionForm(initialConnectionData)
    } catch (error) {
      console.error('Error adding connection:', error)
    }
  }

  const handleEditConnection = async () => {
    if (!editingConnection) return

    try {
      const { error } = await supabase
        .from('365circle')
        .update(connectionForm)
        .eq('id', editingConnection.id)

      if (error) throw error
      
      await fetchConnections()
      setIsConnectionDialogOpen(false)
      setEditingConnection(null)
      setConnectionForm(initialConnectionData)
    } catch (error) {
      console.error('Error updating connection:', error)
    }
  }

  const handleDeleteConnection = async (id: number) => {
    if (!confirm('Are you sure you want to delete this connection?')) return

    try {
      const { error } = await supabase
        .from('365circle')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      await fetchConnections()
    } catch (error) {
      console.error('Error deleting connection:', error)
    }
  }

  const openEditDialog = (connection: Connection) => {
    setEditingConnection(connection)
    setConnectionForm({
      name: connection.name,
      organization_name: connection.organization_name || '',
      organization_type: connection.organization_type || '',
      industry: connection.industry || '',
      sub_sector: connection.sub_sector || '',
      connect_type: connection.connect_type || '',
      designation: connection.designation,
      designation_level: connection.designation_level || '',
      phone_number: connection.phone_number || '',
      email_id: connection.email_id || '',
      linkedin_url: connection.linkedin_url || '',
      featured: connection.featured,
      post_url: connection.post_url || ''
    })
    setIsConnectionDialogOpen(true)
  }

  const resetForm = () => {
    setConnectionForm(initialConnectionData)
    setEditingConnection(null)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const handleExportCSV = () => {
    if (connections.length === 0) {
      alert('No data to export')
      return
    }

    const headers = [
      'Name', 'Designation', 'Organization Name', 'Organization Type',
      'Industry', 'Sub Sector', 'Connect Type', 'Designation Level',
      'Phone Number', 'Email', 'LinkedIn URL', 'Featured', 'Post URL'
    ]

    const csvContent = [
      headers.join(','),
      ...connections.map(conn => [
        `"${conn.name || ''}"`,
        `"${conn.designation || ''}"`,
        `"${conn.organization_name || ''}"`,
        `"${conn.organization_type || ''}"`,
        `"${conn.industry || ''}"`,
        `"${conn.sub_sector || ''}"`,
        `"${conn.connect_type || ''}"`,
        `"${conn.designation_level || ''}"`,
        `"${conn.phone_number || ''}"`,
        `"${conn.email_id || ''}"`,
        `"${conn.linkedin_url || ''}"`,
        conn.featured ? 'Yes' : 'No',
        `"${conn.post_url || ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `365circle-connections-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string
        const rows = text.split('\n').map(row => row.split(',').map(cell => cell.replace(/"/g, '').trim()))
        
        // Skip header row
        const dataRows = rows.slice(1).filter(row => row.length > 1 && row[0])

        const importData = dataRows.map(row => ({
          name: row[0] || '',
          designation: row[1] || '',
          organization_name: row[2] || '',
          organization_type: row[3] || '',
          industry: row[4] || '',
          sub_sector: row[5] || '',
          connect_type: row[6] || '',
          designation_level: row[7] || '',
          phone_number: row[8] || '',
          email_id: row[9] || '',
          linkedin_url: row[10] || '',
          featured: row[11]?.toLowerCase() === 'yes' || row[11]?.toLowerCase() === 'true',
          post_url: row[12] || ''
        }))

        console.log('Importing data:', importData)

        let successCount = 0
        let errorCount = 0

        // Process each record individually for upsert
        for (const record of importData) {
          try {
            // First, try to find existing record by name and email (or just name if no email)
            const { data: existingData, error: findError } = await supabase
              .from('365circle')
              .select('id')
              .eq('name', record.name)
              .limit(1)

            if (findError) {
              console.error('Error finding existing record:', findError)
              errorCount++
              continue
            }

            if (existingData && existingData.length > 0) {
              // Update existing record
              const { error: updateError } = await supabase
                .from('365circle')
                .update(record)
                .eq('id', existingData[0].id)

              if (updateError) {
                console.error('Error updating record:', updateError)
                errorCount++
              } else {
                successCount++
              }
            } else {
              // Insert new record
              const { error: insertError } = await supabase
                .from('365circle')
                .insert([record])

              if (insertError) {
                console.error('Error inserting record:', insertError)
                errorCount++
              } else {
                successCount++
              }
            }
          } catch (error) {
            console.error('Error processing record:', error)
            errorCount++
          }
        }

        if (successCount > 0) {
          alert(`Successfully processed ${successCount} connections${errorCount > 0 ? ` (${errorCount} errors)` : ''}`)
          await fetchConnections()
        } else {
          alert(`Import failed: ${errorCount} errors occurred`)
        }
      } catch (error) {
        console.error('File parsing error:', error)
        alert('Error parsing file. Please ensure it\'s a valid CSV format.')
      }
    }

    reader.readAsText(file)
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-blue-50/50 font-sans text-blue-900">
      <header className="bg-[#dbeafe] border-b border-blue-100 sticky top-0 z-40">
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
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImportFile}
                  accept=".csv,.xlsx,.xls"
                  style={{ display: 'none' }}
                />
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  Import CSV
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={handleExportCSV}
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
                <Dialog open={isConnectionDialogOpen} onOpenChange={(open) => {
                  setIsConnectionDialogOpen(open)
                  if (!open) resetForm()
                }}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700 text-white">
                      <PlusCircle className="h-4 w-4" />
                      Add Connection
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingConnection ? 'Edit Connection' : 'Add New Connection'}</DialogTitle>
                      <DialogDescription>
                        {editingConnection ? 'Update the connection details below.' : 'Fill in the details to add a new connection.'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            value={connectionForm.name}
                            onChange={(e) => setConnectionForm({...connectionForm, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="designation">Designation *</Label>
                          <Input
                            id="designation"
                            value={connectionForm.designation}
                            onChange={(e) => setConnectionForm({...connectionForm, designation: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="organization_name">Organization Name</Label>
                          <Input
                            id="organization_name"
                            value={connectionForm.organization_name}
                            onChange={(e) => setConnectionForm({...connectionForm, organization_name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="organization_type">Organization Type</Label>
                          <Input
                            id="organization_type"
                            value={connectionForm.organization_type}
                            onChange={(e) => setConnectionForm({...connectionForm, organization_type: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <Input
                            id="industry"
                            value={connectionForm.industry}
                            onChange={(e) => setConnectionForm({...connectionForm, industry: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sub_sector">Sub Sector</Label>
                          <Input
                            id="sub_sector"
                            value={connectionForm.sub_sector}
                            onChange={(e) => setConnectionForm({...connectionForm, sub_sector: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="connect_type">Connect Type</Label>
                          <Input
                            id="connect_type"
                            value={connectionForm.connect_type}
                            onChange={(e) => setConnectionForm({...connectionForm, connect_type: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="designation_level">Designation Level</Label>
                          <Input
                            id="designation_level"
                            value={connectionForm.designation_level}
                            onChange={(e) => setConnectionForm({...connectionForm, designation_level: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone_number">Phone Number</Label>
                          <Input
                            id="phone_number"
                            value={connectionForm.phone_number}
                            onChange={(e) => setConnectionForm({...connectionForm, phone_number: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email_id">Email</Label>
                          <Input
                            id="email_id"
                            type="email"
                            value={connectionForm.email_id}
                            onChange={(e) => setConnectionForm({...connectionForm, email_id: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                          <Input
                            id="linkedin_url"
                            value={connectionForm.linkedin_url}
                            onChange={(e) => setConnectionForm({...connectionForm, linkedin_url: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="post_url">Post URL</Label>
                          <Input
                            id="post_url"
                            value={connectionForm.post_url}
                            onChange={(e) => setConnectionForm({...connectionForm, post_url: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="featured"
                          checked={connectionForm.featured}
                          onCheckedChange={(checked) => setConnectionForm({...connectionForm, featured: !!checked})}
                        />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsConnectionDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={editingConnection ? handleEditConnection : handleAddConnection}>
                        {editingConnection ? 'Update' : 'Add'} Connection
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                    <p>Loading connections...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button onClick={fetchConnections} variant="outline">
                    Retry
                  </Button>
                </div>
              ) : connections.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-gray-500 mb-4">No connections found</p>
                  <p className="text-sm text-gray-400">Add your first connection to get started</p>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto border rounded-md">
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10 border-b">
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Designation</TableHead>
                        <TableHead className="hidden sm:table-cell">Organization</TableHead>
                        <TableHead className="hidden md:table-cell">Industry</TableHead>
                        <TableHead className="hidden lg:table-cell">Connect Type</TableHead>
                        <TableHead className="hidden lg:table-cell">Phone</TableHead>
                        <TableHead className="hidden xl:table-cell">Email</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="hidden md:table-cell">Added</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {connections.map((conn) => (
                        <TableRow key={conn.id}>
                          <TableCell className="font-medium">{conn.name}</TableCell>
                          <TableCell>{conn.designation}</TableCell>
                          <TableCell className="hidden sm:table-cell">{conn.organization_name || '-'}</TableCell>
                          <TableCell className="hidden md:table-cell">{conn.industry || '-'}</TableCell>
                          <TableCell className="hidden lg:table-cell">{conn.connect_type || '-'}</TableCell>
                          <TableCell className="hidden lg:table-cell">{conn.phone_number || '-'}</TableCell>
                          <TableCell className="hidden xl:table-cell">{conn.email_id || '-'}</TableCell>
                          <TableCell>
                            <Badge variant={conn.featured ? 'default' : 'secondary'} className={conn.featured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                              {conn.featured ? 'Featured' : 'Regular'}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {conn.created_at ? new Date(conn.created_at).toLocaleDateString() : '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-8 w-8 p-0 rounded-full">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => openEditDialog(conn)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteConnection(conn.id)} className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
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
              <div className="max-h-96 overflow-y-auto border rounded-md">
                <Table>
                  <TableHeader className="sticky top-0 bg-white z-10 border-b">
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
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="h-8 w-8 p-0 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
