"use client"
import { useState } from "react"
import {
  User,
  ArrowLeft,
  Settings,
  Calendar,
  TrendingUp,
  Leaf,
  Recycle,
  AlertTriangle,
  Award,
  Camera,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit3,
  Share2,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserStats {
  totalScans: number
  correctIdentifications: number
  streakDays: number
  co2Saved: number
  itemsRecycled: number
  joinDate: string
  level: number
  points: number
}

interface ScanHistory {
  id: string
  item: string
  category: "biodegradable" | "recyclable" | "hazardous"
  date: string
  points: number
  confidence: number
}

interface UserProfileProps {
  onBack: () => void
  userStats: UserStats
}

export function UserProfile({ onBack, userStats }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [notifications, setNotifications] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)

  const recentScans: ScanHistory[] = [
    {
      id: "1",
      item: "Plastic Bottle",
      category: "recyclable",
      date: "2024-01-15",
      points: 10,
      confidence: 92,
    },
    {
      id: "2",
      item: "Apple Core",
      category: "biodegradable",
      date: "2024-01-15",
      points: 5,
      confidence: 95,
    },
    {
      id: "3",
      item: "Battery",
      category: "hazardous",
      date: "2024-01-14",
      points: 15,
      confidence: 98,
    },
    {
      id: "4",
      item: "Cardboard Box",
      category: "recyclable",
      date: "2024-01-14",
      points: 8,
      confidence: 89,
    },
    {
      id: "5",
      item: "Banana Peel",
      category: "biodegradable",
      date: "2024-01-13",
      points: 5,
      confidence: 97,
    },
  ]

  const achievements = [
    { name: "First Steps", unlocked: true, rarity: "common" },
    { name: "Eco Warrior", unlocked: false, rarity: "rare" },
    { name: "Recycling Master", unlocked: false, rarity: "epic" },
    { name: "Streak Champion", unlocked: false, rarity: "legendary" },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "biodegradable":
        return Leaf
      case "recyclable":
        return Recycle
      case "hazardous":
        return AlertTriangle
      default:
        return Camera
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const accuracy = Math.round((userStats.correctIdentifications / userStats.totalScans) * 100)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">Profile</h1>
          </div>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="text-xs">
              <User className="h-3 w-3 mr-1" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              History
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/eco-friendly-user-avatar.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">EC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-foreground">EcoChampion</h2>
                      <Button variant="ghost" size="sm">
                        <Edit3 className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Level {userStats.level} • {userStats.points} points
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined{" "}
                      {new Date(userStats.joinDate).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold text-primary">{userStats.totalScans}</div>
                    <p className="text-xs text-muted-foreground">Items Scanned</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold text-accent">{accuracy}%</div>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold text-primary">{userStats.streakDays}</div>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold text-accent">{userStats.co2Saved}kg</div>
                    <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Environmental Impact */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Items Recycled</span>
                    <span className="text-sm font-medium text-foreground">{userStats.itemsRecycled}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">CO₂ Reduction</span>
                    <span className="text-sm font-medium text-foreground">{userStats.co2Saved}kg</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="text-xs text-muted-foreground">
                  You've helped save the equivalent of {Math.round(userStats.co2Saved / 0.5)} plastic bottles from
                  landfills!
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-full ${
                          achievement.unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Award className="h-3 w-3" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{achievement.name}</p>
                      </div>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="text-xs">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Scanning History</CardTitle>
                <CardDescription>Your recent waste identification activities</CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-3">
              {recentScans.map((scan) => {
                const IconComponent = getCategoryIcon(scan.category)
                return (
                  <Card key={scan.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getCategoryColor(scan.category)}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-foreground">{scan.item}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                +{scan.points}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={getCategoryColor(scan.category)}>
                              {scan.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {scan.confidence}% • {formatDate(scan.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card>
              <CardContent className="pt-6">
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Full History
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-foreground">Push Notifications</div>
                    <div className="text-xs text-muted-foreground">Get reminders and achievement alerts</div>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-foreground">Data Sharing</div>
                    <div className="text-xs text-muted-foreground">Help improve AI accuracy</div>
                  </div>
                  <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Bell className="h-4 w-4 mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy & Security
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Button
                  variant="outline"
                  className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
