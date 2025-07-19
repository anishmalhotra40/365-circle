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
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, PlusCircle, Edit, Trash2, Upload, Download, Users, Star, Calendar, Network, LogOut, Menu, X, ChevronDown, Key } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"

interface Connection {
  id: number;
  "Name": string;
  "Designation ": string;
  "Organization Name"?: string;
  "Organization Type (Small/ Medium/ Large)"?: string;
  "Industry "?: string;
  "Sub Sector"?: string;
  "Type of connect (Founder/ Employee/ Freelancer)"?: string;
  "Designation Type (Senior/ Mid/ Entry Level)"?: string;
  "Phone Number"?: string;
  "Email ID"?: string;
  "Linkedin "?: string;
  "Featured "?: string;
  "Featured post URL "?: string;
  "Photo URL"?: string;
  created_at?: string;
}

interface Member {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  industry?: string;
  interests?: string[];
  created_at: string;
}

interface FeaturedSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  industry?: string;
  experience: string;
  created_at: string;
}

interface Event {
  id: number;
  name: string;
  description?: string;
  date: string;
  time?: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  image_url?: string;
  max_attendees?: number;
  registration_required: boolean;
  created_at: string;
  updated_at: string;
}

interface EventRegistration {
  id: number;
  event_id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  industry?: string;
  event_preference?: string;
  created_at: string;
  events?: {
    name: string;
    date: string;
    time?: string;
    location: string;
  };
}

const initialConnectionData: Omit<Connection, 'id' | 'created_at'> = {
  "Name": '',
  "Designation ": '',
  "Organization Name": '',
  "Organization Type (Small/ Medium/ Large)": '',
  "Industry ": '',
  "Sub Sector": '',
  "Type of connect (Founder/ Employee/ Freelancer)": '',
  "Designation Type (Senior/ Mid/ Entry Level)": '',
  "Phone Number": '',
  "Email ID": '',
  "Linkedin ": '',
  "Featured ": 'No',
  "Featured post URL ": '',
  "Photo URL": ''
};

