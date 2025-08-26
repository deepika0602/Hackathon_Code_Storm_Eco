"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Scan, Leaf, Recycle, AlertTriangle, Award, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RecyclingLocator } from "@/components/recycling-locator"
import { GamificationDashboard } from "@/components/gamification-dashboard"
import { UserProfile } from "@/components/user-profile"

type WasteCategory = "biodegradable" | "recyclable" | "hazardous" | null

interface ScanResult {
  category: WasteCategory
  item: string
  confidence: number
  points: number
  disposal: string
}

export default function WasteManagementApp() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [userPoints, setUserPoints] = useState(1250)
  const [level, setLevel] = useState(5)
  const [showRecyclingLocator, setShowRecyclingLocator] = useState(false)
  const [showGamification, setShowGamification] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const wasteCategories = [
    {
      id: "biodegradable",
      name: "Biodegradable",
      icon: Leaf,
      color: "bg-green-100 text-green-800 border-green-200",
      description: "Food scraps, yard waste",
    },
    {
      id: "recyclable",
      name: "Recyclable",
      icon: Recycle,
      color: "bg-blue-100 text-blue-800 border-blue-200",
      description: "Plastic, glass, metal, paper",
    },
    {
      id: "hazardous",
      name: "Hazardous",
      icon: AlertTriangle,
      color: "bg-red-100 text-red-800 border-red-200",
      description: "Batteries, chemicals, e-waste",
    },
  ]

  const simulateAIScan = async (file: File) => {
    setIsScanning(true)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI results based on filename or random selection
    const mockResults: ScanResult[] = [
      {
        category: "biodegradable",
        item: "Apple Core",
        confidence: 95,
        points: 5,
        disposal: "Compost bin or organic waste collection",
      },
      {
        category: "recyclable",
        item: "Plastic Bottle",
        confidence: 92,
        points: 10,
        disposal: "Clean and place in recycling bin",
      },
      {
        category: "hazardous",
        item: "Battery",
        confidence: 98,
        points: 15,
        disposal: "Take to designated e-waste collection center",
      },
    ]

    const result = mockResults[Math.floor(Math.random() * mockResults.length)]
    setScanResult(result)
    setUserPoints((prev) => prev + result.points)
    setIsScanning(false)
  }

  const handleScanClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      simulateAIScan(file)
    }
  }

  const getCategoryIcon = (category: WasteCategory) => {
    const categoryData = wasteCategories.find((cat) => cat.id === category)
    return categoryData?.icon || Scan
  }

  const getCategoryColor = (category: WasteCategory) => {
    const categoryData = wasteCategories.find((cat) => cat.id === category)
    return categoryData?.color || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const handleFindDropoffPoint = () => {
    setShowRecyclingLocator(true)
  }

  const handleBackFromLocator = () => {
    setShowRecyclingLocator(false)
  }

  const handleShowGamification = () => {
    setShowGamification(true)
  }

  const handleBackFromGamification = () => {
    setShowGamification(false)
  }

  const handleShowProfile = () => {
    setShowProfile(true)
  }

  const handleBackFromProfile = () => {
    setShowProfile(false)
  }

  const userStats = {
    totalScans: 47,
    correctIdentifications: 44,
    streakDays: 12,
    co2Saved: 12,
    itemsRecycled: 35,
    joinDate: "2023-08-15",
    level: level,
    points: userPoints,
  }

  if (showRecyclingLocator) {
    return <RecyclingLocator onBack={handleBackFromLocator} wasteType={scanResult?.category || undefined} />
  }

  if (showGamification) {
    return <GamificationDashboard onBack={handleBackFromGamification} userPoints={userPoints} level={level} />
  }

  if (showProfile) {
    return <UserProfile onBack={handleBackFromProfile} userStats={userStats} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold text-foreground">EcoSort</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleShowGamification} className="flex items-center gap-1">
              <Award className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">{userPoints}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShowProfile}>
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Progress Section */}
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={handleShowGamification}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Level {level}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {userPoints} points
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={65} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">350 points to next level • Tap to view rewards</p>
          </CardContent>
        </Card>

        {/* Scan Section */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Scan Your Waste</CardTitle>
            <CardDescription>Take a photo to identify the waste category and get disposal guidance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Button
                onClick={handleScanClick}
                disabled={isScanning}
                size="lg"
                className="w-32 h-32 rounded-full flex flex-col items-center justify-center gap-2"
              >
                {isScanning ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <>
                    <Camera className="h-8 w-8" />
                    <span className="text-sm">Scan</span>
                  </>
                )}
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />

            {isScanning && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Analyzing waste item...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scan Result */}
        {scanResult && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-center gap-3">
                {(() => {
                  const IconComponent = getCategoryIcon(scanResult.category)
                  return <IconComponent className="h-6 w-6 text-primary" />
                })()}
                <div className="flex-1">
                  <CardTitle className="text-base">{scanResult.item}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getCategoryColor(scanResult.category)}>{scanResult.category}</Badge>
                    <span className="text-xs text-muted-foreground">{scanResult.confidence}% confidence</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-accent-foreground bg-accent">
                  +{scanResult.points} pts
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Disposal Instructions:</h4>
                  <p className="text-sm text-muted-foreground">{scanResult.disposal}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleFindDropoffPoint}>
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Nearest Drop-off Point
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Waste Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Waste Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {wasteCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <div
                    key={category.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${category.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">{category.name}</h4>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">47</div>
                <p className="text-xs text-muted-foreground">Items Scanned</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">12kg</div>
                <p className="text-xs text-muted-foreground">CO₂ Saved</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Button to Recycling Locator */}
        <Card>
          <CardContent className="pt-6">
            <Button variant="outline" className="w-full bg-transparent" onClick={handleFindDropoffPoint}>
              <MapPin className="h-4 w-4 mr-2" />
              Browse All Recycling Centers
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
