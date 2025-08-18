"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Upload,
  Camera,
  Palette,
  Sparkles,
  Shirt,
  Heart,
  Gem,
  Star,
  Zap,
  Crown,
  ArrowRight,
  X,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

interface AnalysisResult {
  skinTone: string
  undertone: string
  season: string
  bodyType?: string
  bestColors: string[]
  avoidColors: string[]
  bestColorsWithHex?: Array<{ name: string; hex: string }>
  avoidColorsWithHex?: Array<{ name: string; hex: string }>
  clothingColorsWithHex?: Array<{ name: string; hex: string }>
  clothingRecommendations: {
    casual: string[]
    formal: string[]
    bodyTypeSpecific?: string[]
    denim?: string[]
    fabrics?: string[]
    styles?: string[]
    colors?: string[]
  }
  jewelryRecommendations?: {
    metals: string[]
    avoid: string[]
    gemstones: string[]
    recommendations: string[]
    avoidWithHex?: Array<{ name: string; hex: string }>
  }
  makeupRecommendations: {
    foundation: string
    lipColors: string[]
    eyeshadow: string[]
    blush: string[]
    eyeliner?: string[]
    mascara?: string[]
  }
  isDemo?: boolean
}

const getSkinToneColor = (skinTone: string): string => {
  const toneMap: { [key: string]: string } = {
    Fair: "#F7E7CE",
    Light: "#F1C27D",
    Medium: "#E0AC69",
    Tan: "#C68642",
    Deep: "#8D5524",
    Dark: "#654321",
    Olive: "#9CAF88",
    Porcelain: "#FFF8DC",
    Beige: "#F5F5DC",
    Golden: "#DAA520",
    Honey: "#FFA500",
    Caramel: "#CD853F",
    Chocolate: "#8B4513",
    Ebony: "#3C2415",
  }
  return toneMap[skinTone] || "#D4A574"
}

const getUndertoneColor = (undertone: string): string => {
  const undertoneMap: { [key: string]: string } = {
    Warm: "#FFB347",
    Cool: "#87CEEB",
    Neutral: "#F5DEB3",
    Golden: "#FFD700",
    Pink: "#FFB6C1",
    Yellow: "#FFFF99",
    Peach: "#FFCBA4",
    Red: "#FF6B6B",
    Blue: "#6BB6FF",
    Green: "#90EE90",
  }
  return undertoneMap[undertone] || "#E6E6FA"
}

const getSeasonColor = (season: string): string => {
  const seasonMap: { [key: string]: string } = {
    Spring: "#90EE90",
    Summer: "#87CEEB",
    Autumn: "#CD853F",
    Fall: "#CD853F",
    Winter: "#4682B4",
  }
  return seasonMap[season] || "#DDA0DD"
}

const getBodyTypeIcon = (bodyType: string): string => {
  const iconMap: { [key: string]: string } = {
    Hourglass: "⏳",
    Pear: "🍐",
    Apple: "🍎",
    Rectangle: "▭",
    "Inverted Triangle": "🔺",
    Athletic: "💪",
    Petite: "🌸",
    "Plus Size": "👑",
  }
  return iconMap[bodyType] || "✨"
}

