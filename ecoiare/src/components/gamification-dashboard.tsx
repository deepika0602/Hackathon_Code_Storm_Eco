"use client"

import type React from "react"
import { useState } from "react"
import { Trophy, Target, Users, Gift, Flame, Star, ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  progress: number
  maxProgress: number
  points: number
  unlocked: boolean
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface Challenge {
  id: string
  name: string
  description: string
  progress: number
  maxProgress: number
  reward: number
  timeLeft: string
  type: "daily" | "weekly" | "monthly"
}

interface LeaderboardEntry {
  rank: number
  name: string
  points: number
  level: number
  isCurrentUser?: boolean
}

interface Reward {
  id: string
  name: string
  description: string
  cost: number
  type: "discount" | "badge" | "feature"
  available: boolean
}

interface GamificationDashboardProps {
  onBack: () => void
  userPoints: number
  level: number
}

export function GamificationDashboard({ onBack, userPoints, level }: GamificationDashboardProps) {
  const [activeTab, setActiveTab] = useState("achievements")

  const achievements: Achievement[] = [
    {
      id: "first-scan",
      name: "First Steps",
      description: "Complete your first waste scan",
      icon: Star,
      progress: 1,
      maxProgress: 1,
      points: 10,
      unlocked: true,
      rarity: "common",
    },
    {
      id: "eco-warrior",
      name: "Eco Warrior",
      description: "Scan 100 waste items",
      icon: Trophy,
      progress: 47,
      maxProgress: 100,
      points: 100,
      unlocked: false,
      rarity: "rare",
    },
    {
      id: "recycling-master",
      name: "Recycling Master",
      description: "Correctly identify 50 recyclable items",
      icon: Target,
      progress: 23,
      maxProgress: 50,
      points: 75,
      unlocked: false,
      rarity: "epic",
    },
    {
      id: "streak-champion",
      name: "Streak Champion",
      description: "Maintain a 30-day scanning streak",
      icon: Flame,
      progress: 12,
      maxProgress: 30,
      points: 200,
      unlocked: false,
      rarity: "legendary",
    },
    {
      id: "community-helper",
      name: "Community Helper",
      description: "Help 10 friends get started",
      icon: Users,
      progress: 3,
      maxProgress: 10,
      points: 150,
      unlocked: false,
      rarity: "epic",
    },
    {
      id: "hazmat-expert",
      name: "Hazmat Expert",
      description: "Properly dispose of 25 hazardous items",
      icon: Trophy,
      progress: 8,
      maxProgress: 25,
      points: 125,
      unlocked: false,
      rarity: "rare",
    },
  ]

  const challenges: Challenge[] = [
    {
      id: "daily-scan",
      name: "Daily Scanner",
      description: "Scan 3 items today",
      progress: 2,
      maxProgress: 3,
      reward: 25,
      timeLeft: "18h 32m",
      type: "daily",
    },
    {
      id: "weekly-recycler",
      name: "Weekly Recycler",
      description: "Identify 15 recyclable items this week",
      progress: 8,
      maxProgress: 15,
      reward: 100,
      timeLeft: "4d 12h",
      type: "weekly",
    },
    {
      id: "monthly-champion",
      name: "Monthly Champion",
      description: "Earn 500 points this month",
      progress: 287,
      maxProgress: 500,
      reward: 300,
      timeLeft: "18d 6h",
      type: "monthly",
    },
  ]

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "EcoMaster2024", points: 3450, level: 12 },
    { rank: 2, name: "GreenThumb", points: 2890, level: 10 },
    { rank: 3, name: "RecycleKing", points: 2156, level: 9 },
    { rank: 4, name: "You", points: userPoints, level: level, isCurrentUser: true },
    { rank: 5, name: "EarthSaver", points: 1089, level: 6 },
    { rank: 6, name: "WasteWizard", points: 945, level: 5 },
    { rank: 7, name: "CleanQueen", points: 823, level: 5 },
  ]

  const rewards: Reward[] = [
    {
      id: "coffee-discount",
      name: "Coffee Shop 10% Off",
      description: "Get 10% off at participating eco-friendly cafes",
      cost: 500,
      type: "discount",
      available: userPoints >= 500,
    },
    {
      id: "premium-badge",
      name: "Premium Eco Badge",
      description: "Show off your commitment with a special profile badge",
      cost: 200,
      type: "badge",
      available: userPoints >= 200,
    },
    {
      id: "advanced-scanner",
      name: "Advanced Scanner",
      description: "Unlock detailed material composition analysis",
      cost: 1000,
      type: "feature",
      available: userPoints >= 1000,
    },
    {
      id: "plant-tree",
      name: "Plant a Tree",
      description: "We'll plant a tree in your name through our partner organization",
      cost: 750,
      type: "discount",
      available: userPoints >= 750,
    },
  ]

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getChallengeTypeColor = (type: Challenge["type"]) => {
    switch (type) {
      case "daily":
        return "bg-green-100 text-green-800 border-green-200"
      case "weekly":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "monthly":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
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
            <h1 className="text-lg font-semibold text-foreground">Rewards & Progress</h1>
            <p className="text-xs text-muted-foreground">
              Level {level} • {userPoints} points
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="achievements" className="text-xs">
              <Trophy className="h-3 w-3 mr-1" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="challenges" className="text-xs">
              <Target className="h-3 w-3 mr-1" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Ranks
            </TabsTrigger>
            <TabsTrigger value="rewards" className="text-xs">
              <Gift className="h-3 w-3 mr-1" />
              Shop
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Achievements</CardTitle>
                <CardDescription>Unlock badges by completing eco-friendly actions</CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-3">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon
                const progressPercent = (achievement.progress / achievement.maxProgress) * 100

                return (
                  <Card key={achievement.id} className={achievement.unlocked ? "border-primary" : ""}>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-full ${achievement.unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-foreground">{achievement.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                                {achievement.rarity}
                              </Badge>
                              {achievement.unlocked && (
                                <Badge variant="secondary" className="text-accent-foreground bg-accent">
                                  +{achievement.points}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          <div className="space-y-1">
                            <Progress value={progressPercent} className="h-1" />
                            <p className="text-xs text-muted-foreground">
                              {achievement.progress}/{achievement.maxProgress}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Active Challenges</CardTitle>
                <CardDescription>Complete challenges to earn bonus points</CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-3">
              {challenges.map((challenge) => {
                const progressPercent = (challenge.progress / challenge.maxProgress) * 100

                return (
                  <Card key={challenge.id}>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-foreground">{challenge.name}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getChallengeTypeColor(challenge.type)}>
                              {challenge.type}
                            </Badge>
                            <Badge variant="secondary" className="text-accent-foreground bg-accent">
                              +{challenge.reward}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{challenge.description}</p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Progress value={progressPercent} className="h-2 flex-1" />
                            <span className="text-xs text-muted-foreground ml-2">
                              {challenge.progress}/{challenge.maxProgress}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 inline mr-1" />
                              {challenge.timeLeft} left
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Community Leaderboard</CardTitle>
                <CardDescription>See how you rank among eco-warriors</CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <Card key={entry.rank} className={entry.isCurrentUser ? "border-primary bg-primary/5" : ""}>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          entry.rank === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : entry.rank === 2
                              ? "bg-gray-100 text-gray-800"
                              : entry.rank === 3
                                ? "bg-orange-100 text-orange-800"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {entry.rank}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-foreground">{entry.name}</h4>
                          {entry.isCurrentUser && (
                            <Badge variant="outline" className="text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">Level {entry.level}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">{entry.points.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Reward Shop</CardTitle>
                <CardDescription>Redeem your points for real-world benefits</CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-3">
              {rewards.map((reward) => (
                <Card key={reward.id} className={!reward.available ? "opacity-60" : ""}>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-foreground">{reward.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{reward.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {reward.cost} pts
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        disabled={!reward.available}
                        variant={reward.available ? "default" : "outline"}
                      >
                        {reward.available ? "Redeem" : `Need ${reward.cost - userPoints} more points`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
