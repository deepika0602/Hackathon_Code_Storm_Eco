"use client"
import { useState } from "react"
import { MapPin, Clock, Phone, Navigation, Filter, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RecyclingCenter {
  id: string
  name: string
  address: string
  distance: number
  phone: string
  hours: string
  acceptedWaste: string[]
  rating: number
  isOpen: boolean
}

interface RecyclingLocatorProps {
  onBack: () => void
  wasteType?: string
}

export function RecyclingLocator({ onBack, wasteType }: RecyclingLocatorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState(wasteType || "all")

  const recyclingCenters: RecyclingCenter[] = [
    {
      id: "1",
      name: "GreenCycle Recycling Hub",
      address: "123 Eco Street, Green Valley, CA 90210",
      distance: 0.8,
      phone: "(555) 123-4567",
      hours: "Mon-Sat: 8AM-6PM, Sun: 10AM-4PM",
      acceptedWaste: ["recyclable", "hazardous"],
      rating: 4.8,
      isOpen: true,
    },
    {
      id: "2",
      name: "City Waste Management Center",
      address: "456 Municipal Drive, Green Valley, CA 90211",
      distance: 1.2,
      phone: "(555) 987-6543",
      hours: "Mon-Fri: 7AM-5PM, Sat: 9AM-3PM",
      acceptedWaste: ["recyclable", "hazardous", "biodegradable"],
      rating: 4.5,
      isOpen: true,
    },
    {
      id: "3",
      name: "EcoPoint Drop-off Station",
      address: "789 Sustainability Lane, Green Valley, CA 90212",
      distance: 2.1,
      phone: "(555) 456-7890",
      hours: "Daily: 6AM-8PM",
      acceptedWaste: ["recyclable"],
      rating: 4.2,
      isOpen: false,
    },
    {
      id: "4",
      name: "Hazmat Disposal Facility",
      address: "321 Safety Boulevard, Green Valley, CA 90213",
      distance: 3.5,
      phone: "(555) 321-0987",
      hours: "Mon-Wed-Fri: 9AM-4PM",
      acceptedWaste: ["hazardous"],
      rating: 4.9,
      isOpen: true,
    },
    {
      id: "5",
      name: "Community Compost Center",
      address: "654 Organic Way, Green Valley, CA 90214",
      distance: 1.8,
      phone: "(555) 654-3210",
      hours: "Tue-Sun: 7AM-7PM",
      acceptedWaste: ["biodegradable"],
      rating: 4.6,
      isOpen: true,
    },
  ]

  const wasteTypeLabels = {
    all: "All Types",
    recyclable: "Recyclable",
    biodegradable: "Biodegradable",
    hazardous: "Hazardous",
  }

  const filteredCenters = recyclingCenters.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || center.acceptedWaste.includes(filterType)
    return matchesSearch && matchesType
  })

  const getWasteTypeBadgeColor = (type: string) => {
    switch (type) {
      case "biodegradable":
        return "bg-green-100 text-green-800 border-green-200"
      case "recyclable":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "hazardous":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleGetDirections = (address: string) => {
    // In a real app, this would open Google Maps or Apple Maps
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">Recycling Centers</h1>
            <p className="text-xs text-muted-foreground">Find nearby drop-off points</p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Search and Filter */}
        <div className="space-y-3">
          <Input
            placeholder="Search by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(wasteTypeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredCenters.length} center{filteredCenters.length !== 1 ? "s" : ""} found
          </p>
          {filterType !== "all" && (
            <Badge variant="outline" className={getWasteTypeBadgeColor(filterType)}>
              {wasteTypeLabels[filterType as keyof typeof wasteTypeLabels]}
            </Badge>
          )}
        </div>

        {/* Recycling Centers List */}
        <div className="space-y-4">
          {filteredCenters.map((center) => (
            <Card key={center.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base flex items-center gap-2">
                      {center.name}
                      {center.isOpen ? (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          Open
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                          Closed
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{center.distance} miles away</span>
                      <span className="text-xs text-muted-foreground">• ⭐ {center.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{center.address}</p>

                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{center.hours}</span>
                </div>

                <div className="flex items-center gap-1 text-sm">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{center.phone}</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">Accepts:</p>
                  <div className="flex flex-wrap gap-1">
                    {center.acceptedWaste.map((type) => (
                      <Badge key={type} variant="outline" className={`text-xs ${getWasteTypeBadgeColor(type)}`}>
                        {wasteTypeLabels[type as keyof typeof wasteTypeLabels]}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => window.open(`tel:${center.phone}`, "_self")}
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => handleGetDirections(center.address)}>
                    <Navigation className="h-3 w-3 mr-1" />
                    Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCenters.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No recycling centers found matching your criteria.</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 bg-transparent"
                onClick={() => {
                  setSearchQuery("")
                  setFilterType("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