export default function StyleMeApp() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [showWelcomePopup, setShowWelcomePopup] = useState(true)

  // Animation states
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Auto-hide welcome popup after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcomePopup(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const compressImage = (file: File, maxWidth = 600, quality = 0.8): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!
      const img = new Image()

      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality)
        resolve(compressedDataUrl.split(",")[1])
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setAnalysisResult(null)
      setError(null)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setAnalysisResult(null)
    setError(null)
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    setError(null)
    setProgress(0)

    try {
      setProgress(20)
      const compressedBase64 = await compressImage(selectedImage)

      setProgress(40)

      const response = await fetch("/api/analyze-color", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: compressedBase64,
          mimeType: "image/jpeg",
        }),
      })

      setProgress(70)

      if (!response.ok) {
        throw new Error("Failed to analyze image")
      }

      const result = await response.json()
      setAnalysisResult(result)
      setProgress(100)
    } catch (err) {
      setError("Failed to analyze image. Please try again.")
      console.error("Analysis error:", err)
    } finally {
      setIsAnalyzing(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-rose-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-200/10 to-pink-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Welcome Popup */}
      {showWelcomePopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-500">
          <Card className="max-w-lg mx-4 animate-in slide-in-from-bottom-8 duration-700 shadow-2xl border-0 bg-gradient-to-br from-white via-pink-50 to-purple-50 dark:from-gray-900 dark:via-pink-900/20 dark:to-purple-900/20">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="relative">
                  <Crown className="h-12 w-12 text-pink-600 animate-bounce" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-left">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                    Style Me
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">AI-Powered Style Analysis</p>
                </div>
              </div>
              <CardDescription className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                🎨 Discover your perfect style with professional AI-powered color and body type analysis
                <br />✨ Get personalized recommendations for clothing, makeup, and jewelry
                <br />💎 Transform your wardrobe with expert styling advice
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-2">
              <div className="space-y-4">
                <div className="flex justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    Color Analysis
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                    Body Type
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                    Style Guide
                  </span>
                </div>
                <Button
                  onClick={() => setShowWelcomePopup(false)}
                  className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Start Your Style Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Sparkles className="h-10 w-10 text-pink-600 animate-pulse" />
              <div className="absolute inset-0 h-10 w-10 text-pink-400 animate-ping opacity-20">
                <Sparkles className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent animate-in slide-in-from-left duration-1000">
              Style Me
            </h1>
            <div className="relative">
              <Crown className="h-10 w-10 text-purple-600 animate-bounce" />
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your style with AI-powered analysis! Upload your photo to discover your perfect color palette,
            body type recommendations, and personalized styling advice for clothing, makeup, and jewelry.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm border-pink-300 text-pink-700 animate-in slide-in-from-bottom duration-700 delay-200"
            >
              <Palette className="mr-2 h-4 w-4" />
              Color Analysis
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm border-purple-300 text-purple-700 animate-in slide-in-from-bottom duration-700 delay-300"
            >
              <Shirt className="mr-2 h-4 w-4" />
              Body Type Analysis
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm border-rose-300 text-rose-700 animate-in slide-in-from-bottom duration-700 delay-400"
            >
              <Gem className="mr-2 h-4 w-4" />
              Jewelry Recommendations
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 text-sm border-pink-300 text-pink-700 animate-in slide-in-from-bottom duration-700 delay-500"
            >
              <Star className="mr-2 h-4 w-4" />
              Makeup Guidance
            </Badge>
          </div>
        </div>

        {/* Upload Section */}
        <Card
          className={`max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Camera className="h-6 w-6 text-pink-600" />
              Upload Your Photo
            </CardTitle>
            <CardDescription className="text-base">
              Choose a clear, well-lit photo of your face for the most accurate analysis. Natural lighting works best!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-72 border-2 border-dashed border-pink-300 rounded-xl cursor-pointer bg-gradient-to-br from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-pink-600 transition-all duration-300 hover:scale-[1.02]">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="max-h-64 max-w-full object-contain rounded-lg shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          removeImage()
                        }}
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="relative mb-4">
                        <Upload className="w-12 h-12 text-pink-500 animate-bounce" />
                        <div className="absolute inset-0 w-12 h-12 text-pink-300 animate-ping opacity-30">
                          <Upload className="w-12 h-12" />
                        </div>
                      </div>
                      <p className="mb-2 text-lg text-gray-600 font-medium">
                        <span className="font-bold text-pink-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                    </div>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>

              {selectedImage && (
                <Button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="w-full h-14 text-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="mr-3 h-5 w-5 animate-spin" />
                      Analyzing Your Style...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-3 h-5 w-5" />
                      Discover My Style
                    </>
                  )}
                </Button>
              )}

              {isAnalyzing && progress > 0 && (
                <div className="space-y-3">
                  <Progress value={progress} className="w-full h-3" />
                  <p className="text-center text-muted-foreground font-medium">
                    {progress < 30 && "🔄 Compressing and processing your image..."}
                    {progress >= 30 && progress < 70 && "🎨 Analyzing skin tone, undertones, and body type..."}
                    {progress >= 70 && "✨ Generating personalized style recommendations..."}
                  </p>
                </div>
              )}

              {error && (
                <Alert variant="destructive" className="border-red-300">
                  <AlertDescription className="text-base">{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {analysisResult && (
          <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom duration-700">
            <Card className="mb-8 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Heart className="h-6 w-6 text-red-500 animate-pulse" />
                  Your Personal Style Analysis
                  {analysisResult.isDemo && (
                    <Badge variant="outline" className="ml-2 text-blue-600 border-blue-300 bg-blue-50 text-xs">
                      Sample Results
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-base">
                  Based on advanced color analysis and styling principles, here are your personalized style
                  recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in slide-in-from-left duration-700">
                    <h3 className="font-bold text-lg mb-4 text-pink-800 dark:text-pink-200">Skin Tone</h3>
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-full border-4 border-white shadow-lg animate-pulse"
                        style={{ backgroundColor: getSkinToneColor(analysisResult.skinTone) }}
                      ></div>
                      <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/80 shadow-sm font-semibold">
                        {analysisResult.skinTone}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in slide-in-from-left duration-700 delay-100">
                    <h3 className="font-bold text-lg mb-4 text-purple-800 dark:text-purple-200">Undertone</h3>
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-full border-4 border-white shadow-lg animate-pulse"
                        style={{ backgroundColor: getUndertoneColor(analysisResult.undertone) }}
                      ></div>
                      <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/80 shadow-sm font-semibold">
                        {analysisResult.undertone}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in slide-in-from-left duration-700 delay-200">
                    <h3 className="font-bold text-lg mb-4 text-emerald-800 dark:text-emerald-200">Color Season</h3>
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <div
                          className="w-16 h-16 rounded-full border-4 border-white shadow-lg animate-pulse"
                          style={{ backgroundColor: getSeasonColor(analysisResult.season) }}
                        ></div>
                        <div className="absolute -top-1 -right-1 text-2xl animate-bounce">
                          {analysisResult.season === "Spring" && "🌸"}
                          {analysisResult.season === "Summer" && "☀️"}
                          {(analysisResult.season === "Autumn" || analysisResult.season === "Fall") && "🍂"}
                          {analysisResult.season === "Winter" && "❄️"}
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/80 shadow-sm font-semibold">
                        {analysisResult.season}
                      </Badge>
                    </div>
                  </div>

                  {analysisResult.bodyType && (
                    <div className="text-center p-6 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in slide-in-from-left duration-700 delay-300">
                      <h3 className="font-bold text-lg mb-4 text-amber-800 dark:text-amber-200">Body Type</h3>
                      <div className="flex flex-col items-center gap-3">
                        {analysisResult.bodyType.includes("unclear") ? (
                          <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-200 to-orange-200 border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
                              <span className="text-3xl">📷</span>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-sm px-4 py-2 bg-red-50 border-red-200 text-red-700 mt-2"
                            >
                              {analysisResult.bodyType}
                            </Badge>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 border-4 border-white shadow-lg flex items-center justify-center animate-bounce">
                              <span className="text-3xl">{getBodyTypeIcon(analysisResult.bodyType)}</span>
                            </div>
                            <Badge
                              variant="secondary"
                              className="text-lg px-6 py-3 bg-white/80 shadow-sm font-semibold"
                            >
                              {analysisResult.bodyType}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Tabs defaultValue="colors" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 h-14 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
                    <TabsTrigger value="colors" className="text-base font-medium">
                      🎨 Color Palette
                    </TabsTrigger>
                    <TabsTrigger value="clothing" className="text-base font-medium">
                      👗 Clothing
                    </TabsTrigger>
                    <TabsTrigger value="jewelry" className="text-base font-medium">
                      💎 Jewelry
                    </TabsTrigger>
                    <TabsTrigger value="makeup" className="text-base font-medium">
                      💄 Makeup
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="colors" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-left duration-500">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                          <CardTitle className="text-green-700 dark:text-green-300 text-xl">
                            ✨ Perfect Colors for You
                          </CardTitle>
                          <CardDescription>These colors will make you glow and look radiant</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(
                              analysisResult.bestColorsWithHex ||
                              analysisResult.bestColors.map((color) => ({ name: color, hex: "#6B7280" }))
                            ).map((color, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-4 p-4 rounded-xl border-2 border-green-200 bg-green-50/50 hover:bg-green-100/50 transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div className="relative">
                                  <div
                                    className="w-14 h-14 rounded-full border-4 border-white shadow-lg flex-shrink-0 animate-pulse"
                                    style={{ backgroundColor: color.hex }}
                                  ></div>
                                  <div className="absolute inset-0 w-14 h-14 rounded-full border-2 border-green-400 animate-ping opacity-20"></div>
                                </div>
                                <span className="font-semibold text-green-800 dark:text-green-200">{color.name}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-right duration-500">
                        <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
                          <CardTitle className="text-red-700 dark:text-red-300 text-xl">⚠️ Colors to Avoid</CardTitle>
                          <CardDescription>
                            These colors might wash you out or clash with your undertones
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(
                              analysisResult.avoidColorsWithHex ||
                              analysisResult.avoidColors.map((color) => ({ name: color, hex: "#6B7280" }))
                            ).map((color, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-4 p-4 rounded-xl border-2 border-red-200 bg-red-50/50 hover:bg-red-100/50 transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div className="relative">
                                  <div
                                    className="w-14 h-14 rounded-full border-4 border-white shadow-lg flex-shrink-0"
                                    style={{ backgroundColor: color.hex }}
                                  >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-10 h-1 bg-red-600 rotate-45 absolute rounded-full shadow-md"></div>
                                      <div className="w-10 h-1 bg-red-600 -rotate-45 absolute rounded-full shadow-md"></div>
                                    </div>
                                  </div>
                                  <div className="absolute inset-0 w-14 h-14 rounded-full border-2 border-red-400 animate-ping opacity-20"></div>
                                </div>
                                <span className="font-semibold text-red-800 dark:text-red-200">{color.name}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="clothing" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                            <Shirt className="h-5 w-5" />
                            Casual Wear
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <ul className="space-y-3">
                            {analysisResult.clothingRecommendations.casual.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                              >
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                          <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                            <Crown className="h-5 w-5" />
                            Formal Wear
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <ul className="space-y-3">
                            {analysisResult.clothingRecommendations.formal.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                              >
                                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                                <span className="font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {analysisResult.clothingRecommendations.bodyTypeSpecific && (
                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20">
                            <CardTitle className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
                              <Star className="h-5 w-5" />
                              Perfect for Your Body Type
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <ul className="space-y-3">
                              {analysisResult.clothingRecommendations.bodyTypeSpecific.map((item, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                                >
                                  <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
                                  <span className="font-medium">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}

                      {(analysisResult.clothingColorsWithHex || analysisResult.clothingRecommendations.colors) && (
                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom duration-500 delay-200">
                          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                            <CardTitle className="text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                              <Palette className="h-5 w-5" />
                              Best Clothing Colors
                            </CardTitle>
                            <CardDescription>Perfect colors for your wardrobe</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                              {(
                                analysisResult.clothingColorsWithHex ||
                                analysisResult.clothingRecommendations.colors?.map((color) => ({
                                  name: color,
                                  hex: "#6B7280",
                                })) ||
                                []
                              ).map((color, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/50 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in slide-in-from-left duration-500 min-h-[140px] justify-center"
                                  style={{ animationDelay: `${index * 100}ms` }}
                                >
                                  <div className="relative">
                                    <div
                                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg flex-shrink-0"
                                      style={{ backgroundColor: color.hex }}
                                    ></div>
                                    <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-emerald-400 animate-ping opacity-20"></div>
                                  </div>
                                  <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200 text-center leading-tight px-2">
                                    {color.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {analysisResult.clothingRecommendations.denim && (
                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                            <CardTitle className="text-indigo-700 dark:text-indigo-300">Perfect Denim Styles</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.clothingRecommendations.denim.map((style, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="px-4 py-2 text-sm hover:scale-105 transition-transform"
                                >
                                  {style}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {analysisResult.clothingRecommendations.fabrics && (
                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
                            <CardTitle className="text-amber-700 dark:text-amber-300">Best Fabrics</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.clothingRecommendations.fabrics.map((fabric, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="px-4 py-2 text-sm hover:scale-105 transition-transform"
                                >
                                  {fabric}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {analysisResult.clothingRecommendations.styles && (
                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
                            <CardTitle className="text-teal-700 dark:text-teal-300">Style Guidelines</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.clothingRecommendations.styles.map((style, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="px-4 py-2 text-sm hover:scale-105 transition-transform"
                                >
                                  {style}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="jewelry" className="space-y-6 mt-6">
                    {analysisResult.jewelryRecommendations && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
                            <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300 text-xl">
                              <Gem className="h-5 w-5" />✨ Perfect Metals for You
                            </CardTitle>
                            <CardDescription>These metals will complement your skin tone beautifully</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <div className="flex flex-wrap gap-3">
                              {analysisResult.jewelryRecommendations.metals.map((metal, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="px-4 py-2 text-base border-yellow-300 text-yellow-700 bg-yellow-50 hover:scale-105 transition-transform"
                                >
                                  {metal}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
                            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300 text-xl">
                              <Gem className="h-5 w-5" />
                              ⚠️ Metals to Avoid
                            </CardTitle>
                            <CardDescription>These metals might clash with your undertones</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <div className="flex flex-wrap gap-3">
                              {analysisResult.jewelryRecommendations.avoidWithHex
                                ? analysisResult.jewelryRecommendations.avoidWithHex.map(
                                    (metal: any, index: number) => (
                                      <div
                                        key={index}
                                        className="relative flex items-center gap-2 px-4 py-2 bg-red-50 border-2 border-red-200 rounded-lg hover:scale-105 transition-transform"
                                      >
                                        <div
                                          className="w-6 h-6 rounded-full border-2 border-red-400 relative"
                                          style={{ backgroundColor: metal.hex }}
                                        >
                                          <div className="absolute inset-0 flex items-center justify-center">
                                            <X className="h-4 w-4 text-red-600 font-bold" />
                                          </div>
                                        </div>
                                        <span className="text-red-700 font-medium">{metal.name}</span>
                                      </div>
                                    ),
                                  )
                                : analysisResult.jewelryRecommendations.avoid.map((metal: string, index: number) => (
                                    <Badge key={index} variant="destructive" className="px-4 py-2 text-base">
                                      {metal}
                                    </Badge>
                                  ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                            <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300 text-xl">
                              <Star className="h-5 w-5" />
                              Perfect Gemstones
                            </CardTitle>
                            <CardDescription>These gemstones will enhance your natural beauty</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <div className="flex flex-wrap gap-3">
                              {analysisResult.jewelryRecommendations.gemstones.map((stone, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="px-4 py-2 text-base hover:scale-105 transition-transform"
                                >
                                  {stone}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
                            <CardTitle className="flex items-center gap-2 text-pink-700 dark:text-pink-300 text-xl">
                              <Heart className="h-5 w-5" />
                              Jewelry Recommendations
                            </CardTitle>
                            <CardDescription>Specific pieces that will look amazing on you</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <ul className="space-y-4">
                              {analysisResult.jewelryRecommendations.recommendations.map((rec, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                                >
                                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                                  <span className="font-medium">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="makeup" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
                          <CardTitle className="text-orange-700 dark:text-orange-300">Foundation & Base</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="text-sm text-muted-foreground mb-3">Perfect shade for you:</p>
                          <Badge variant="outline" className="px-4 py-3 text-base font-semibold">
                            {analysisResult.makeupRecommendations.foundation}
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20">
                          <CardTitle className="text-rose-700 dark:text-rose-300">Lip Colors</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.makeupRecommendations.lipColors.map((color, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="px-3 py-2 hover:scale-105 transition-transform"
                              >
                                {color}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                          <CardTitle className="text-purple-700 dark:text-purple-300">Eyeshadow Shades</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.makeupRecommendations.eyeshadow.map((color, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="px-3 py-2 hover:scale-105 transition-transform"
                              >
                                {color}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
                          <CardTitle className="text-pink-700 dark:text-pink-300">Blush Tones</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.makeupRecommendations.blush.map((color, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="px-3 py-2 hover:scale-105 transition-transform"
                              >
                                {color}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {analysisResult.makeupRecommendations.eyeliner && (
                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20">
                            <CardTitle className="text-gray-700 dark:text-gray-300">Eyeliner Colors</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.makeupRecommendations.eyeliner.map((color, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="px-3 py-2 hover:scale-105 transition-transform"
                                >
                                  {color}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {analysisResult.makeupRecommendations.mascara && (
                        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20">
                            <CardTitle className="text-slate-700 dark:text-slate-300">Mascara Shades</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.makeupRecommendations.mascara.map((color, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="px-3 py-2 hover:scale-105 transition-transform"
                                >
                                  {color}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button
                    onClick={() => {
                      setAnalysisResult(null)
                      setSelectedImage(null)
                      setError("")
                    }}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload New Image
                  </Button>

                  <Button
                    onClick={() => (window.location.href = "/body-type-analysis")}
                    variant="outline"
                    className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <User className="mr-2 h-5 w-5" />
                    Body Type Analysis
                  </Button>

                  <Button
                    onClick={() => (window.location.href = "/makeup-guidance")}
                    variant="outline"
                    className="border-2 border-pink-300 text-pink-700 hover:bg-pink-50 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Makeup Guidance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Tips Section */}
        <Card
          className={`max-w-6xl mx-auto shadow-xl transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <CardTitle className="text-2xl text-center">💡 Pro Styling Tips</CardTitle>
            <CardDescription className="text-center text-base">
              Expert advice to make the most of your analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <h4 className="font-bold text-lg text-blue-800 dark:text-blue-200">📸 Photo Guidelines</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Use natural lighting when possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Face the camera directly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Remove heavy makeup for accurate analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Ensure your face is clearly visible</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <h4 className="font-bold text-lg text-purple-800 dark:text-purple-200">🎨 Color Theory</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Warm undertones suit gold jewelry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Cool undertones suit silver jewelry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Your season determines your best palette</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Experiment with recommended shades gradually</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                <h4 className="font-bold text-lg text-emerald-800 dark:text-emerald-200">💎 Jewelry & Style</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Mix metals only with neutral undertones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Choose gemstones that complement your season</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Consider your lifestyle when selecting pieces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Quality over quantity for timeless style</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20">
                <h4 className="font-bold text-lg text-rose-800 dark:text-rose-200">👗 Body Type Tips</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1">•</span>
                    <span>Embrace your unique body shape</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1">•</span>
                    <span>Focus on fit over trends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1">•</span>
                    <span>Highlight your favorite features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1">•</span>
                    <span>Confidence is your best accessory</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