const initialEventData: Omit<Event, 'id' | 'created_at' | 'updated_at'> = {
  name: '',
  description: '',
  date: '',
  time: '',
  location: '',
  status: 'upcoming',
  image_url: '',
  max_attendees: undefined,
  registration_required: false
};

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()
  
  // Add sidebar and user state
  const [activeTab, setActiveTab] = useState<'connections' | 'members' | 'featured' | 'events' | 'registrations'>('connections')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userEmail, setUserEmail] = useState<string>('')
  const [connections, setConnections] = useState<Connection[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [featuredSubmissions, setFeaturedSubmissions] = useState<FeaturedSubmission[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([])
  const [isConnectionDialogOpen, setIsConnectionDialogOpen] = useState(false)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [connectionForm, setConnectionForm] = useState(initialConnectionData)
  const [eventForm, setEventForm] = useState(initialEventData)
  const [loading, setLoading] = useState(true)
  const [membersLoading, setMembersLoading] = useState(true)
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [eventsLoading, setEventsLoading] = useState(true)
  const [registrationsLoading, setRegistrationsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [membersError, setMembersError] = useState<string | null>(null)
  const [featuredError, setFeaturedError] = useState<string | null>(null)
  const [eventsError, setEventsError] = useState<string | null>(null)
  const [registrationsError, setRegistrationsError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'created_at' | 'Name' | 'Designation ' | 'Organization Name'>('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [membersSortBy, setMembersSortBy] = useState<'id' | 'created_at' | 'name' | 'email' | 'company'>('id')
  const [membersSortOrder, setMembersSortOrder] = useState<'asc' | 'desc'>('asc')
  const [featuredSortBy, setFeaturedSortBy] = useState<'id' | 'created_at' | 'name' | 'email' | 'company'>('id')
  const [featuredSortOrder, setFeaturedSortOrder] = useState<'asc' | 'desc'>('asc')
  const [eventsSortBy, setEventsSortBy] = useState<'id' | 'created_at' | 'name' | 'date' | 'status'>('date')
  const [eventsSortOrder, setEventsSortOrder] = useState<'asc' | 'desc'>('desc')
  const [registrationsSortBy, setRegistrationsSortBy] = useState<'id' | 'created_at' | 'name' | 'email' | 'events.name'>('created_at')
  const [registrationsSortOrder, setRegistrationsSortOrder] = useState<'asc' | 'desc'>('desc')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const eventImageInputRef = useRef<HTMLInputElement>(null)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Get user email on component mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setUserEmail(user.email)
      }
    }
    getUser()
  }, [supabase])

  const fetchConnections = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Fetching connections...')
      console.log('Supabase client:', supabase)
      
      const { data, error } = await supabase
        .from('365circle')
        .select('*')

      console.log('Supabase response:', { data, error })

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        setError(`Database error: ${error.message}`)
        return
      }
      
      console.log('Fetched connections count:', data?.length || 0)
      console.log('Sample connection:', data?.[0])
      
      // Sort the data locally since Supabase has issues with column names containing spaces
      let sortedData = data || []
      if (sortedData.length > 0) {
        sortedData = [...sortedData].sort((a, b) => {
          let aValue, bValue
          
          switch (sortBy) {
            case 'Name':
              aValue = a["Name"] || ''
              bValue = b["Name"] || ''
              break
            case 'Designation ':
              aValue = a["Designation "] || ''
              bValue = b["Designation "] || ''
              break
            case 'Organization Name':
              aValue = a["Organization Name"] || ''
              bValue = b["Organization Name"] || ''
              break
            case 'created_at':
            default:
              aValue = a.created_at || ''
              bValue = b.created_at || ''
              break
          }
          
          // Convert to lowercase for case-insensitive sorting
          if (typeof aValue === 'string') aValue = aValue.toLowerCase()
          if (typeof bValue === 'string') bValue = bValue.toLowerCase()
          
          if (sortOrder === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
          }
        })
      }
      
      setConnections(sortedData)
    } catch (error) {
      console.error('Catch block error:', error)
      setError(`Failed to fetch connections: ${error}`)
    } finally {
      setLoading(false)
    }
  }, [supabase, sortBy, sortOrder])

  const fetchMembers = useCallback(async () => {
    try {
      setMembersLoading(true)
      setMembersError(null)
      
      console.log('Fetching members...')
      
      const { data, error } = await supabase
        .from('members')
        .select('*')

      console.log('Members response:', { data, error })

      if (error) {
        console.error('Members error details:', error)
        setMembersError(`Database error: ${error.message}`)
        return
      }
      
      console.log('Fetched members count:', data?.length || 0)
      
      // Sort the data locally
      let sortedData = data || []
      if (sortedData.length > 0) {
        sortedData = [...sortedData].sort((a, b) => {
          let aValue, bValue
          
          switch (membersSortBy) {
            case 'id':
              aValue = a.id
              bValue = b.id
              break
            case 'name':
              aValue = a.name || ''
              bValue = b.name || ''
              break
            case 'email':
              aValue = a.email || ''
              bValue = b.email || ''
              break
            case 'company':
              aValue = a.company || ''
              bValue = b.company || ''
              break
            case 'created_at':
            default:
              aValue = a.created_at || ''
              bValue = b.created_at || ''
              break
          }
          
          // Handle numeric sorting for ID
          if (membersSortBy === 'id') {
            if (membersSortOrder === 'asc') {
              return aValue - bValue
            } else {
              return bValue - aValue
            }
          }
          
          // Handle string sorting for other fields
          if (typeof aValue === 'string') aValue = aValue.toLowerCase()
          if (typeof bValue === 'string') bValue = bValue.toLowerCase()
          
          if (membersSortOrder === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
          }
        })
      }
      
      setMembers(sortedData)
    } catch (error) {
      console.error('Error fetching members:', error)
      setMembersError(`Failed to fetch members: ${error}`)
    } finally {
      setMembersLoading(false)
    }
  }, [supabase, membersSortBy, membersSortOrder])

  const fetchFeaturedSubmissions = useCallback(async () => {
    try {
      setFeaturedLoading(true)
      setFeaturedError(null)
      
      console.log('Fetching featured submissions...')
      
      const { data, error } = await supabase
        .from('featured_submissions')
        .select('*')

      console.log('Featured submissions response:', { data, error })

      if (error) {
        console.error('Featured submissions error details:', error)
        setFeaturedError(`Database error: ${error.message}`)
        return
      }
      
      console.log('Fetched featured submissions count:', data?.length || 0)
      
      // Sort the data locally
      let sortedData = data || []
      if (sortedData.length > 0) {
        sortedData = [...sortedData].sort((a, b) => {
          let aValue, bValue
          
          switch (featuredSortBy) {
            case 'id':
              aValue = a.id
              bValue = b.id
              break
            case 'name':
              aValue = a.name || ''
              bValue = b.name || ''
              break
            case 'email':
              aValue = a.email || ''
              bValue = b.email || ''
              break
            case 'company':
              aValue = a.company || ''
              bValue = b.company || ''
              break
            case 'created_at':
            default:
              aValue = a.created_at || ''
              bValue = b.created_at || ''
              break
          }
          
          // Handle numeric sorting for ID
          if (featuredSortBy === 'id') {
            if (featuredSortOrder === 'asc') {
              return aValue - bValue
            } else {
              return bValue - aValue
            }
          }
          
          // Handle string sorting for other fields
          if (typeof aValue === 'string') aValue = aValue.toLowerCase()
          if (typeof bValue === 'string') bValue = bValue.toLowerCase()
          
          if (featuredSortOrder === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
          }
        })
      }
      
      setFeaturedSubmissions(sortedData)
    } catch (error) {
      console.error('Error fetching featured submissions:', error)
      setFeaturedError(`Failed to fetch featured submissions: ${error}`)
    } finally {
      setFeaturedLoading(false)
    }
  }, [supabase, featuredSortBy, featuredSortOrder])

  const fetchEvents = useCallback(async () => {
    try {
      setEventsLoading(true)
      setEventsError(null)
      
      console.log('Fetching events...')
      
      const { data, error } = await supabase
        .from('events')
        .select('*')

      console.log('Events response:', { data, error })

      if (error) {
        console.error('Events error details:', error)
        setEventsError(`Database error: ${error.message}`)
        return
      }
      
      console.log('Fetched events count:', data?.length || 0)
      
      // Sort the data locally
      let sortedData = data || []
      if (sortedData.length > 0) {
        sortedData = [...sortedData].sort((a, b) => {
          let aValue, bValue
          
          switch (eventsSortBy) {
            case 'id':
              aValue = a.id
              bValue = b.id
              break
            case 'name':
              aValue = a.name || ''
              bValue = b.name || ''
              break
            case 'date':
              aValue = a.date || ''
              bValue = b.date || ''
              break
            case 'status':
              aValue = a.status || ''
              bValue = b.status || ''
              break
            case 'created_at':
            default:
              aValue = a.created_at || ''
              bValue = b.created_at || ''
              break
          }
          
          // Handle numeric sorting for ID
          if (eventsSortBy === 'id') {
            if (eventsSortOrder === 'asc') {
              return aValue - bValue
            } else {
              return bValue - aValue
            }
          }
          
          // Handle string sorting for other fields
          if (typeof aValue === 'string') aValue = aValue.toLowerCase()
          if (typeof bValue === 'string') bValue = bValue.toLowerCase()
          
          if (eventsSortOrder === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
          }
        })
      }
      
      setEvents(sortedData)
    } catch (error) {
      console.error('Error fetching events:', error)
      setEventsError(`Failed to fetch events: ${error}`)
    } finally {
      setEventsLoading(false)
    }
  }, [supabase, eventsSortBy, eventsSortOrder])

  const fetchEventRegistrations = useCallback(async () => {
    try {
      setRegistrationsLoading(true)
      setRegistrationsError(null)
      
      console.log('Fetching event registrations...')
      
      // Fetch registrations with event data using join
      const { data, error } = await supabase
        .from('event_registrations')
        .select(`
          *,
          events (
            name,
            date,
            time,
            location
          )
        `)

      console.log('Event registrations response:', { data, error })

      if (error) {
        console.error('Event registrations error details:', error)
        setRegistrationsError(`Database error: ${error.message}`)
        return
      }
      
      console.log('Fetched event registrations count:', data?.length || 0)
      
      // Sort the data locally
      let sortedData = data || []
      if (sortedData.length > 0) {
        sortedData = [...sortedData].sort((a, b) => {
          let aValue, bValue
          
          switch (registrationsSortBy) {
            case 'id':
              aValue = a.id
              bValue = b.id
              break
            case 'name':
              aValue = a.name || ''
              bValue = b.name || ''
              break
            case 'email':
              aValue = a.email || ''
              bValue = b.email || ''
              break
            case 'events.name':
              aValue = a.events?.name || ''
              bValue = b.events?.name || ''
              break
            case 'created_at':
            default:
              aValue = a.created_at || ''
              bValue = b.created_at || ''
              break
          }
          
          // Handle numeric sorting for ID
          if (registrationsSortBy === 'id') {
            if (registrationsSortOrder === 'asc') {
              return aValue - bValue
            } else {
              return bValue - aValue
            }
          }
          
          // Handle string sorting for other fields
          if (typeof aValue === 'string') aValue = aValue.toLowerCase()
          if (typeof bValue === 'string') bValue = bValue.toLowerCase()
          
          if (registrationsSortOrder === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
          }
        })
      }
      
      setEventRegistrations(sortedData)
    } catch (error) {
      console.error('Error fetching event registrations:', error)
      setRegistrationsError(`Failed to fetch event registrations: ${error}`)
    } finally {
      setRegistrationsLoading(false)
    }
  }, [supabase, registrationsSortBy, registrationsSortOrder])

  useEffect(() => {
    fetchConnections()
    fetchMembers()
    fetchFeaturedSubmissions()
    fetchEvents()
    fetchEventRegistrations()
  }, [fetchConnections, fetchMembers, fetchFeaturedSubmissions, fetchEvents, fetchEventRegistrations])

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

  const handleDeleteMember = async (id: number) => {
    if (!confirm('Are you sure you want to delete this member?')) return

    try {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      await fetchMembers()
    } catch (error) {
      console.error('Error deleting member:', error)
      alert('Error deleting member. Please try again.')
    }
  }

  const handleDeleteFeaturedSubmission = async (id: number) => {
    if (!confirm('Are you sure you want to delete this featured submission?')) return

    try {
      const { error } = await supabase
        .from('featured_submissions')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      await fetchFeaturedSubmissions()
    } catch (error) {
      console.error('Error deleting featured submission:', error)
      alert('Error deleting featured submission. Please try again.')
    }
  }

  const handleDeleteEventRegistration = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event registration?')) return

    try {
      const { error } = await supabase
        .from('event_registrations')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      await fetchEventRegistrations()
    } catch (error) {
      console.error('Error deleting event registration:', error)
      alert('Error deleting event registration. Please try again.')
    }
  }

  const handleAddEvent = async () => {
    try {
      // Validate required fields
      if (!eventForm.name || !eventForm.location || !eventForm.date) {
        alert('Please fill in all required fields (Name, Location, Date)')
        return
      }

      // Prepare the data for insertion
      const eventData = {
        name: eventForm.name,
        description: eventForm.description || null,
        date: eventForm.date,
        time: eventForm.time || null,
        location: eventForm.location,
        status: eventForm.status,
        image_url: eventForm.image_url || null,
        max_attendees: eventForm.max_attendees || null,
        registration_required: eventForm.registration_required
      }

      console.log('Adding event with data:', eventData)

      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      console.log('Event added successfully:', data)
      await fetchEvents()
      setIsEventDialogOpen(false)
      setEventForm(initialEventData)
      alert('Event added successfully!')
    } catch (error) {
      console.error('Error adding event:', error)
      alert(`Error adding event: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleEditEvent = async () => {
    if (!editingEvent) return

    try {
      // Validate required fields
      if (!eventForm.name || !eventForm.location || !eventForm.date) {
        alert('Please fill in all required fields (Name, Location, Date)')
        return
      }

      // Prepare the data for update
      const eventData = {
        name: eventForm.name,
        description: eventForm.description || null,
        date: eventForm.date,
        time: eventForm.time || null,
        location: eventForm.location,
        status: eventForm.status,
        image_url: eventForm.image_url || null,
        max_attendees: eventForm.max_attendees || null,
        registration_required: eventForm.registration_required,
        updated_at: new Date().toISOString()
      }

      console.log('Updating event with data:', eventData)

      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', editingEvent.id)
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      console.log('Event updated successfully:', data)
      await fetchEvents()
      setIsEventDialogOpen(false)
      setEditingEvent(null)
      setEventForm(initialEventData)
      alert('Event updated successfully!')
    } catch (error) {
      console.error('Error updating event:', error)
      alert(`Error updating event: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      // First get the event to check if it has an image
      const { data: event } = await supabase
        .from('events')
        .select('image_url')
        .eq('id', id)
        .single()

      // Delete the image from storage if it exists
      if (event?.image_url) {
        const imagePath = event.image_url.split('/').pop()
        if (imagePath) {
          await supabase.storage
            .from('event-images')
            .remove([imagePath])
        }
      }

      // Delete the event from database
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      await fetchEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Error deleting event. Please try again.')
    }
  }

  const handleEventImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size (250KB = 256000 bytes)
    if (file.size > 256000) {
      alert('Image size must be less than 250KB')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      
      const { error } = await supabase.storage
        .from('event-images')
        .upload(fileName, file)

      if (error) throw error

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('event-images')
        .getPublicUrl(fileName)

      setEventForm({ ...eventForm, image_url: publicUrl })
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image. Please try again.')
    }
  }

  const openEditDialog = (connection: Connection) => {
    setEditingConnection(connection)
    setConnectionForm({
      "Name": connection["Name"],
      "Designation ": connection["Designation "],
      "Organization Name": connection["Organization Name"] || '',
      "Organization Type (Small/ Medium/ Large)": connection["Organization Type (Small/ Medium/ Large)"] || '',
      "Industry ": connection["Industry "] || '',
      "Sub Sector": connection["Sub Sector"] || '',
      "Type of connect (Founder/ Employee/ Freelancer)": connection["Type of connect (Founder/ Employee/ Freelancer)"] || '',
      "Designation Type (Senior/ Mid/ Entry Level)": connection["Designation Type (Senior/ Mid/ Entry Level)"] || '',
      "Phone Number": connection["Phone Number"] || '',
      "Email ID": connection["Email ID"] || '',
      "Linkedin ": connection["Linkedin "] || '',
      "Featured ": connection["Featured "] || 'No',
      "Featured post URL ": connection["Featured post URL "] || '',
      "Photo URL": connection["Photo URL"] || ''
    })
    setIsConnectionDialogOpen(true)
  }

  const openEditEventDialog = (event: Event) => {
    setEditingEvent(event)
    setEventForm({
      name: event.name,
      description: event.description || '',
      date: event.date,
      time: event.time || '',
      location: event.location,
      status: event.status,
      image_url: event.image_url || '',
      max_attendees: event.max_attendees,
      registration_required: event.registration_required
    })
    setIsEventDialogOpen(true)
  }

  const resetForm = () => {
    setConnectionForm(initialConnectionData)
    setEditingConnection(null)
  }

  const resetEventForm = () => {
    setEventForm(initialEventData)
    setEditingEvent(null)
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
      'Phone Number', 'Email', 'LinkedIn URL', 'Featured', 'Post URL', 'Photo URL'
    ]

    const csvContent = [
      headers.join(','),
      ...connections.map(conn => [
        `"${conn["Name"] || ''}"`,
        `"${conn["Designation "] || ''}"`,
        `"${conn["Organization Name"] || ''}"`,
        `"${conn["Organization Type (Small/ Medium/ Large)"] || ''}"`,
        `"${conn["Industry "] || ''}"`,
        `"${conn["Sub Sector"] || ''}"`,
        `"${conn["Type of connect (Founder/ Employee/ Freelancer)"] || ''}"`,
        `"${conn["Designation Type (Senior/ Mid/ Entry Level)"] || ''}"`,
        `"${conn["Phone Number"] || ''}"`,
        `"${conn["Email ID"] || ''}"`,
        `"${conn["Linkedin "] || ''}"`,
        conn["Featured "] === 'Yes' ? 'Yes' : 'No',
        `"${conn["Featured post URL "] || ''}"`,
        `"${conn["Photo URL"] || ''}"`
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

  const handleExportMembersCSV = () => {
    if (members.length === 0) {
      alert('No member data to export')
      return
    }

    const headers = [
      'ID', 'Name', 'Email', 'Phone', 'Company', 'Title', 'Industry', 'Interests', 'Created At'
    ]

    const csvContent = [
      headers.join(','),
      ...members.map(member => [
        member.id,
        `"${member.name || ''}"`,
        `"${member.email || ''}"`,
        `"${member.phone || ''}"`,
        `"${member.company || ''}"`,
        `"${member.title || ''}"`,
        `"${member.industry || ''}"`,
        `"${member.interests?.join('; ') || ''}"`,
        `"${member.created_at ? new Date(member.created_at).toLocaleString() : ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `365circle-members-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportFeaturedCSV = () => {
    if (featuredSubmissions.length === 0) {
      alert('No featured submission data to export')
      return
    }

    const headers = [
      'ID', 'Name', 'Email', 'Phone', 'Company', 'Title', 'Industry', 'Experience', 'Created At'
    ]

    const csvContent = [
      headers.join(','),
      ...featuredSubmissions.map(submission => [
        submission.id,
        `"${submission.name || ''}"`,
        `"${submission.email || ''}"`,
        `"${submission.phone || ''}"`,
        `"${submission.company || ''}"`,
        `"${submission.title || ''}"`,
        `"${submission.industry || ''}"`,
        `"${submission.experience?.replace(/"/g, '""') || ''}"`,
        `"${submission.created_at ? new Date(submission.created_at).toLocaleString() : ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `365circle-featured-submissions-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportEventsCSV = () => {
    if (events.length === 0) {
      alert('No event data to export')
      return
    }

    const headers = [
      'ID', 'Name', 'Description', 'Date', 'Time', 'Location', 'Status', 'Max Attendees', 'Registration Required', 'Image URL', 'Created At'
    ]

    const csvContent = [
      headers.join(','),
      ...events.map(event => [
        event.id,
        `"${event.name || ''}"`,
        `"${event.description?.replace(/"/g, '""') || ''}"`,
        `"${event.date || ''}"`,
        `"${event.time || ''}"`,
        `"${event.location || ''}"`,
        `"${event.status || ''}"`,
        event.max_attendees || '',
        event.registration_required ? 'Yes' : 'No',
        `"${event.image_url || ''}"`,
        `"${event.created_at ? new Date(event.created_at).toLocaleString() : ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `365circle-events-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportRegistrationsCSV = () => {
    if (eventRegistrations.length === 0) {
      alert('No event registration data to export')
      return
    }

    const headers = [
      'ID', 'Event Name', 'Event Date', 'Registrant Name', 'Email', 'Phone', 'Company', 'Title', 'Industry', 'Event Preference', 'Registered At'
    ]

    const csvContent = [
      headers.join(','),
      ...eventRegistrations.map(registration => [
        registration.id,
        `"${registration.events?.name || ''}"`,
        `"${registration.events?.date ? new Date(registration.events.date).toLocaleDateString() : ''}"`,
        `"${registration.name || ''}"`,
        `"${registration.email || ''}"`,
        `"${registration.phone || ''}"`,
        `"${registration.company || ''}"`,
        `"${registration.title || ''}"`,
        `"${registration.industry || ''}"`,
        `"${registration.event_preference || ''}"`,
        `"${registration.created_at ? new Date(registration.created_at).toLocaleString() : ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `365circle-event-registrations-${new Date().toISOString().split('T')[0]}.csv`)
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
          "Name": row[0] || '',
          "Designation ": row[1] || '',
          "Organization Name": row[2] || '',
          "Organization Type (Small/ Medium/ Large)": row[3] || '',
          "Industry ": row[4] || '',
          "Sub Sector": row[5] || '',
          "Type of connect (Founder/ Employee/ Freelancer)": row[6] || '',
          "Designation Type (Senior/ Mid/ Entry Level)": row[7] || '',
          "Phone Number": row[8] || '',
          "Email ID": row[9] || '',
          "Linkedin ": row[10] || '',
          "Featured ": row[11]?.toLowerCase() === 'yes' || row[11]?.toLowerCase() === 'true' ? 'Yes' : 'No',
          "Featured post URL ": row[12] || '',
          "Photo URL": row[13] || ''
        }))

        console.log('Importing data:', importData)

        // First, fetch all existing records to check for duplicates
        const { data: existingRecords, error: fetchError } = await supabase
          .from('365circle')
          .select('Name, "Email ID", "Phone Number"')

        if (fetchError) {
          alert(`Error fetching existing records: ${fetchError.message}`)
          return
        }

        console.log('Existing records count:', existingRecords?.length || 0)

        let successCount = 0
        const updateCount = 0
        let insertCount = 0
        let skipCount = 0
        let errorCount = 0
        const errors: string[] = []
        const skipped: string[] = []

        // Process each record individually
        for (const record of importData) {
          try {
            if (!record["Name"] || !record["Designation "]) {
              errors.push(`Skipping record: Name and Designation are required`)
              errorCount++
              continue
            }

            // Check for duplicates using multiple criteria
            const isDuplicate = existingRecords?.some(existing => {
              // Match by name (case-insensitive)
              const nameMatch = existing.Name?.toLowerCase().trim() === record["Name"].toLowerCase().trim()
              
              // If email exists, also check email match
              const emailMatch = record["Email ID"] && existing["Email ID"] 
                ? existing["Email ID"].toLowerCase().trim() === record["Email ID"].toLowerCase().trim()
                : false
              
              // If phone exists, also check phone match
              const phoneMatch = record["Phone Number"] && existing["Phone Number"]
                ? existing["Phone Number"].replace(/\D/g, '') === record["Phone Number"].replace(/\D/g, '')
                : false

              // Consider it a duplicate if:
              // 1. Name matches exactly, OR
              // 2. Email matches (if both have emails), OR  
              // 3. Phone matches (if both have phones)
              return nameMatch || emailMatch || phoneMatch
            })

            if (isDuplicate) {
              skipped.push(`Skipped duplicate: ${record["Name"]}`)
              skipCount++
              continue
            }

            // Insert new record (no duplicates found)
            const { error: insertError } = await supabase
              .from('365circle')
              .insert([record])

            if (insertError) {
              console.error('Error inserting record:', insertError)
              errors.push(`Error inserting ${record["Name"]}: ${insertError.message}`)
              errorCount++
            } else {
              insertCount++
              successCount++
              console.log(`Inserted: ${record["Name"]}`)
            }

          } catch (error) {
            console.error('Error processing record:', error)
            errors.push(`Error processing ${record["Name"]}: ${error}`)
            errorCount++
          }
        }

        // Show detailed results
        let message = ''
        if (successCount > 0) {
          message += `Successfully processed ${successCount} connections`
          if (insertCount > 0) message += `\n- ${insertCount} new records added`
          if (updateCount > 0) message += `\n- ${updateCount} records updated`
        }
        
        if (skipCount > 0) {
          message += `\n\n${skipCount} duplicates skipped:`
          skipped.slice(0, 3).forEach(skip => message += `\n- ${skip}`)
          if (skipped.length > 3) message += `\n- ... and ${skipped.length - 3} more`
        }
        
        if (errorCount > 0) {
          message += `\n\n${errorCount} errors occurred:`
          errors.slice(0, 3).forEach(error => message += `\n- ${error}`)
          if (errors.length > 3) message += `\n- ... and ${errors.length - 3} more errors`
        }

        if (successCount > 0 || skipCount > 0) {
          alert(message || 'Import completed - no new records to add')
          await fetchConnections()
        } else {
          alert(`Import failed:\n${message}`)
        }

        console.log('Import summary:', { successCount, insertCount, updateCount, skipCount, errorCount, errors, skipped })
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

  const handleSortChange = (newSortBy: typeof sortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortOrder('desc')
    }
  }

  const handleMembersSortChange = (newSortBy: typeof membersSortBy) => {
    if (newSortBy === membersSortBy) {
      setMembersSortOrder(membersSortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setMembersSortBy(newSortBy)
      setMembersSortOrder('desc')
    }
  }

  const handleFeaturedSortChange = (newSortBy: typeof featuredSortBy) => {
    if (newSortBy === featuredSortBy) {
      setFeaturedSortOrder(featuredSortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setFeaturedSortBy(newSortBy)
      setFeaturedSortOrder('desc')
    }
  }

  const handleEventsSortChange = (newSortBy: typeof eventsSortBy) => {
    if (newSortBy === eventsSortBy) {
      setEventsSortOrder(eventsSortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setEventsSortBy(newSortBy)
      setEventsSortOrder('desc')
    }
  }

  const handleRegistrationsSortChange = (newSortBy: typeof registrationsSortBy) => {
    if (newSortBy === registrationsSortBy) {
      setRegistrationsSortOrder(registrationsSortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setRegistrationsSortBy(newSortBy)
      setRegistrationsSortOrder('desc')
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError(null)

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    setIsChangingPassword(true)

    // First verify current password by re-authenticating
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: currentPassword,
    })

    if (signInError) {
      setPasswordError("Current password is incorrect")
      setIsChangingPassword(false)
      return
    }

    // Update password
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    setIsChangingPassword(false)

    if (error) {
      setPasswordError(error.message)
    } else {
      alert('Password updated successfully!')
      setIsChangePasswordOpen(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }
  }

  const resetPasswordForm = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setPasswordError(null)
  }

  const sidebarItems = [
    {
      id: 'connections' as const,
      label: 'Connections',
      icon: Network,
      description: 'Manage professional connections'
    },
    {
      id: 'members' as const,
      label: 'Membership Waitlist',
      icon: Users,
      description: 'View membership applications'
    },
    {
      id: 'featured' as const,
      label: 'Featured Submissions',
      icon: Star,
      description: 'Review featured applications'
    },
    {
      id: 'events' as const,
      label: 'Events',
      icon: Calendar,
      description: 'Manage networking events'
    },
    {
      id: 'registrations' as const,
      label: 'Event Registrations',
      icon: Users,
      description: 'View event registrations'
    }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'connections':
        return (
          <Card className="border-blue-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Manage Connections</CardTitle>
                <CardDescription className="text-blue-800/80">Add, edit, or remove featured professionals.</CardDescription>
              </div>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImportFile}
                  accept=".csv,.xlsx,.xls"
                  style={{ display: 'none' }}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Sort by {sortBy === 'created_at' ? 'Date' : sortBy === 'Name' ? 'Name' : sortBy === 'Designation ' ? 'Designation' : 'Organization'} {sortOrder === 'asc' ? '↑' : '↓'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleSortChange('created_at')}>
                      Date Added {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('Name')}>
                      Name {sortBy === 'Name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('Designation ')}>
                      Designation {sortBy === 'Designation ' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange('Organization Name')}>
                      Organization {sortBy === 'Organization Name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                            value={connectionForm["Name"]}
                            onChange={(e) => setConnectionForm({...connectionForm, "Name": e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="designation">Designation *</Label>
                          <Input
                            id="designation"
                            value={connectionForm["Designation "]}
                            onChange={(e) => setConnectionForm({...connectionForm, "Designation ": e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="organization_name">Organization Name</Label>
                          <Input
                            id="organization_name"
                            value={connectionForm["Organization Name"]}
                            onChange={(e) => setConnectionForm({...connectionForm, "Organization Name": e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="organization_type">Organization Type (Small/ Medium/ Large)</Label>
                          <Input
                            id="organization_type"
                            value={connectionForm["Organization Type (Small/ Medium/ Large)"]}
                            onChange={(e) => setConnectionForm({...connectionForm, "Organization Type (Small/ Medium/ Large)": e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <Input
                            id="industry"
                            value={connectionForm["Industry "]}
                            onChange={(e) => setConnectionForm({...connectionForm, "Industry ": e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sub_sector">Sub Sector</Label>
                          <Input
                            id="sub_sector"
                            value={connectionForm["Sub Sector"]}
                            onChange={(e) => setConnectionForm({...connectionForm, "Sub Sector": e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="connect_type">Type of connect (Founder/ Employee/ Freelancer)</Label>
                          <Input
                            id="connect_type"
                            value={connectionForm["Type of connect (Founder/ Employee/ Freelancer)"]}
                            onChange={(e) => setConnectionForm({...connectionForm, "Type of connect (Founder/ Employee/ Freelancer)": e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="designation_level">Designation Type (Senior/ Mid/ Entry Level)</Label>
                          <Input
                            id="designation_level"
                            value={connectionForm["Designation Type (Senior/ Mid/ Entry Level)"]}
                            onChange={(e) => setConnectionForm({...connectionForm, "Designation Type (Senior/ Mid/ Entry Level)": e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone_number">Phone Number</Label>
                          <Input
                            id="phone_number"
                            value={connectionForm["Phone Number"]}
                            onChange={(e) => setConnectionForm({...connectionForm, "Phone Number": e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email_id">Email ID</Label>
                          <Input
                            id="email_id"
                            type="email"
                            value={connectionForm["Email ID"]}
                            onChange={(e) => setConnectionForm({...connectionForm, "Email ID": e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="linkedin_url">Linkedin URL</Label>
                          <Input
                            id="linkedin_url"
                            value={connectionForm["Linkedin "]}
                            onChange={(e) => setConnectionForm({...connectionForm, "Linkedin ": e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="post_url">Featured Post URL</Label>
                          <Input
                            id="post_url"
                            value={connectionForm["Featured post URL "]}
                            onChange={(e) => setConnectionForm({...connectionForm, "Featured post URL ": e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="photo_url">Photo URL</Label>
                        <Input
                          id="photo_url"
                          value={connectionForm["Photo URL"]}
                          onChange={(e) => setConnectionForm({...connectionForm, "Photo URL": e.target.value})}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="featured"
                          checked={connectionForm["Featured "] === 'Yes'}
                          onCheckedChange={(checked) => setConnectionForm({...connectionForm, "Featured ": checked ? 'Yes' : 'No'})}
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
                <div className="border rounded-md">
                  <div className="max-h-96 overflow-y-auto">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="sticky top-0 bg-white z-10 border-b">
                          <TableRow>
                            <TableHead className="min-w-[120px]">Name</TableHead>
                            <TableHead className="min-w-[150px]">Designation</TableHead>
                            <TableHead className="hidden sm:table-cell min-w-[150px]">Organization</TableHead>
                            <TableHead className="hidden md:table-cell min-w-[120px]">Industry</TableHead>
                            <TableHead className="hidden lg:table-cell min-w-[120px]">Connect Type</TableHead>
                            <TableHead className="hidden lg:table-cell min-w-[120px]">Phone</TableHead>
                            <TableHead className="hidden xl:table-cell min-w-[200px]">Email</TableHead>
                            <TableHead className="min-w-[100px]">Featured</TableHead>
                            <TableHead className="hidden md:table-cell min-w-[100px]">Added</TableHead>
                            <TableHead className="w-[50px]"><span className="sr-only">Actions</span></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {connections.map((conn) => (
                            <TableRow key={conn.id}>
                              <TableCell className="font-medium">{conn["Name"]}</TableCell>
                              <TableCell>{conn["Designation "]}</TableCell>
                              <TableCell className="hidden sm:table-cell">{conn["Organization Name"] || '-'}</TableCell>
                              <TableCell className="hidden md:table-cell">{conn["Industry "] || '-'}</TableCell>
                              <TableCell className="hidden lg:table-cell">{conn["Type of connect (Founder/ Employee/ Freelancer)"] || '-'}</TableCell>
                              <TableCell className="hidden lg:table-cell">{conn["Phone Number"] || '-'}</TableCell>
                              <TableCell className="hidden xl:table-cell">{conn["Email ID"] || '-'}</TableCell>
                              <TableCell>
                                <Badge variant={conn["Featured "] === 'Yes' ? 'default' : 'secondary'} className={conn["Featured "] === 'Yes' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                                  {conn["Featured "] === 'Yes' ? 'Featured' : 'Regular'}
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
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case 'members':
        return (
          <Card className="border-blue-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Membership Waitlist</CardTitle>
                <CardDescription className="text-blue-800/80">View and manage membership applications.</CardDescription>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Sort by {membersSortBy === 'id' ? 'ID' : membersSortBy === 'created_at' ? 'Date' : membersSortBy === 'name' ? 'Name' : membersSortBy === 'email' ? 'Email' : 'Company'} {membersSortOrder === 'asc' ? '↑' : '↓'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleMembersSortChange('id')}>
                      ID {membersSortBy === 'id' && (membersSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMembersSortChange('created_at')}>
                      Date Added {membersSortBy === 'created_at' && (membersSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMembersSortChange('name')}>
                      Name {membersSortBy === 'name' && (membersSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMembersSortChange('email')}>
                      Email {membersSortBy === 'email' && (membersSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMembersSortChange('company')}>
                      Company {membersSortBy === 'company' && (membersSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={handleExportMembersCSV}
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {membersLoading ? (
                <div className="flex justify-center p-8">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                    <p>Loading members...</p>
                  </div>
                </div>
              ) : membersError ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-red-600 mb-4">{membersError}</p>
                  <Button onClick={fetchMembers} variant="outline">
                    Retry
                  </Button>
                </div>
              ) : members.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-gray-500 mb-4">No membership applications found</p>
                  <p className="text-sm text-gray-400">Applications will appear here when submitted</p>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto border rounded-md">
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10 border-b">
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden sm:table-cell">Phone</TableHead>
                        <TableHead className="hidden md:table-cell">Company</TableHead>
                        <TableHead className="hidden lg:table-cell">Title</TableHead>
                        <TableHead className="hidden lg:table-cell">Industry</TableHead>
                        <TableHead className="hidden xl:table-cell">Interests</TableHead>
                        <TableHead className="hidden md:table-cell">Applied</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.id}</TableCell>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell className="hidden sm:table-cell">{member.phone || '-'}</TableCell>
                          <TableCell className="hidden md:table-cell">{member.company || '-'}</TableCell>
                          <TableCell className="hidden lg:table-cell">{member.title || '-'}</TableCell>
                          <TableCell className="hidden lg:table-cell">{member.industry || '-'}</TableCell>
                          <TableCell className="hidden xl:table-cell">
                            {member.interests && member.interests.length > 0 ? (
                              <div className="max-w-32 truncate" title={member.interests.join(', ')}>
                                {member.interests.join(', ')}
                              </div>
                            ) : '-'
                          }</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {member.created_at ? new Date(member.created_at).toLocaleString() : '-'}
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
                                <DropdownMenuItem onClick={() => handleDeleteMember(member.id)} className="text-red-600">
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
        )

      case 'featured':
        return (
          <Card className="border-blue-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Featured Submissions</CardTitle>
                <CardDescription className="text-blue-800/80">View and manage featured application submissions.</CardDescription>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Sort by {featuredSortBy === 'id' ? 'ID' : featuredSortBy === 'created_at' ? 'Date' : featuredSortBy === 'name' ? 'Name' : featuredSortBy === 'email' ? 'Email' : 'Company'} {featuredSortOrder === 'asc' ? '↑' : '↓'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleFeaturedSortChange('id')}>
                      ID {featuredSortBy === 'id' && (featuredSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFeaturedSortChange('created_at')}>
                      Date Added {featuredSortBy === 'created_at' && (featuredSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFeaturedSortChange('name')}>
                      Name {featuredSortBy === 'name' && (featuredSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFeaturedSortChange('email')}>
                      Email {featuredSortBy === 'email' && (featuredSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFeaturedSortChange('company')}>
                      Company {featuredSortBy === 'company' && (featuredSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={handleExportFeaturedCSV}
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {featuredLoading ? (
                <div className="flex justify-center p-8">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                    <p>Loading featured submissions...</p>
                  </div>
                </div>
              ) : featuredError ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-red-600 mb-4">{featuredError}</p>
                  <Button onClick={fetchFeaturedSubmissions} variant="outline">
                    Retry
                  </Button>
                </div>
              ) : featuredSubmissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-gray-500 mb-4">No featured submissions found</p>
                  <p className="text-sm text-gray-400">Submissions will appear here when submitted</p>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto border rounded-md">
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10 border-b">
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden sm:table-cell">Phone</TableHead>
                        <TableHead className="hidden md:table-cell">Company</TableHead>
                        <TableHead className="hidden lg:table-cell">Title</TableHead>
                        <TableHead className="hidden lg:table-cell">Industry</TableHead>
                        <TableHead className="hidden xl:table-cell">Experience</TableHead>
                        <TableHead className="hidden md:table-cell">Submitted</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {featuredSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.id}</TableCell>
                          <TableCell className="font-medium">{submission.name}</TableCell>
                          <TableCell>{submission.email}</TableCell>
                          <TableCell className="hidden md:table-cell">{submission.company || '-'}</TableCell>
                          <TableCell className="hidden lg:table-cell">{submission.title || '-'}</TableCell>
                          <TableCell className="hidden lg:table-cell">{submission.industry || '-'}</TableCell>
                          <TableCell className="hidden xl:table-cell">
                            {submission.experience ? (
                              <div className="max-w-32 truncate" title={submission.experience}>
                                {submission.experience}
                              </div>
                            ) : '-'
                          }</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {submission.created_at ? new Date(submission.created_at).toLocaleString() : '-'}
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
                                <DropdownMenuItem onClick={() => handleDeleteFeaturedSubmission(submission.id)} className="text-red-600">
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
        )

      case 'events':
        return (
          <Card className="border-blue-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Manage Events</CardTitle>
                <CardDescription className="text-blue-800/80">Create and manage networking events.</CardDescription>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Sort by {eventsSortBy === 'id' ? 'ID' : eventsSortBy === 'created_at' ? 'Date Created' : eventsSortBy === 'name' ? 'Name' : eventsSortBy === 'date' ? 'Event Date' : 'Status'} {eventsSortOrder === 'asc' ? '↑' : '↓'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEventsSortChange('date')}>
                      Event Date {eventsSortBy === 'date' && (eventsSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEventsSortChange('name')}>
                      Name {eventsSortBy === 'name' && (eventsSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEventsSortChange('status')}>
                      Status {eventsSortBy === 'status' && (eventsSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEventsSortChange('created_at')}>
                      Date Created {eventsSortBy === 'created_at' && (eventsSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={handleExportEventsCSV}
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
                <Dialog open={isEventDialogOpen} onOpenChange={(open) => {
                  setIsEventDialogOpen(open)
                  if (!open) resetEventForm()
                }}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700 text-white">
                      <PlusCircle className="h-4 w-4" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
                      <DialogDescription>
                        {editingEvent ? 'Update the event details below.' : 'Fill in the details to create a new event.'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="event_name">Event Name *</Label>
                          <Input
                            id="event_name"
                            value={eventForm.name}
                            onChange={(e) => setEventForm({...eventForm, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="event_location">Location *</Label>
                          <Input
                            id="event_location"
                            value={eventForm.location}
                            onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event_description">Description</Label>
                        <Input
                          id="event_description"
                          value={eventForm.description}
                          onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="event_date">Date *</Label>
                          <Input
                            id="event_date"
                            type="date"
                            value={eventForm.date}
                            onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="event_time">Time</Label>
                          <Input
                            id="event_time"
                            type="time"
                            value={eventForm.time}
                            onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="event_status">Status</Label>
                          <select
                            id="event_status"
                            value={eventForm.status}
                            onChange={(e) => setEventForm({...eventForm, status: e.target.value as Event['status']})}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                          >
                            <option value="upcoming">Upcoming</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="event_max_attendees">Max Attendees</Label>
                          <Input
                            id="event_max_attendees"
                            type="number"
                            min="1"
                            value={eventForm.max_attendees || ''}
                            onChange={(e) => setEventForm({...eventForm, max_attendees: e.target.value ? parseInt(e.target.value) : undefined})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event_image">Event Image (max 250KB)</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="event_image"
                            type="file"
                            ref={eventImageInputRef}
                            onChange={handleEventImageUpload}
                            accept="image/*"
                            className="flex-1"
                          />
                          {eventForm.image_url && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setEventForm({...eventForm, image_url: ''})}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        {eventForm.image_url && (
                          <div className="mt-2">
                            <Image src={eventForm.image_url} alt="Event preview" width={128} height={80} className="w-32 h-20 object-cover rounded" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="registration_required"
                          checked={eventForm.registration_required}
                          onCheckedChange={(checked) => setEventForm({...eventForm, registration_required: !!checked})}
                        />
                        <Label htmlFor="registration_required">Registration Required</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={editingEvent ? handleEditEvent : handleAddEvent}>
                        {editingEvent ? 'Update' : 'Add'} Event
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {eventsLoading ? (
                <div className="flex justify-center p-8">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                    <p>Loading events...</p>
                  </div>
                </div>
              ) : eventsError ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-red-600 mb-4">{eventsError}</p>
                  <Button onClick={fetchEvents} variant="outline">
                    Retry
                  </Button>
                </div>
              ) : events.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-gray-500 mb-4">No events found</p>
                  <p className="text-sm text-gray-400">Create your first event to get started</p>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto border rounded-md">
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10 border-b">
                      <TableRow>
                        <TableHead>Event Name</TableHead>
                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                        <TableHead className="hidden md:table-cell">Time</TableHead>
                        <TableHead className="hidden md:table-cell">Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden lg:table-cell">Attendees</TableHead>
                        <TableHead className="hidden lg:table-cell">Registration</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {event.image_url && (
                                <Image src={event.image_url} alt={event.name} width={32} height={32} className="w-8 h-8 rounded object-cover" />
                              )}
                              <span>{event.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {event.date ? new Date(event.date).toLocaleDateString() : '-'}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{event.time || '-'}</TableCell>
                          <TableCell className="hidden md:table-cell">{event.location}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={event.status === 'upcoming' ? 'default' : event.status === 'ongoing' ? 'secondary' : event.status === 'completed' ? 'outline' : 'destructive'} 
                              className={
                                event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                                event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                                event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                                'bg-red-100 text-red-800'
                              }
                            >
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{event.max_attendees || 'Unlimited'}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <Badge variant={event.registration_required ? 'default' : 'secondary'}>
                              {event.registration_required ? 'Required' : 'Not Required'}
                            </Badge>
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
                                <DropdownMenuItem onClick={() => openEditEventDialog(event)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteEvent(event.id)} className="text-red-600">
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
        )

      case 'registrations':
        return (
          <Card className="border-blue-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Event Registrations</CardTitle>
                <CardDescription className="text-blue-800/80">View and manage event registrations.</CardDescription>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Sort by {registrationsSortBy === 'id' ? 'ID' : registrationsSortBy === 'created_at' ? 'Date' : registrationsSortBy === 'name' ? 'Name' : registrationsSortBy === 'email' ? 'Email' : 'Event'} {registrationsSortOrder === 'asc' ? '↑' : '↓'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleRegistrationsSortChange('created_at')}>
                      Date Registered {registrationsSortBy === 'created_at' && (registrationsSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRegistrationsSortChange('events.name')}>
                      Event Name {registrationsSortBy === 'events.name' && (registrationsSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRegistrationsSortChange('name')}>
                      Registrant Name {registrationsSortBy === 'name' && (registrationsSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRegistrationsSortChange('email')}>
                      Email {registrationsSortBy === 'email' && (registrationsSortOrder === 'asc' ? '↑' : '↓')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={handleExportRegistrationsCSV}
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {registrationsLoading ? (
                <div className="flex justify-center p-8">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                    <p>Loading event registrations...</p>
                  </div>
                </div>
              ) : registrationsError ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-red-600 mb-4">{registrationsError}</p>
                  <Button onClick={fetchEventRegistrations} variant="outline">
                    Retry
                  </Button>
                </div>
              ) : eventRegistrations.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-gray-500 mb-4">No event registrations found</p>
                  <p className="text-sm text-gray-400">Registrations will appear here when people register for events</p>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto border rounded-md">
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10 border-b">
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Event Date</TableHead>
                        <TableHead>Registrant</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden sm:table-cell">Phone</TableHead>
                        <TableHead className="hidden md:table-cell">Company</TableHead>
                        <TableHead className="hidden lg:table-cell">Title</TableHead>
                        <TableHead className="hidden lg:table-cell">Industry</TableHead>
                        <TableHead className="hidden xl:table-cell">Preference</TableHead>
                        <TableHead className="hidden md:table-cell">Registered</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eventRegistrations.map((registration) => (
                        <TableRow key={registration.id}>
                          <TableCell className="font-medium">{registration.id}</TableCell>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{registration.events?.name || 'Unknown Event'}</span>
                              <span className="text-xs text-gray-500">{registration.events?.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{registration.events?.date ? new Date(registration.events.date).toLocaleDateString() : '-'}</span>
                              <span className="text-xs text-gray-500">{registration.events?.time || 'TBA'}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{registration.name}</TableCell>
                          <TableCell>{registration.email}</TableCell>
                          <TableCell className="hidden sm:table-cell">{registration.phone || '-'}</TableCell>
                          <TableCell className="hidden md:table-cell">{registration.company || '-'}</TableCell>
                          <TableCell className="hidden lg:table-cell">{registration.title || '-'}</TableCell>
                          <TableCell className="hidden lg:table-cell">{registration.industry || '-'}</TableCell>
                          <TableCell className="hidden xl:table-cell">{registration.event_preference || '-'}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {registration.created_at ? new Date(registration.created_at).toLocaleString() : '-'}
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
                                <DropdownMenuItem onClick={() => handleDeleteEventRegistration(registration.id)} className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Registration
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
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-blue-50/50 font-sans text-blue-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out bg-white border-r border-blue-100 shadow-sm overflow-hidden`}>
        {/* Header */}
        <div className="p-6 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="The 365 Circle Logo" width={32} height={32} className="h-8 w-auto" />
            <span className="font-bold text-blue-800 text-lg whitespace-nowrap">Admin Portal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs text-blue-500 truncate">{item.description}</div>
                </div>
              </button>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-100" style={{ width: sidebarOpen ? '256px' : '0px' }}>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="w-full gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-blue-100 px-4 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-blue-600 hover:bg-blue-50"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
                {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-blue-600 hover:bg-blue-50">
                  <span className="text-sm">Welcome, {userEmail || 'Admin'}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setIsChangePasswordOpen(true)}>
                  <Key className="mr-2 h-4 w-4" />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 min-w-0">
          {renderContent()}
        </main>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={isChangePasswordOpen} onOpenChange={(open) => {
        setIsChangePasswordOpen(open)
        if (!open) resetPasswordForm()
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            {passwordError && (
              <p className="text-sm text-red-600">{passwordError}</p>
            )}
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsChangePasswordOpen(false)}
                disabled={isChangingPassword}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isChangingPassword}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isChangingPassword ? 'Updating...' : 'Update Password'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

